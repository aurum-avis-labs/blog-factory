import express, { Request, Response } from 'express';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, unlinkSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { createServer } from 'http';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Repo root is one level up from tool/
const REPO_ROOT = resolve(__dirname, '..');

// Load .env.local manually (no dotenv dependency needed)
function loadEnv() {
  const envPath = join(__dirname, '.env.local');
  try {
    const raw = readFileSync(envPath, 'utf-8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      // Value ends at first space (handles inline comments like "value  ← comment")
      const val = trimmed.slice(eqIdx + 1).split(/\s+←/)[0].trim();
      if (key && val && !process.env[key]) process.env[key] = val;
    }
  } catch {
    console.warn('[warn] .env.local not found — using environment variables only');
  }
}
loadEnv();

// ── Types ──────────────────────────────────────────────────────────────────────
interface BrandConfig {
  id: string;
  displayName: string;
  repo: string;
  domain: string;
  languages: string[];
  defaultLanguage: string;
}

// ── Brand config loader ────────────────────────────────────────────────────────
function loadBrands(): BrandConfig[] {
  const configPath = resolve(REPO_ROOT, 'brands.config.ts');
  const raw = readFileSync(configPath, 'utf-8');

  const brandsMatch = raw.match(/export const brands[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!brandsMatch) throw new Error('Could not parse brands.config.ts');

  let json = brandsMatch[1];
  json = json.replace(/'([^'\\]*)'/g, '"$1"');
  json = json.replace(/([{,\s])([a-zA-Z_]\w*)\s*:/g, '$1"$2":');
  json = json.replace(/,(\s*[}\]])/g, '$1');

  return JSON.parse(json) as BrandConfig[];
}

// ── Local filesystem helpers ───────────────────────────────────────────────────
function getExistingSlugs(brandId: string, lang: string): string[] {
  const dir = resolve(REPO_ROOT, 'brands', brandId, lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}

// ── Git helpers ────────────────────────────────────────────────────────────────
async function gitCommitAndPush(message: string): Promise<string> {
  const opts = { cwd: REPO_ROOT };
  await execAsync('git add -A', opts);

  // Check if there's anything to commit
  const { stdout: status } = await execAsync('git status --porcelain', opts);
  if (!status.trim()) return 'Nothing to commit — files already up to date.';

  await execAsync(`git commit -m ${JSON.stringify(message)}`, opts);
  const { stdout } = await execAsync('git push origin main', opts);
  return stdout.trim() || 'Pushed to main.';
}

// ── Writing instructions & brand context helpers ───────────────────────────────
const INSTRUCTIONS_FILE = resolve(REPO_ROOT, 'writing-instructions.md');

function readInstructions(): string {
  if (!existsSync(INSTRUCTIONS_FILE)) return '';
  return readFileSync(INSTRUCTIONS_FILE, 'utf-8');
}

function saveInstructions(content: string): void {
  writeFileSync(INSTRUCTIONS_FILE, content, 'utf-8');
}

// ── Context root: repo/context/{brandId}/ — never watched by deploy pipeline ──
function contextRoot(brandId: string): string {
  return resolve(REPO_ROOT, 'context', brandId);
}

function brandContextPath(brandId: string): string {
  return resolve(contextRoot(brandId), 'brand-context.md');
}

function readBrandContext(brandId: string): string {
  const p = brandContextPath(brandId);
  if (!existsSync(p)) return '';
  return readFileSync(p, 'utf-8');
}

function saveBrandContext(brandId: string, content: string): void {
  mkdirSync(contextRoot(brandId), { recursive: true });
  writeFileSync(brandContextPath(brandId), content, 'utf-8');
}

// Context files (.md) — extra docs appended to brand context at generation time
function contextFilesDir(brandId: string): string {
  return resolve(contextRoot(brandId), 'context-files');
}

function listContextFiles(brandId: string): Array<{ name: string; sizeKb: number }> {
  const dir = contextFilesDir(brandId);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') || f.endsWith('.txt'))
    .map(f => ({ name: f, sizeKb: Math.ceil(statSync(resolve(dir, f)).size / 1024) }));
}

function readAllContextFiles(brandId: string): string {
  const dir = contextFilesDir(brandId);
  if (!existsSync(dir)) return '';
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') || f.endsWith('.txt'))
    .map(f => readFileSync(resolve(dir, f), 'utf-8'))
    .join('\n\n');
}

// Style reference images — used to guide visual style of generated images
function styleRefsDir(brandId: string): string {
  return resolve(contextRoot(brandId), 'style-references');
}

function listStyleRefs(brandId: string): Array<{ name: string; base64: string }> {
  const dir = styleRefsDir(brandId);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .map(f => ({
      name: f,
      base64: readFileSync(resolve(dir, f)).toString('base64'),
    }));
}

// ── Slug generator ─────────────────────────────────────────────────────────────
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 80);
}

