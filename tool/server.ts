import express, { Request, Response } from 'express';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, unlinkSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { createServer } from 'http';
import { exec } from 'child_process';
import { promisify } from 'util';
import { EventEmitter } from 'events';

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

// ── Staging ────────────────────────────────────────────────────────────────────
const STAGING_DIR = resolve(__dirname, '.staging');

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface StagedPost {
  id: string;
  brandId: string;
  brandName: string;
  slug: string;
  createdAt: string;
  languages: string[];
  posts: Record<string, string>;
  images: Array<{ filename: string; base64: string; previewUrl: string }>;
  chatHistory: Record<string, ChatMessage[]>;
  originalPrompt: string;
  originalContext?: string;
  status: 'pending' | 'approved';
}

interface StagedSummary {
  id: string;
  brandId: string;
  brandName: string;
  slug: string;
  createdAt: string;
  languages: string[];
  imageCount: number;
  status: 'pending' | 'approved';
}

// ── Job queue ──────────────────────────────────────────────────────────────────
interface JobBody {
  brandId: string;
  languages: string[];
  prompt: string;
  context?: string;
  imageCount: number;
}

interface Job {
  id: string;
  brandId: string;
  brandName: string;
  topic: string;
  languages: string[];
  imageCount: number;
  status: 'queued' | 'running' | 'complete' | 'failed';
  progress: string[];
  createdAt: string;
  completedAt?: string;
  stagingId?: string;
  error?: string;
  _body: JobBody;
}

const jobStore = new Map<string, Job>();
const jobQueue: string[] = [];      // ordered list of queued job IDs
const jobEmitter = new EventEmitter();
const MAX_CONCURRENT = 2;
let runningJobs = 0;

function newJobId(): string {
  return `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`;
}

function jobLog(job: Job, msg: string): void {
  job.progress.push(msg);
  jobEmitter.emit(`${job.id}:log`, msg);
}

function jobDone(job: Job, stagingId: string): void {
  job.status = 'complete';
  job.stagingId = stagingId;
  job.completedAt = new Date().toISOString();
  jobEmitter.emit(`${job.id}:done`, { stagingId });
}

function jobFail(job: Job, error: string): void {
  job.status = 'failed';
  job.error = error;
  job.completedAt = new Date().toISOString();
  jobEmitter.emit(`${job.id}:error`, error);
}