function extractTitle(mdx: string): string {
  const match = mdx.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : 'untitled';
}

// ── Today's date ───────────────────────────────────────────────────────────────
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// ── AI helpers ─────────────────────────────────────────────────────────────────
async function generateWithAzure(system: string, prompt: string): Promise<string> {
  const endpoint   = process.env.AZURE_OPENAI_ENDPOINT;
  const key        = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-5.3-chat';
  if (!endpoint || endpoint.includes('your-resource')) throw new Error('AZURE_OPENAI_ENDPOINT not configured');
  if (!key || key.includes('xxx')) throw new Error('AZURE_OPENAI_API_KEY not configured');

  const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=2024-12-01-preview`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: deployment,
      messages: [
        { role: 'system', content: system },
        { role: 'user',   content: prompt },
      ],
      max_completion_tokens: 16384,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Azure OpenAI ${res.status}: ${err}`);
  }
  const data = await res.json() as { choices: Array<{ message: { content: string } }> };
  return data.choices[0].message.content;
}

async function generateImage(promptText: string): Promise<string> {
  const endpoint   = process.env.AZURE_IMAGE_ENDPOINT ?? process.env.AZURE_OPENAI_ENDPOINT;
  const key        = process.env.AZURE_IMAGE_API_KEY  ?? process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_IMAGE_DEPLOYMENT ?? 'gpt-image-1.5';
  if (!endpoint || endpoint.includes('your-resource')) throw new Error('AZURE_IMAGE_ENDPOINT not configured');
  if (!key || key.includes('xxx')) throw new Error('AZURE_IMAGE_API_KEY not configured');

  const url = `${endpoint}openai/deployments/${deployment}/images/generations?api-version=2024-02-01`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      prompt: promptText,
      n: 1,
      size: '1024x1024',
      quality: 'medium',
      output_format: 'png',
      output_compression: 100,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Image generation ${res.status}: ${err}`);
  }
  const data = await res.json() as { data: Array<{ b64_json: string }> };
  return data.data[0].b64_json; // base64 PNG
}

// ── Express app ────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.static(join(__dirname, 'public'), { etag: false, maxAge: 0 }));

// ── GET /api/config ────────────────────────────────────────────────────────────
app.get('/api/config', (_req: Request, res: Response) => {
  const imageEndpoint = process.env.AZURE_IMAGE_ENDPOINT ?? process.env.AZURE_OPENAI_ENDPOINT ?? '';
  const imageKey      = process.env.AZURE_IMAGE_API_KEY  ?? process.env.AZURE_OPENAI_API_KEY  ?? '';

  res.json({
    azureOpenAI: !!(
      process.env.AZURE_OPENAI_ENDPOINT &&
      !process.env.AZURE_OPENAI_ENDPOINT.includes('your-resource') &&
      process.env.AZURE_OPENAI_API_KEY &&
      !process.env.AZURE_OPENAI_API_KEY.includes('xxx')
    ),
    azureDalle: !!(
      imageEndpoint && !imageEndpoint.includes('your-resource') &&
      imageKey      && !imageKey.includes('xxx') &&
      process.env.AZURE_IMAGE_DEPLOYMENT &&
      !process.env.AZURE_IMAGE_DEPLOYMENT.includes('xxx')
    ),
  });
});

// ── GET /api/brands ────────────────────────────────────────────────────────────
app.get('/api/brands', (_req: Request, res: Response) => {
  try {
    res.json(loadBrands());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── GET /api/existing/:brandId ─────────────────────────────────────────────────
app.get('/api/existing/:brandId', (req: Request, res: Response): void => {
  try {
    const brandId = String(req.params['brandId']);
    const brands = loadBrands();
    const brand = brands.find(b => b.id === brandId);
    if (!brand) { res.status(404).json({ error: 'Brand not found' }); return; }

    const result: Record<string, string[]> = {};
    for (const lang of brand.languages) {
      result[lang] = getExistingSlugs(brandId, lang);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── POST /api/generate ─────────────────────────────────────────────────────────
app.post('/api/generate', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type: string, data: unknown) =>
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  try {
    const { brandId, languages, prompt, context, imageCount } = req.body as {
      brandId: string;
      languages: string[];
      prompt: string;
      context?: string;
      imageCount: number;
    };

    // 1. Load brand config + instructions + brand context
    send('log', `Loading brand config for "${brandId}"…`);
    const brands = loadBrands();
    const brand = brands.find(b => b.id === brandId);
    if (!brand) throw new Error(`Brand "${brandId}" not found`);

    const globalInstructions = readInstructions();
    const brandContext       = readBrandContext(brandId);
    const extraContextFiles  = readAllContextFiles(brandId);
    const styleRefs          = listStyleRefs(brandId);

    // 2. Read existing slugs from local filesystem
    send('log', 'Reading existing posts from local repo…');
    const existingByLang: Record<string, string[]> = {};
    for (const lang of languages) {
      existingByLang[lang] = getExistingSlugs(brandId, lang);
    }

    // 3. Generate MDX per language
    const posts: Record<string, string> = {};
    let slug = '';

    for (const lang of languages) {
      send('log', `Generating ${lang.toUpperCase()} post with Azure OpenAI…`);

      const imageInstructions = imageCount > 0
        ? `Include ${imageCount} image${imageCount > 1 ? 's' : ''}. Add this import block immediately after the frontmatter ---:\n\nimport { Image } from 'astro:assets';\n${Array.from({ length: imageCount }, (_, i) => `import img${i + 1} from '@/assets/blog/POST_SLUG/img${i + 1}.png';`).join('\n')}\n\nPlace <Image src={imgN} alt="descriptive alt text" width={700} quality={80} class="w-full" /> at natural content breaks. img1 appears near the top as the hero.`
        : 'Do not include any images. Omit the image field from frontmatter.';

      const existingList = existingByLang[lang]?.length
        ? existingByLang[lang].map(s => `- ${s}`).join('\n')
        : 'None yet.';

      const system = `You are a professional blog writer for ${brand.displayName} (${brand.domain}).

Write a complete, high-quality MDX blog post in ${lang === 'en' ? 'English' : lang === 'de' ? 'German' : lang === 'fr' ? 'French' : lang === 'it' ? 'Italian' : lang}.

FRONTMATTER (mandatory, exact format):
---
title: "Post Title"
description: "Under 160 chars"
pubDate: ${today()}
author: "${brand.displayName}"
${imageCount > 0 ? 'image: "@/assets/blog/POST_SLUG/img1.png"' : ''}
tags: ["tag1", "tag2", "tag3"]
draft: false
relatedPosts: []
---

RULES:
- Slug must be localized to the post language (German title → German slug)
- Use POST_SLUG as a placeholder in all image paths — it will be replaced with the actual slug
- Use h2, h3 headings only — never h1
- Description must be under 160 characters — hard limit
- Write 600–900 words of substantive, insightful content
- Professional tone, not salesy
- Include 2–3 relevant tags

${imageInstructions}

${globalInstructions ? `GLOBAL WRITING INSTRUCTIONS (always follow these):\n${globalInstructions}` : ''}

${brandContext ? `BRAND CONTEXT:\n${brandContext}` : ''}

${extraContextFiles ? `ADDITIONAL BRAND DOCUMENTS:\n${extraContextFiles}` : ''}

Existing posts to avoid duplicating:
${existingList}

Return ONLY the raw MDX. No explanation, no code fences.`;

      const userPrompt = `Topic: ${prompt}${context ? `\n\nAdditional context: ${context}` : ''}`;
      let mdx = await generateWithAzure(system, userPrompt);

      // Strip accidental code fences
      mdx = mdx.replace(/^```(?:mdx)?\n?/i, '').replace(/\n?```\s*$/i, '').trim();

      // Extract slug from first language generated
      if (!slug) {
        slug = generateSlug(extractTitle(mdx));
        send('log', `Slug: "${slug}"`);
      }

      posts[lang] = mdx.replace(/POST_SLUG/g, slug);
      send('log', `✓ ${lang.toUpperCase()} post ready (${mdx.length} chars)`);
    }

    // 4. Generate images
    const images: Array<{ filename: string; base64: string; previewUrl: string }> = [];

    if (imageCount > 0) {
      const imageEndpoint = process.env.AZURE_IMAGE_ENDPOINT ?? process.env.AZURE_OPENAI_ENDPOINT ?? '';
      const imageKey      = process.env.AZURE_IMAGE_API_KEY  ?? process.env.AZURE_OPENAI_API_KEY  ?? '';
      const imageReady    = !imageEndpoint.includes('your-resource') && !imageKey.includes('xxx') && !!process.env.AZURE_IMAGE_DEPLOYMENT;

      if (imageReady) {
        for (let i = 1; i <= imageCount; i++) {
          send('log', `Generating image ${i}/${imageCount}…`);
          const styleGuide = styleRefs.length > 0
            ? ` Match the visual style of the brand's reference images: consistent color palette, composition, and mood.`
            : '';
          const imgPrompt = i === 1
            ? `Professional hero image for a blog post about: ${prompt}. Clean, modern, suitable for a tech/business blog. No text overlay.${styleGuide}`
            : `Supporting illustration for a blog post about: ${prompt}. Style consistent with a professional tech/business blog, image ${i} of ${imageCount}. No text.${styleGuide}`;
          const base64 = await generateImage(imgPrompt);
          images.push({ filename: `img${i}.png`, base64, previewUrl: `data:image/png;base64,${base64}` });
          send('log', `✓ Image ${i} ready`);
        }
      } else {
        send('log', '⚠ Image generation not configured — skipping');
      }
    }

    send('log', '✅ Generation complete!');
    send('done', { slug, posts, images });
    res.end();

  } catch (err) {
    send('error', String(err));
    res.end();
  }
});

// ── POST /api/push ─────────────────────────────────────────────────────────────
app.post('/api/push', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type: string, data: unknown) =>
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  try {
    const { brandId, slug, posts, images } = req.body as {
      brandId: string;
      slug: string;
      posts: Record<string, string>;
      images: Array<{ filename: string; base64: string }>;
    };

    // 1. Write MDX files to disk
    for (const [lang, mdx] of Object.entries(posts)) {
      const dir  = resolve(REPO_ROOT, 'brands', brandId, lang);
      const file = resolve(dir, `${slug}.mdx`);
      mkdirSync(dir, { recursive: true });
      writeFileSync(file, mdx, 'utf-8');
      send('log', `✓ Written brands/${brandId}/${lang}/${slug}.mdx`);
    }

    // 2. Write images to disk
    for (const img of images) {
      const dir  = resolve(REPO_ROOT, 'brands', brandId, 'images', slug);
      const file = resolve(dir, img.filename);
      mkdirSync(dir, { recursive: true });
      writeFileSync(file, Buffer.from(img.base64, 'base64'));
      send('log', `✓ Written brands/${brandId}/images/${slug}/${img.filename}`);
    }

    // 3. Git commit & push
    send('log', 'Committing and pushing to main…');
    const commitMsg = `feat(content): add "${slug}" for ${brandId}`;
    const pushResult = await gitCommitAndPush(commitMsg);
    send('log', `🚀 ${pushResult}`);
    send('log', 'Auto-publish workflow will trigger shortly.');
    send('done', { ok: true });
    res.end();

  } catch (err) {
    send('error', String(err));
    res.end();
  }
});