async function runJob(job: Job): Promise<void> {
  const { brandId, languages, prompt, context, imageCount } = job._body;
  try {
    jobLog(job, `Loading brand config for "${brandId}"…`);
    const brands = loadBrands();
    const brand = brands.find(b => b.id === brandId);
    if (!brand) throw new Error(`Brand "${brandId}" not found`);

    const globalInstructions = readInstructions();
    const brandContext       = readBrandContext(brandId);
    const extraContextFiles  = readAllContextFiles(brandId);
    const styleRefs          = listStyleRefs(brandId);

    jobLog(job, 'Reading existing posts from local repo…');
    const existingByLang: Record<string, string[]> = {};
    for (const lang of languages) existingByLang[lang] = getExistingSlugs(brandId, lang);

    const posts: Record<string, string> = {};
    let slug = '';

    for (const lang of languages) {
      jobLog(job, `Generating ${lang.toUpperCase()} post with Azure OpenAI…`);
      const imageInstructions = imageCount > 0
        ? `Include ${imageCount} image${imageCount > 1 ? 's' : ''}. Add this import block immediately after the frontmatter ---:\n\nimport { Image } from 'astro:assets';\n${Array.from({ length: imageCount }, (_, i) => `import img${i + 1} from '@/assets/blog/POST_SLUG/img${i + 1}.png';`).join('\n')}\n\nPlace <Image src={imgN} alt="descriptive alt text" width={700} quality={80} class="w-full" /> at natural content breaks. img1 appears near the top as the hero.`
        : 'Do not include any images. Omit the image field from frontmatter.';
      const existingList = existingByLang[lang]?.length
        ? existingByLang[lang].map(s => `- ${s}`).join('\n') : 'None yet.';

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
- Slug must be localized to the post language
- Use POST_SLUG as a placeholder in all image paths
- Use h2, h3 headings only — never h1
- Description must be under 160 characters
- Write 600–900 words of substantive, insightful content
- Professional tone, not salesy
- Include 2–3 relevant tags
${imageInstructions}
${globalInstructions ? `\nGLOBAL WRITING INSTRUCTIONS:\n${globalInstructions}` : ''}
${brandContext ? `\nBRAND CONTEXT:\n${brandContext}` : ''}
${extraContextFiles ? `\nADDITIONAL BRAND DOCUMENTS:\n${extraContextFiles}` : ''}
Existing posts to avoid duplicating:\n${existingList}
Return ONLY the raw MDX. No explanation, no code fences.`;

      let mdx = await generateWithAzure(system, `Topic: ${prompt}${context ? `\n\nAdditional context: ${context}` : ''}`);
      mdx = mdx.replace(/^```(?:mdx)?\n?/i, '').replace(/\n?```\s*$/i, '').trim();
      if (!slug) { slug = generateSlug(extractTitle(mdx)); jobLog(job, `Slug: "${slug}"`); }
      posts[lang] = mdx.replace(/POST_SLUG/g, slug);
      jobLog(job, `✓ ${lang.toUpperCase()} post ready (${mdx.length} chars)`);
    }

    const images: Array<{ filename: string; base64: string; previewUrl: string }> = [];
    if (imageCount > 0) {
      const imageEndpoint = process.env.AZURE_IMAGE_ENDPOINT ?? process.env.AZURE_OPENAI_ENDPOINT ?? '';
      const imageKey      = process.env.AZURE_IMAGE_API_KEY  ?? process.env.AZURE_OPENAI_API_KEY  ?? '';
      const imageReady    = !imageEndpoint.includes('your-resource') && !imageKey.includes('xxx') && !!process.env.AZURE_IMAGE_DEPLOYMENT;
      if (imageReady) {
        const hasRefs = styleRefs.length > 0;
        const primaryRef = hasRefs ? styleRefs[0].base64 : undefined;
        let styleDescription = '';
        if (hasRefs) {
          jobLog(job, `Analysing ${styleRefs.length} style reference image(s)…`);
          styleDescription = await buildStyleDescription(styleRefs);
          jobLog(job, '✓ Character & style description ready');
        }
        jobLog(job, `Writing ${imageCount} tailored image prompt(s)…`);
        const imagePrompts = await generateImagePrompts(
          posts[Object.keys(posts)[0]] ?? '', imageCount, prompt,
          styleDescription, brand.displayName, hasRefs,
        );
        jobLog(job, '✓ Image prompts ready');
        for (let i = 0; i < imageCount; i++) {
          const mode = primaryRef ? 'with reference image' : 'text-only';
          jobLog(job, `Generating image ${i + 1}/${imageCount} (${mode})…`);
          const base64 = await generateImage(imagePrompts[i] ?? `Professional illustration for: ${prompt}`, primaryRef);
          images.push({ filename: `img${i + 1}.png`, base64, previewUrl: `data:image/png;base64,${base64}` });
          jobLog(job, `✓ Image ${i + 1} ready`);
        }
      } else { jobLog(job, '⚠ Image generation not configured — skipping'); }
    }

    const stagedId = newStagingId();
    saveStaged({ id: stagedId, brandId, brandName: brand.displayName, slug, createdAt: new Date().toISOString(),
      languages: Object.keys(posts), posts, images, chatHistory: {}, originalPrompt: prompt, originalContext: context, status: 'pending' });
    jobLog(job, '✅ Generation complete!');
    jobDone(job, stagedId);
  } catch (err) {
    const msg = String(err);
    jobLog(job, `❌ ${msg}`);
    jobFail(job, msg);
  }
}

function processQueue(): void {
  while (jobQueue.length > 0 && runningJobs < MAX_CONCURRENT) {
    const jobId = jobQueue.shift()!;
    const job = jobStore.get(jobId);
    if (!job || job.status !== 'queued') continue;
    job.status = 'running';
    runningJobs++;
    jobEmitter.emit(`${job.id}:status`, 'running');
    runJob(job).finally(() => { runningJobs--; processQueue(); });
  }
}

function ensureStagingDir() {
  if (!existsSync(STAGING_DIR)) mkdirSync(STAGING_DIR, { recursive: true });
}

function newStagingId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function saveStaged(post: StagedPost): void {
  ensureStagingDir();
  writeFileSync(resolve(STAGING_DIR, `${post.id}.json`), JSON.stringify(post), 'utf-8');
}

function listStaged(): StagedSummary[] {
  ensureStagingDir();
  return readdirSync(STAGING_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try {
        const p = JSON.parse(readFileSync(resolve(STAGING_DIR, f), 'utf-8')) as StagedPost;
        return {
          id: p.id,
          brandId: p.brandId,
          brandName: p.brandName,
          slug: p.slug,
          createdAt: p.createdAt,
          languages: p.languages,
          imageCount: p.images?.length ?? 0,
          status: p.status ?? 'pending',
        } satisfies StagedSummary;
      } catch { return null; }
    })
    .filter((p): p is StagedSummary => p !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function getStaged(id: string): StagedPost | null {
  const p = resolve(STAGING_DIR, `${id}.json`);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, 'utf-8')) as StagedPost;
}

function deleteStaged(id: string): void {
  const p = resolve(STAGING_DIR, `${id}.json`);
  if (existsSync(p)) unlinkSync(p);
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

// Vision-capable call — accepts base64 images alongside text
async function generateWithAzureVision(
  system: string,
  textPrompt: string,
  images: Array<{ base64: string; mimeType?: string }>
): Promise<string> {
  const endpoint   = process.env.AZURE_OPENAI_ENDPOINT;
  const key        = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-5.3-chat';
  if (!endpoint || endpoint.includes('your-resource')) throw new Error('AZURE_OPENAI_ENDPOINT not configured');
  if (!key || key.includes('xxx')) throw new Error('AZURE_OPENAI_API_KEY not configured');

  const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=2024-12-01-preview`;
  const imageContent = images.map(img => ({
    type: 'image_url',
    image_url: { url: `data:${img.mimeType ?? 'image/png'};base64,${img.base64}` },
  }));

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: deployment,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: [{ type: 'text', text: textPrompt }, ...imageContent] },
      ],
      max_completion_tokens: 2048,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Azure OpenAI Vision ${res.status}: ${err}`);
  }
  const data = await res.json() as { choices: Array<{ message: { content: string } }> };
  return data.choices[0].message.content;
}

// Analyse style reference images — extracts character + style description for prompt injection
async function buildStyleDescription(styleRefs: Array<{ name: string; base64: string }>): Promise<string> {
  if (styleRefs.length === 0) return '';
  const system = `You are a visual art director. Analyse the provided brand style reference images and return a detailed description (max 150 words) for use in image generation prompts. Cover:
1. Character/subject details — physical features, outfit, colors, distinctive traits (important for consistency)
2. Art style — illustrative vs photographic, rendering technique, line work
3. Color palette — dominant and accent colors with hex-like descriptions
4. Lighting and mood
5. Composition style

Be highly specific so an image model can recreate the same character and aesthetic consistently.`;
  const prompt = `These are ${styleRefs.length} brand style/character reference image(s). Describe everything needed to reproduce this style and character consistently across new images.`;
  return generateWithAzureVision(system, prompt, styleRefs);
}

// Generate N tailored image prompts based on the actual blog content
async function generateImagePrompts(
  blogContent: string,
  imageCount: number,
  topic: string,
  styleDescription: string,
  brandDisplayName: string,
  hasReferenceImages: boolean,
): Promise<string[]> {
  const styleBlock = styleDescription
    ? `STYLE & CHARACTER (mandatory for all images — reference image is also passed directly):\n${styleDescription}`
    : 'Use a clean, professional, editorial photography style.';

  const referenceNote = hasReferenceImages
    ? `REFERENCE IMAGE NOTE: A reference image is passed alongside each prompt via the edits API. Your prompt MUST explicitly say "preserve the character's exact appearance, outfit, colors, and art style from the reference image" — but the SCENE itself must be completely unique per image.`
    : '';

  const system = `You are a visual art director creating ${imageCount} image generation prompt(s) for a blog post. Each image must illustrate a DIFFERENT, SPECIFIC section of the article.

CRITICAL VARIETY RULES — strictly enforced:
- Every image must depict a completely different scene, subject, action, and setting
- Different camera angle for each: e.g. close-up, wide establishing shot, overhead, eye-level
- Different primary subject per image: e.g. img1 = character in environment, img2 = object/tool detail, img3 = interaction/process
- Explicitly forbidden: two images with the same composition, same background, same pose, or same primary focus
- img1 is the hero — broad, atmospheric, sets the overall tone
- img2+ each map to a NAMED section or concept from the article — quote the section topic in the prompt so the scene is unmistakably different

PROMPT FORMAT — each prompt must include:
1. Primary subject and action (what is happening)
2. Environment/setting (where, what surrounds it)
3. Camera framing (close-up / wide / overhead / etc.)
4. Lighting and mood
5. ${hasReferenceImages ? '"Preserve character appearance from reference image"' : 'Art style and rendering'}

No text, logos, or UI elements in any image. Max 130 words per prompt.

${referenceNote}

${styleBlock}

Return ONLY a valid JSON array of exactly ${imageCount} string(s). No explanation outside the array.`;

  const userPrompt = `Brand: ${brandDisplayName}\nTopic: ${topic}\n\nFull blog post (read all sections before writing prompts):\n${blogContent.slice(0, 7000)}`;
  const raw = await generateWithAzure(system, userPrompt);
  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('Image prompt generation returned unexpected format');
  return JSON.parse(match[0]) as string[];
}

// Generate one image — uses /images/edits (multipart) when a reference image is supplied,
// falls back to /images/generations (JSON) when there are none.
async function generateImage(promptText: string, referenceBase64?: string): Promise<string> {
  const endpoint   = (process.env.AZURE_IMAGE_ENDPOINT ?? process.env.AZURE_OPENAI_ENDPOINT ?? '').replace(/\/$/, '') + '/';
  const key        = process.env.AZURE_IMAGE_API_KEY  ?? process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_IMAGE_DEPLOYMENT ?? 'gpt-image-1.5';
  if (!endpoint || endpoint.includes('your-resource')) throw new Error('AZURE_IMAGE_ENDPOINT not configured');
  if (!key || key.includes('xxx')) throw new Error('AZURE_IMAGE_API_KEY not configured');

  const API_VERSION = '2025-04-01-preview';

  if (referenceBase64) {
    // ── /images/edits: passes reference image for character/style consistency ──
    const url = `${endpoint}openai/deployments/${deployment}/images/edits?api-version=${API_VERSION}`;
    const imageBuffer = Buffer.from(referenceBase64, 'base64');
    const form = new FormData();
    form.append('image', new Blob([imageBuffer], { type: 'image/png' }), 'reference.png');
    form.append('prompt', promptText);
    form.append('n', '1');
    form.append('size', '1792x1024');
    form.append('quality', 'high');

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}` }, // no Content-Type — fetch sets multipart boundary
      body: form,
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Image edit ${res.status}: ${err}`);
    }
    const data = await res.json() as { data: Array<{ b64_json: string }> };
    return data.data[0].b64_json;
  } else {
    // ── /images/generations: text-only fallback ────────────────────────────────
    const url = `${endpoint}openai/deployments/${deployment}/images/generations?api-version=${API_VERSION}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: promptText, n: 1, size: '1792x1024', quality: 'high', output_format: 'png' }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Image generation ${res.status}: ${err}`);
    }
    const data = await res.json() as { data: Array<{ b64_json: string }> };
    return data.data[0].b64_json;
  }
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

// ── GET /api/existing/:brandId/:lang/:slug ────────────────────────────────────
app.get('/api/existing/:brandId/:lang/:slug', (req: Request, res: Response): void => {
  try {
    const { brandId, lang, slug } = req.params as Record<string, string>;
    const mdxPath = resolve(REPO_ROOT, 'brands', brandId, lang, `${slug}.mdx`);
    if (!existsSync(mdxPath)) { res.status(404).json({ error: 'Not found' }); return; }
    const mdx = readFileSync(mdxPath, 'utf-8');

    const imgDir = resolve(REPO_ROOT, 'brands', brandId, 'images', slug);
    const images: Array<{ filename: string; previewUrl: string }> = [];
    if (existsSync(imgDir)) {
      for (const f of readdirSync(imgDir)) {
        if (/\.(png|jpe?g|gif|webp)$/i.test(f)) {
          const b64 = readFileSync(resolve(imgDir, f)).toString('base64');
          const mime = f.match(/\.jpe?g$/i) ? 'image/jpeg' : 'image/png';
          images.push({ filename: f, previewUrl: `data:${mime};base64,${b64}` });
        }
      }
    }
    res.json({ mdx, images });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── POST /api/generate ─────────────────────────────────────────────────────────
// ── POST /api/jobs — queue a new generation job ────────────────────────────────
app.post('/api/jobs', (req: Request, res: Response) => {
  try {
    const body = req.body as JobBody;
    if (!body.brandId || !body.languages?.length || !body.prompt)
      return res.status(400).json({ error: 'brandId, languages, and prompt are required' }) as unknown as void;

    const brands = loadBrands();
    const brand = brands.find(b => b.id === body.brandId);
    if (!brand) return res.status(404).json({ error: `Brand "${body.brandId}" not found` }) as unknown as void;

    const id = newJobId();
    const job: Job = {
      id, brandId: body.brandId, brandName: brand.displayName,
      topic: body.prompt, languages: body.languages,
      imageCount: body.imageCount ?? 0,
      status: 'queued', progress: [],
      createdAt: new Date().toISOString(),
      _body: body,
    };
    // Compute queue position label before pushing
    const position = jobQueue.length + 1;
    jobStore.set(id, job);
    jobQueue.push(id);
    job.progress.push(`Queued at position ${position}`);
    processQueue();
    res.json({ jobId: id, position });
  } catch (err) { res.status(500).json({ error: String(err) }); }
});

// ── GET /api/jobs — list all jobs ──────────────────────────────────────────────
app.get('/api/jobs', (_req: Request, res: Response) => {
  const list = Array.from(jobStore.values())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(j => ({
      id: j.id, brandId: j.brandId, brandName: j.brandName, topic: j.topic,
      languages: j.languages, imageCount: j.imageCount, status: j.status,
      createdAt: j.createdAt, completedAt: j.completedAt,
      stagingId: j.stagingId, error: j.error,
      progressCount: j.progress.length,
      lastLog: j.progress[j.progress.length - 1] ?? '',
    }));
  res.json(list);
});

// ── GET /api/jobs/:id/stream — SSE stream for a single job ─────────────────────
app.get('/api/jobs/:id/stream', (req: Request, res: Response): void => {
  const job = jobStore.get(String(req.params['id']));
  if (!job) { res.status(404).end(); return; }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const write = (type: string, data: unknown) =>
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  // Replay all buffered progress
  job.progress.forEach(p => write('log', p));

  // If already terminal, close immediately
  if (job.status === 'complete') { write('done', { stagingId: job.stagingId }); res.end(); return; }
  if (job.status === 'failed')   { write('error', job.error); res.end(); return; }

  const onLog    = (m: string)  => write('log', m);
  const onStatus = (s: string)  => write('status', s);
  const onDone   = (d: unknown) => { write('done', d); res.end(); };
  const onError  = (e: string)  => { write('error', e); res.end(); };

  jobEmitter.on(`${job.id}:log`, onLog);
  jobEmitter.on(`${job.id}:status`, onStatus);
  jobEmitter.on(`${job.id}:done`, onDone);
  jobEmitter.on(`${job.id}:error`, onError);

  req.on('close', () => {
    jobEmitter.off(`${job.id}:log`, onLog);
    jobEmitter.off(`${job.id}:status`, onStatus);
    jobEmitter.off(`${job.id}:done`, onDone);
    jobEmitter.off(`${job.id}:error`, onError);
  });
});

// ── DELETE /api/jobs/:id — cancel a queued job ─────────────────────────────────
app.delete('/api/jobs/:id', (req: Request, res: Response): void => {
  const job = jobStore.get(String(req.params['id']));
  if (!job) { res.status(404).json({ error: 'Not found' }); return; }
  if (job.status === 'running') { res.status(409).json({ error: 'Cannot cancel a running job' }); return; }
  const idx = jobQueue.indexOf(job.id);
  if (idx !== -1) jobQueue.splice(idx, 1);
  jobStore.delete(job.id);
  res.json({ ok: true });
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

// ── GET /api/staging ──────────────────────────────────────────────────────────
app.get('/api/staging', (_req: Request, res: Response) => {
  try { res.json(listStaged()); }
  catch (err) { res.status(500).json({ error: String(err) }); }
});

// ── GET /api/staging/:id ──────────────────────────────────────────────────────
app.get('/api/staging/:id', (req: Request, res: Response): void => {
  const post = getStaged(String(req.params['id']));
  if (!post) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(post);
});

// ── DELETE /api/staging/:id ───────────────────────────────────────────────────
app.delete('/api/staging/:id', (req: Request, res: Response) => {
  try { deleteStaged(String(req.params['id'])); res.json({ ok: true }); }
  catch (err) { res.status(500).json({ error: String(err) }); }
});

// ── POST /api/staging/:id/approve ─────────────────────────────────────────────
app.post('/api/staging/:id/approve', (req: Request, res: Response): void => {
  try {
    const post = getStaged(String(req.params['id']));
    if (!post) { res.status(404).json({ error: 'Not found' }); return; }
    post.status = 'approved';
    saveStaged(post);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: String(err) }); }
});

// ── POST /api/staging/push-all ────────────────────────────────────────────────
// Writes all approved posts to disk in one go and pushes a single commit.
app.post('/api/staging/push-all', async (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type: string, data: unknown) =>
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  try {
    const approved = listStaged().filter(s => s.status === 'approved');
    if (approved.length === 0) { send('error', 'No approved posts to push.'); res.end(); return; }

    send('log', `Publishing ${approved.length} approved post(s)…`);

    const pushed: string[] = [];
    for (const summary of approved) {
      const post = getStaged(summary.id);
      if (!post) continue;

      for (const [lang, mdx] of Object.entries(post.posts)) {
        const dir = resolve(REPO_ROOT, 'brands', post.brandId, lang);
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, `${post.slug}.mdx`), mdx, 'utf-8');
        send('log', `✓ Written brands/${post.brandId}/${lang}/${post.slug}.mdx`);
      }

      for (const img of post.images ?? []) {
        const dir = resolve(REPO_ROOT, 'brands', post.brandId, 'images', post.slug);
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, img.filename), Buffer.from(img.base64, 'base64'));
        send('log', `✓ Written brands/${post.brandId}/images/${post.slug}/${img.filename}`);
      }

      pushed.push(post.id);
    }

    // Single commit for all approved posts
    const slugList = approved.map(s => `"${s.slug}"`).join(', ');
    send('log', 'Committing and pushing to main…');
    const result = await gitCommitAndPush(`feat(content): publish ${approved.length} approved post(s): ${slugList}`);
    send('log', `🚀 ${result}`);
    send('log', 'Auto-publish workflow will trigger shortly.');

    // Clean up approved posts from staging
    pushed.forEach(deleteStaged);
    send('done', { ok: true, count: pushed.length });
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

// ── POST /api/staging/:id/refine ──────────────────────────────────────────────
app.post('/api/staging/:id/refine', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type: string, data: unknown) =>
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  try {
    const id = String(req.params['id']);
    const { lang, message } = req.body as { lang: string; message: string };

    const staged = getStaged(id);
    if (!staged) throw new Error('Staged post not found');

    const brands = loadBrands();
    const brand = brands.find(b => b.id === staged.brandId);
    if (!brand) throw new Error('Brand not found');

    const globalInstructions = readInstructions();
    const brandContext       = readBrandContext(staged.brandId);
    const extraContextFiles  = readAllContextFiles(staged.brandId);
    const currentMdx = staged.posts[lang];
    if (!currentMdx) throw new Error(`No content for language "${lang}"`);

    const history: ChatMessage[] = staged.chatHistory?.[lang] ?? [];

    const system = `You are a professional blog editor for ${brand.displayName} (${brand.domain}).