// ── GET /api/instructions ──────────────────────────────────────────────────────
app.get('/api/instructions', (_req: Request, res: Response) => {
  res.json({ content: readInstructions() });
});

// ── POST /api/instructions ─────────────────────────────────────────────────────
app.post('/api/instructions', (req: Request, res: Response) => {
  try {
    const { content } = req.body as { content: string };
    saveInstructions(content ?? '');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── GET /api/brand-context/:brandId ───────────────────────────────────────────
app.get('/api/brand-context/:brandId', (req: Request, res: Response) => {
  try {
    const brandId = String(req.params['brandId']);
    res.json({ content: readBrandContext(brandId) });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── POST /api/brand-context/:brandId ──────────────────────────────────────────
app.post('/api/brand-context/:brandId', (req: Request, res: Response) => {
  try {
    const brandId = String(req.params['brandId']);
    const { content } = req.body as { content: string };
    saveBrandContext(brandId, content ?? '');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── GET  /api/brand-context/:brandId/files ─────────────────────────────────────
app.get('/api/brand-context/:brandId/files', (req: Request, res: Response) => {
  res.json(listContextFiles(String(req.params['brandId'])));
});

// ── POST /api/brand-context/:brandId/files ─────────────────────────────────────
app.post('/api/brand-context/:brandId/files', (req: Request, res: Response) => {
  try {
    const brandId = String(req.params['brandId']);
    const { name, content } = req.body as { name: string; content: string };
    const dir = contextFilesDir(brandId);
    mkdirSync(dir, { recursive: true });
    const safe = name.replace(/[^a-zA-Z0-9._-]/g, '_');
    writeFileSync(resolve(dir, safe), content, 'utf-8');
    res.json({ ok: true, name: safe });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── DELETE /api/brand-context/:brandId/files/:filename ─────────────────────────
app.delete('/api/brand-context/:brandId/files/:filename', (req: Request, res: Response) => {
  try {
    const brandId  = String(req.params['brandId']);
    const filename = String(req.params['filename']);
    const file = resolve(contextFilesDir(brandId), filename);
    if (existsSync(file)) unlinkSync(file);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── GET  /api/brand-context/:brandId/style-refs ────────────────────────────────
app.get('/api/brand-context/:brandId/style-refs', (req: Request, res: Response) => {
  res.json(listStyleRefs(String(req.params['brandId'])));
});

// ── POST /api/brand-context/:brandId/style-refs ────────────────────────────────
app.post('/api/brand-context/:brandId/style-refs', (req: Request, res: Response) => {
  try {
    const brandId = String(req.params['brandId']);
    const { name, base64 } = req.body as { name: string; base64: string };
    const dir = styleRefsDir(brandId);
    mkdirSync(dir, { recursive: true });
    const safe = name.replace(/[^a-zA-Z0-9._-]/g, '_');
    writeFileSync(resolve(dir, safe), Buffer.from(base64, 'base64'));
    res.json({ ok: true, name: safe });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── DELETE /api/brand-context/:brandId/style-refs/:filename ───────────────────
app.delete('/api/brand-context/:brandId/style-refs/:filename', (req: Request, res: Response) => {
  try {
    const brandId  = String(req.params['brandId']);
    const filename = String(req.params['filename']);
    const file = resolve(styleRefsDir(brandId), filename);
    if (existsSync(file)) unlinkSync(file);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── Start server ───────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT ?? '3000', 10);
createServer(app).listen(PORT, () => {
  console.log(`\n🏭 Blog Factory Tool running at http://localhost:${PORT}\n`);
});