You are refining an existing MDX blog post based on user feedback. Apply changes precisely and return the complete updated MDX.

ORIGINAL GENERATION CONTEXT:
- Topic: ${staged.originalPrompt}${staged.originalContext ? `\n- Additional context: ${staged.originalContext}` : ''}
- Language: ${lang}

${globalInstructions ? `GLOBAL WRITING INSTRUCTIONS:\n${globalInstructions}\n` : ''}${brandContext ? `BRAND CONTEXT:\n${brandContext}\n` : ''}${extraContextFiles ? `ADDITIONAL BRAND DOCUMENTS:\n${extraContextFiles}\n` : ''}
RULES:
- Preserve MDX frontmatter structure exactly
- Keep all image imports and <Image /> components in place unless explicitly asked to change them
- Description must stay under 160 characters
- Respond in this exact format:
CHANGES: [one sentence describing what changed]
---
[complete updated MDX, no code fences]`;

    // Build conversation: history pairs + current MDX + new request
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: system },
    ];
    for (const h of history) {
      messages.push({ role: h.role, content: h.content });
    }
    messages.push({
      role: 'user',
      content: `Current MDX:\n\`\`\`\n${currentMdx}\n\`\`\`\n\nRefinement request: ${message}`,
    });

    send('log', 'Refining…');

    const endpoint   = process.env.AZURE_OPENAI_ENDPOINT!;
    const key        = process.env.AZURE_OPENAI_API_KEY!;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-5.3-chat';
    const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=2024-12-01-preview`;

    const apiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: deployment, messages, max_completion_tokens: 8192 }),
    });
    if (!apiRes.ok) {
      const err = await apiRes.text();
      throw new Error(`Azure OpenAI ${apiRes.status}: ${err}`);
    }
    const apiData = await apiRes.json() as { choices: Array<{ message: { content: string } }> };
    const raw = apiData.choices[0].message.content;

    // Parse "CHANGES: ...\n---\n[mdx]"
    const sepIdx = raw.indexOf('\n---\n');
    let changesSummary = 'Updated.';
    let updatedMdx = raw;
    if (sepIdx !== -1 && raw.startsWith('CHANGES:')) {
      changesSummary = raw.slice('CHANGES:'.length, sepIdx).trim();
      updatedMdx = raw.slice(sepIdx + 5).trim();
    }
    updatedMdx = updatedMdx.replace(/^```(?:mdx)?\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    // Re-add opening --- if model stripped it but kept the closing ---
    if (!updatedMdx.startsWith('---') && updatedMdx.includes('\n---\n')) {
      updatedMdx = '---\n' + updatedMdx;
    }

    // Persist updated MDX + append to chat history
    staged.posts[lang] = updatedMdx;
    if (!staged.chatHistory) staged.chatHistory = {};
    if (!staged.chatHistory[lang]) staged.chatHistory[lang] = [];
    const now = new Date().toISOString();
    staged.chatHistory[lang].push(
      { role: 'user',      content: message,        timestamp: now },
      { role: 'assistant', content: changesSummary, timestamp: now },
    );
    saveStaged(staged);

    send('mdx',     updatedMdx);
    send('summary', changesSummary);
    send('done',    {});
    res.end();
  } catch (err) {
    send('error', String(err));
    res.end();
  }
});

// ── Start server ───────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT ?? '3000', 10);
createServer(app).listen(PORT, () => {
  console.log(`\n🏭 Blog Factory Tool running at http://localhost:${PORT}\n`);
});
