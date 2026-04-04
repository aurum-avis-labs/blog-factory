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

type ReferenceMode = 'auto' | 'none' | 'force-single';
type ImageSource = 'ai' | 'unsplash';
type ResolvedImageSource = 'ai' | 'unsplash';
/** Matches landing-page blog collection `funnelStage` (GA4 funnel). */
type FunnelStage = 'awareness' | 'interest' | 'consideration';
type TextProvider = 'azure' | 'claude';

function isAzureTextConfigured(): boolean {
  return !!(
    process.env.AZURE_OPENAI_ENDPOINT &&
    !process.env.AZURE_OPENAI_ENDPOINT.includes('your-resource') &&
    process.env.AZURE_OPENAI_API_KEY &&
    !process.env.AZURE_OPENAI_API_KEY.includes('xxx')
  );
}

function isClaudeConfigured(): boolean {
  const k = process.env.ANTHROPIC_API_KEY;
  return !!(k && !k.includes('xxx'));
}

function normalizeFunnelStage(v: unknown): FunnelStage {
  if (v === 'interest' || v === 'consideration') return v;
  return 'awareness';
}

function normalizeTextProvider(v: unknown): TextProvider {
  return v === 'claude' ? 'claude' : 'azure';
}

interface StyleReference {
  name: string;
  base64: string;
}

interface PlanningSection {
  heading: string;
  excerpt: string;
}

interface PlanningDoc {
  title: string;
  description: string;
  intro: string;
  sections: PlanningSection[];
}

interface ReferenceCatalogEntry extends StyleReference {
  descriptionEn: string;
  characterHints: string[];
  topicTags: string[];
  styleNotes: string;
  filenameTags: string[];
}

interface ImagePlan {
  index: number;
  sectionHeading: string;
  sectionExcerpt: string;
  promptEn: string;
  selectedReferenceName?: string;
  selectionReason: string;
  characterHint?: string;
  referenceMode: ReferenceMode;
}

interface UnsplashImageMeta {
  photoId?: string;
  photographerName?: string;
  photographerUsername?: string;
  photographerProfileUrl?: string;
  photoPageUrl?: string;
  downloadLocation?: string;
  sourceUrl?: string;
}

interface StoredImage {
  filename: string;
  base64?: string;
  previewUrl: string;
  alt: string;
  resolvedSource?: ResolvedImageSource;
  unsplash?: UnsplashImageMeta;
}

interface PublishedImageMetadata {
  filename: string;
  alt: string;
  resolvedSource?: ResolvedImageSource;
  unsplash?: UnsplashImageMeta;
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

function listStyleRefs(brandId: string): StyleReference[] {
  const dir = styleRefsDir(brandId);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .map(f => ({
      name: f,
      base64: readFileSync(resolve(dir, f)).toString('base64'),
    }));
}

function extractFrontmatterValue(mdx: string, key: string): string {
  const match = mdx.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : '';
}

function splitMdx(mdx: string): { frontmatter: string; body: string } {
  const match = mdx.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: '', body: mdx };
  return { frontmatter: match[1], body: match[2] };
}

/** Astro content collections require `---` YAML fences; models sometimes emit bare `key:` lines at the top. */
function ensureMdxFrontmatterFence(content: string): string {
  const s = content.replace(/^\uFEFF/, '');
  const start = s.trimStart();
  if (start.startsWith('---')) return s;
  const firstLine = start.split('\n')[0] ?? '';
  if (!/^[A-Za-z0-9_-]+:\s/.test(firstLine)) return s;
  const importRe = /^\s*import\s/m;
  const m = importRe.exec(s);
  const importIdx = m ? m.index : -1;
  if (importIdx === -1) {
    return `---\n${s.trimEnd()}\n---\n`;
  }
  const fm = s.slice(0, importIdx).trimEnd();
  const rest = s.slice(importIdx);
  return `---\n${fm}\n---\n\n${rest}`;
}

function stripMdxForPlanning(body: string): string {
  return body
    .replace(/^import\s+.+$/gm, '')
    .replace(/<Image\b[\s\S]*?\/>/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanMarkdownText(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/<Image\b[\s\S]*?\/>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildPlanningDocFromMdx(mdx: string): PlanningDoc {
  const { body } = splitMdx(mdx);
  const title = extractFrontmatterValue(mdx, 'title');
  const description = extractFrontmatterValue(mdx, 'description');
  const lines = body
    .replace(/^import\s+.+$/gm, '')
    .split('\n');

  const introLines: string[] = [];
  const sections: PlanningSection[] = [];
  let currentHeading = '';
  let currentLines: string[] = [];
  let seenSection = false;

  const flushSection = () => {
    if (!currentHeading) return;
    const excerpt = cleanMarkdownText(currentLines.join(' ')).slice(0, 420);
    sections.push({ heading: currentHeading, excerpt });
    currentHeading = '';
    currentLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      flushSection();
      currentHeading = headingMatch[1].trim();
      seenSection = true;
      continue;
    }
    if (seenSection) currentLines.push(line);
    else introLines.push(line);
  }
  flushSection();

  return {
    title,
    description,
    intro: cleanMarkdownText(introLines.join(' ')).slice(0, 500),
    sections,
  };
}

function normalizeIdentity(value: string): string {
  const lower = value.toLowerCase();
  if (/(chef\s*cook|chefcook|\bcook\b|\bchef\b)/.test(lower)) return 'chef-cook';
  if (/\bivy\b/.test(lower)) return 'ivy';
  if (/\bmiles\b/.test(lower)) return 'miles';
  if (/\bsophie\b/.test(lower)) return 'sophie';
  if (/\bdash\b/.test(lower)) return 'dash';
  if (/\binventory\s*manager\b/.test(lower)) return 'inventory-manager';
  return lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function inferFilenameTags(name: string): string[] {
  const lower = name.toLowerCase().replace(/\.[a-z0-9]+$/i, '');
  const base = lower
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const tags = new Set(base);

  if (tags.has('ivy')) ['inventory', 'ordering', 'supplier', 'procurement', 'stock'].forEach(t => tags.add(t));
  if (tags.has('cook') || tags.has('chef') || tags.has('chefcook')) {
    ['chef-cook', 'chef', 'cook', 'menu', 'recipe', 'dish', 'kitchen', 'cooking'].forEach(t => tags.add(t));
  }
  if (tags.has('inventory') || tags.has('manager')) ['inventory', 'stock', 'operations'].forEach(t => tags.add(t));
  if (tags.has('miles')) ['management', 'coordination', 'operations'].forEach(t => tags.add(t));
  if (tags.has('sophie')) ['communication', 'assistant', 'reporting'].forEach(t => tags.add(t));
  if (tags.has('dash')) ['analytics', 'forecasting', 'data'].forEach(t => tags.add(t));
  if (tags.has('ordering')) ['order', 'supplier', 'procurement'].forEach(t => tags.add(t));
  if (tags.has('dish') || tags.has('peppering')) ['menu', 'recipe', 'dish'].forEach(t => tags.add(t));

  return Array.from(tags);
}

function extractJsonPayload<T>(raw: string): T | null {
  const trimmed = raw.trim().replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '');
  const direct = trimmed.match(/^\s*[\[{][\s\S]*[\]}]\s*$/);
  const candidate = direct ? direct[0] : trimmed.match(/[\[{][\s\S]*[\]}]/)?.[0];
  if (!candidate) return null;
  try {
    return JSON.parse(candidate) as T;
  } catch {
    return null;
  }
}

function buildReferenceCatalogSummary(catalog: ReferenceCatalogEntry[]): string {
  if (!catalog.length) return 'No reference images available.';
  return catalog.map(ref =>
    `- ${ref.name}: character hints [${ref.characterHints.join(', ') || 'none'}], topic tags [${ref.topicTags.join(', ') || 'none'}], style notes: ${ref.styleNotes || ref.descriptionEn}`
  ).join('\n');
}

function buildBrandStyleSummary(catalog: ReferenceCatalogEntry[]): string {
  const summary = catalog.map(ref => ref.styleNotes || ref.descriptionEn).join(' ');
  return summary.trim() || 'Use a clean, professional, editorial illustration style.';
}

function unsplashConfigured(): boolean {
  const key = process.env.UNSPLASH_ACCESS_KEY ?? '';
  return !!key && !key.includes('xxx') && !key.includes('your_');
}

function imageMetadataPath(brandId: string, slug: string): string {
  return resolve(REPO_ROOT, 'brands', brandId, 'images', slug, 'sources.json');
}

function imageMetadataPayload(slug: string, images: PublishedImageMetadata[]) {
  return {
    slug,
    generatedAt: new Date().toISOString(),
    images,
  };
}

const UNSPLASH_UTM_SOURCE = 'blog_factory_tool';

function withUnsplashReferral(url: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set('utm_source', UNSPLASH_UTM_SOURCE);
  parsed.searchParams.set('utm_medium', 'referral');
  return parsed.toString();
}

function selectBestReferenceForPlan(plan: ImagePlan, catalog: ReferenceCatalogEntry[]): { ref?: ReferenceCatalogEntry; reason: string } {
  if (!catalog.length) return { reason: 'No reference images available for this brand.' };

  const haystack = `${plan.sectionHeading} ${plan.sectionExcerpt} ${plan.promptEn} ${plan.characterHint ?? ''}`.toLowerCase();
  const normalizedHint = plan.characterHint ? normalizeIdentity(plan.characterHint) : '';
  let best: { ref: ReferenceCatalogEntry; score: number; reason: string } | null = null;

  for (const ref of catalog) {
    let score = 0;
    const reasons: string[] = [];
    const normalizedRefHints = ref.characterHints.map(normalizeIdentity).filter(Boolean);

    if (normalizedHint && normalizedRefHints.includes(normalizedHint)) {
      score += 10;
      reasons.push(`matched character hint "${plan.characterHint}"`);
    }

    for (const hint of normalizedRefHints) {
      if (hint && haystack.includes(hint.replace(/-/g, ' '))) {
        score += 4;
        reasons.push(`prompt mentions ${hint}`);
      }
    }

    for (const tag of [...ref.topicTags, ...ref.filenameTags]) {
      const normalizedTag = tag.toLowerCase().replace(/-/g, ' ');
      if (normalizedTag && haystack.includes(normalizedTag)) {
        score += 2;
        reasons.push(`matched topic "${tag}"`);
      }
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { ref, score, reason: reasons.slice(0, 3).join('; ') };
    }
  }

  if (!best || best.score < 5) {
    return { reason: 'No reference image was a strong enough semantic match, so this image will use text-only generation.' };
  }

  return { ref: best.ref, reason: best.reason || 'Best semantic reference match for this scene.' };
}

function ensureFirstInlineImagePlacement(mdx: string): string {
  if (!mdx.includes('src={img1}')) return mdx;
  const lines = mdx.split('\n');
  const firstSectionIdx = lines.findIndex(line => /^##\s+/.test(line.trim()));
  const imgIdx = lines.findIndex(line => /<Image\b[^>]*src=\{img1\}/.test(line));
  if (firstSectionIdx === -1 || imgIdx === -1 || imgIdx > firstSectionIdx) return mdx;

  const [imgLine] = lines.splice(imgIdx, 1);
  let insertIdx = firstSectionIdx + (imgIdx < firstSectionIdx ? 0 : 1);

  while (insertIdx < lines.length && !lines[insertIdx].trim()) insertIdx++;
  while (insertIdx < lines.length && lines[insertIdx].trim()) insertIdx++;
  while (insertIdx < lines.length && !lines[insertIdx].trim()) insertIdx++;

  const chunk = ['', imgLine, ''];
  lines.splice(insertIdx, 0, ...chunk);
  return lines.join('\n').replace(/\n{3,}/g, '\n\n');
}

function setFrontmatterValue(mdx: string, key: string, value: string): string {
  const quoted = JSON.stringify(value);
  const { frontmatter, body } = splitMdx(mdx);
  if (!frontmatter) return mdx;
  const lines = frontmatter.split('\n');
  const idx = lines.findIndex(line => line.startsWith(`${key}:`));
  if (idx !== -1) lines[idx] = `${key}: ${quoted}`;
  else lines.push(`${key}: ${quoted}`);
  return `---\n${lines.join('\n')}\n---\n${body}`;
}

function buildUnsplashAttributionHtml(meta: UnsplashImageMeta | undefined): string {
  if (!meta?.photographerName || !meta.photographerProfileUrl) return '';
  const profileUrl = withUnsplashReferral(meta.photographerProfileUrl);
  const unsplashUrl = withUnsplashReferral('https://unsplash.com/');
  return `<p><em>Photo by <a href="${profileUrl}" target="_blank" rel="noopener noreferrer">${meta.photographerName}</a> on <a href="${unsplashUrl}" target="_blank" rel="noopener noreferrer">Unsplash</a></em></p>`;
}

function applyResolvedImagesToMdx(mdx: string, images: StoredImage[]): string {
  let updated = mdx;
  const imagesByFilename = new Map(images.map(img => [img.filename, img]));

  for (const img of images) {
    if (img.resolvedSource !== 'unsplash' || !img.unsplash?.sourceUrl) continue;
    updated = updated.replace(
      new RegExp(`^import\\s+(img${img.filename.match(/img(\\d+)/)?.[1] ?? ''})\\s+from\\s+['"][^'"]*\\/${img.filename}['"]\\s*;?\\r?\\n?`, 'gm'),
      '',
    );
  }

  updated = updated.replace(/<Image\b([^/]*?)\/>/gs, (full, attrs) => {
    const srcM = attrs.match(/src=\{(\w+)\}/);
    if (!srcM) return full;
    const varName = srcM[1];
    const numMatch = varName.match(/^img(\d+)$/);
    const filename = numMatch ? `img${numMatch[1]}.png` : '';
    const img = imagesByFilename.get(filename);
    if (!img || img.resolvedSource !== 'unsplash' || !img.unsplash?.sourceUrl) return full;
    const altM = attrs.match(/alt="([^"]*)"/);
    const alt = altM?.[1] || img.alt || 'Unsplash photo';
    const attribution = buildUnsplashAttributionHtml(img.unsplash);
    return `\n\n![${alt}](${img.unsplash.sourceUrl})\n\n${attribution}\n\n`;
  });

  const remainingImageJsx = /<Image\b/.test(updated);
  if (!remainingImageJsx) {
    updated = updated.replace(/^import\s+\{\s*Image\s*\}\s+from\s+['"]astro:assets['"]\s*;?\r?\n?/gm, '');
  }

  const cover = imagesByFilename.get('img1.png');
  if (cover?.resolvedSource === 'unsplash' && cover.unsplash?.sourceUrl) {
    updated = setFrontmatterValue(updated, 'image', cover.unsplash.sourceUrl);
  }

  return updated.replace(/\n{3,}/g, '\n\n');
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
  images: StoredImage[];
  chatHistory: Record<string, ChatMessage[]>;
  originalPrompt: string;
  originalContext?: string;
  imageSource?: ImageSource;
  imagePlans?: ImagePlan[];
  referenceMode?: ReferenceMode;
  referenceName?: string;
  imagePromptSourceLanguage?: string;
  funnelStage?: FunnelStage;
  textProvider?: TextProvider;
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
  funnelStage?: FunnelStage;
  status: 'pending' | 'approved';
}

// ── Job queue ──────────────────────────────────────────────────────────────────
interface JobBody {
  brandId: string;
  languages: string[];
  prompt: string;
  context?: string;
  imageCount: number;
  imageSource?: ImageSource;
  referenceMode?: ReferenceMode;
  referenceName?: string;
  /** Content funnel stage for landing-page frontmatter (default awareness). */
  funnelStage?: FunnelStage;
  /** MDX body generation provider (planning/refine may still use Azure). */
  textProvider?: TextProvider;
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
  const {
    brandId, languages, prompt, context, imageCount,
    imageSource = 'ai', referenceMode = 'auto', referenceName,
  } = job._body;
  const funnelStage = normalizeFunnelStage(job._body.funnelStage);
  const textProvider = normalizeTextProvider(job._body.textProvider);
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
      jobLog(job, `Generating ${lang.toUpperCase()} post with ${textProvider === 'claude' ? 'Claude' : 'Azure OpenAI'}…`);
      const imageInstructions = imageCount > 0
        ? `Include ${imageCount} image${imageCount > 1 ? 's' : ''}. Add this import block immediately after the frontmatter ---:\n\nimport { Image } from 'astro:assets';\n${Array.from({ length: imageCount }, (_, i) => `import img${i + 1} from '@/assets/blog/POST_SLUG/img${i + 1}.png';`).join('\n')}\n\nPlace each <Image src={imgN} alt="descriptive alt text" width={700} quality={80} class="w-full" /> at natural section breaks inside the article body. The first inline image must appear only after the intro and after the first ## section heading. Do not place img1 directly below the title, description, or frontmatter.`
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
funnelStage: "${funnelStage}"
draft: false
relatedPosts: []
---
RULES:
- Slug must be localized to the post language
- Use POST_SLUG as a placeholder in all image paths
- Use h2, h3, and h4 headings only — never h1 (the title is the page h1)
- funnelStage must stay "${funnelStage}" — matches landing-page analytics funnel (awareness = top-of-funnel, interest = mid, consideration = bottom)
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

      let mdx = await generateBlogMdx(
        textProvider,
        system,
        `Topic: ${prompt}${context ? `\n\nAdditional context: ${context}` : ''}`,
      );
      mdx = mdx.replace(/^```(?:mdx)?\n?/i, '').replace(/\n?```\s*$/i, '').trim();
      if (!slug) { slug = generateSlug(extractTitle(mdx)); jobLog(job, `Slug: "${slug}"`); }
      posts[lang] = ensureFirstInlineImagePlacement(
        ensureMdxFrontmatterFence(mdx.replace(/POST_SLUG/g, slug)),
      );
      jobLog(job, `✓ ${lang.toUpperCase()} post ready (${mdx.length} chars)`);
    }

    // Extract the LLM-written alt texts from the English (or first) MDX before generating images.
    // The LLM writes context-aware, language-appropriate alt text for each <Image> tag;
    // we store these on the image objects so staging/push code can use them if needed.
    function extractAltFromMdx(mdx: string, imgVar: string): string {
      const match = mdx.match(new RegExp(`<Image\\s[^>]*src=\\{${imgVar}\\}[^>]*alt="([^"]+)"`));
      if (!match) {
        // Also try alt before src
        const match2 = mdx.match(new RegExp(`<Image\\s[^>]*alt="([^"]+)"[^>]*src=\\{${imgVar}\\}`));
        return match2?.[1] ?? '';
      }
      return match[1];
    }

    const images: StoredImage[] = [];
    let imagePlans: ImagePlan[] = [];
    let imagePromptSourceLanguage: string | undefined;

    if (imageCount > 0) {
      const imageEndpoint = process.env.AZURE_IMAGE_ENDPOINT ?? process.env.AZURE_OPENAI_ENDPOINT ?? '';
      const imageKey      = process.env.AZURE_IMAGE_API_KEY  ?? process.env.AZURE_OPENAI_API_KEY  ?? '';
      const aiImageReady  = !imageEndpoint.includes('your-resource') && !imageKey.includes('xxx') && !!process.env.AZURE_IMAGE_DEPLOYMENT;
      const unsplashReady = unsplashConfigured();

      if (imageSource === 'unsplash' && !unsplashReady) {
        throw new Error('Unsplash image source selected but UNSPLASH_ACCESS_KEY is not configured');
      }

      if (imageSource === 'ai' && !aiImageReady) {
        jobLog(job, '⚠ AI image generation not configured — skipping');
      } else if (imageSource === 'unsplash' || aiImageReady) {
        let referenceCatalog: ReferenceCatalogEntry[] = [];
        if (styleRefs.length > 0 && (imageSource === 'ai' || aiImageReady)) {
          jobLog(job, `Analysing ${styleRefs.length} style reference image(s)…`);
          referenceCatalog = await analyzeReferenceCatalog(styleRefs);
          jobLog(job, '✓ Reference catalog ready');
        }

        jobLog(job, 'Building English image-planning source from MDX…');
        const planningSource = await buildCanonicalEnglishPlanningDoc(posts, languages);
        imagePromptSourceLanguage = planningSource.sourceLanguage;
        jobLog(job, `✓ English planning source ready (${planningSource.sourceLanguage.toUpperCase()} source)`);

        jobLog(job, `Writing ${imageCount} dedicated English image prompt(s)…`);
        imagePlans = await generateImagePlans(
          planningSource.doc,
          imageCount,
          prompt,
          brand.displayName,
          buildBrandStyleSummary(referenceCatalog),
          buildReferenceCatalogSummary(referenceCatalog),
        );
        if (imageSource === 'ai') {
          imagePlans = applyReferenceSelection(imagePlans, referenceCatalog, referenceMode, referenceName);
        }
        jobLog(job, '✓ Image plans ready');

        const altSourceMdx = posts['en'] ?? posts[Object.keys(posts)[0]] ?? '';
        const usedUnsplashIds = new Set<string>();

        for (let idx = 0; idx < imagePlans.length; idx++) {
          const plan = imagePlans[idx];

          if (imageSource === 'unsplash') {
            try {
              jobLog(job, `Searching Unsplash for image ${plan.index}/${imageCount}…`);
              const unsplashImage = await resolveUnsplashImage(plan, usedUnsplashIds);
              if (unsplashImage) {
                images.push(unsplashImage);
                jobLog(job, `✓ Image ${plan.index} ready from Unsplash`);
                continue;
              }
              jobLog(job, `⚠ No strong Unsplash match for image ${plan.index}; falling back to AI`);
            } catch (unsplashErr) {
              jobLog(job, `⚠ Unsplash failed for image ${plan.index}; falling back to AI: ${String(unsplashErr)}`);
            }

            if (!aiImageReady) {
              jobLog(job, `⚠ AI fallback not configured for image ${plan.index}; skipping`);
              continue;
            }

            const fallbackPlan = applyReferenceSelection([plan], referenceCatalog, 'auto')[0];
            imagePlans[idx] = fallbackPlan;
            const selectedRef = fallbackPlan.selectedReferenceName
              ? referenceCatalog.find(ref => ref.name === fallbackPlan.selectedReferenceName)
              : undefined;
            const mode = selectedRef ? `with ref ${selectedRef.name}` : 'text-only';
            jobLog(job, `Generating AI fallback for image ${plan.index}/${imageCount} (${mode})…`);
            try {
              const image = await generateAiImageForPlan(fallbackPlan, altSourceMdx, selectedRef);
              images.push(image);
              jobLog(job, `✓ Image ${plan.index} ready from AI fallback`);
            } catch (imgErr) {
              jobLog(job, `⚠ AI fallback failed for image ${plan.index} (skipping): ${String(imgErr)}`);
            }
            continue;
          }

          const selectedRef = plan.selectedReferenceName
            ? referenceCatalog.find(ref => ref.name === plan.selectedReferenceName)
            : undefined;
          const mode = selectedRef ? `with ref ${selectedRef.name}` : 'text-only';
          jobLog(job, `Generating image ${plan.index}/${imageCount} (${mode})…`);
          try {
            const image = await generateAiImageForPlan(plan, altSourceMdx, selectedRef);
            images.push(image);
            jobLog(job, `✓ Image ${plan.index} ready`);
          } catch (imgErr) {
            jobLog(job, `⚠ Image ${plan.index} failed (skipping): ${String(imgErr)}`);
          }
        }
      }
    }

    if (images.some(img => img.resolvedSource === 'unsplash')) {
      for (const lang of Object.keys(posts)) {
        posts[lang] = applyResolvedImagesToMdx(posts[lang], images);
      }
    }

    for (const lang of Object.keys(posts)) {
      posts[lang] = setFrontmatterValue(posts[lang], 'funnelStage', funnelStage);
    }

    const stagedId = newStagingId();
    saveStaged({ id: stagedId, brandId, brandName: brand.displayName, slug, createdAt: new Date().toISOString(),
      languages: Object.keys(posts), posts, images, chatHistory: {}, originalPrompt: prompt, originalContext: context,
      imageSource, imagePlans, referenceMode, referenceName, imagePromptSourceLanguage,
      funnelStage, textProvider, status: 'pending' });
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
        const s: StagedSummary = {
          id: p.id,
          brandId: p.brandId,
          brandName: p.brandName,
          slug: p.slug,
          createdAt: p.createdAt,
          languages: p.languages,
          imageCount: p.images?.length ?? 0,
          status: p.status ?? 'pending',
        };
        if (p.funnelStage) s.funnelStage = p.funnelStage;
        return s;
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
async function chatCompleteWithProvider(
  provider: TextProvider,
  messages: Array<{ role: string; content: string }>,
  opts?: { azureMaxCompletion?: number; claudeMaxTokens?: number },
): Promise<string> {
  const azureMax = opts?.azureMaxCompletion ?? 16384;
  const claudeMax = opts?.claudeMaxTokens ?? 8192;

  if (provider === 'azure') {
    if (!isAzureTextConfigured()) throw new Error('AZURE_OPENAI_ENDPOINT / AZURE_OPENAI_API_KEY not configured');
    const endpoint   = process.env.AZURE_OPENAI_ENDPOINT!;
    const key        = process.env.AZURE_OPENAI_API_KEY!;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-5.3-chat';
    const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=2024-12-01-preview`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: deployment,
        messages,
        max_completion_tokens: azureMax,
      }),
    });
    if (!res.ok) throw new Error(`Azure OpenAI ${res.status}: ${await res.text()}`);
    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    return data.choices[0].message.content;
  }

  if (!isClaudeConfigured()) throw new Error('ANTHROPIC_API_KEY not configured');
  const model = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-20250514';
  const system = messages[0]?.role === 'system' ? messages[0].content : '';
  const tail = messages[0]?.role === 'system' ? messages.slice(1) : messages;
  const claudeMessages = tail
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: claudeMax,
      system,
      messages: claudeMessages,
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json() as { content: Array<{ type: string; text?: string }> };
  const block = data.content.find(c => c.type === 'text');
  return block?.text ?? '';
}

async function generateBlogMdx(provider: TextProvider, system: string, userPrompt: string): Promise<string> {
  return chatCompleteWithProvider(provider, [
    { role: 'system', content: system },
    { role: 'user', content: userPrompt },
  ], { azureMaxCompletion: 16384, claudeMaxTokens: 16384 });
}

async function generateWithAzure(system: string, prompt: string): Promise<string> {
  return chatCompleteWithProvider('azure', [
    { role: 'system', content: system },
    { role: 'user', content: prompt },
  ]);
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

async function analyzeReferenceCatalog(styleRefs: StyleReference[]): Promise<ReferenceCatalogEntry[]> {
  const system = `You are a visual reference analyst. For each input reference image, return strict JSON with:
- descriptionEn: short English description of the subject and scene
- characterHints: array of likely character or role identifiers
- topicTags: array of topical tags the image fits
- styleNotes: short style guidance focused on rendering, palette, and mood

Be specific but concise.`;

  const results: ReferenceCatalogEntry[] = [];
  for (const ref of styleRefs) {
    const filenameTags = inferFilenameTags(ref.name);
    const fallbackHints = filenameTags
      .map(normalizeIdentity)
      .filter(Boolean)
      .filter(v => ['chef-cook', 'ivy', 'miles', 'sophie', 'dash', 'inventory-manager'].includes(v));

    try {
      const raw = await generateWithAzureVision(
        system,
        `Reference file name: ${ref.name}\nReturn JSON only.`,
        [ref],
      );
      const parsed = extractJsonPayload<{
        descriptionEn?: string;
        characterHints?: string[];
        topicTags?: string[];
        styleNotes?: string;
      }>(raw);
      results.push({
        ...ref,
        descriptionEn: parsed?.descriptionEn?.trim() || `Reference image ${ref.name}`,
        characterHints: Array.from(new Set([...(parsed?.characterHints ?? []), ...fallbackHints])).filter(Boolean),
        topicTags: Array.from(new Set([...(parsed?.topicTags ?? []), ...filenameTags])).filter(Boolean),
        styleNotes: parsed?.styleNotes?.trim() || '',
        filenameTags,
      });
    } catch {
      results.push({
        ...ref,
        descriptionEn: `Reference image ${ref.name}`,
        characterHints: Array.from(new Set(fallbackHints)),
        topicTags: filenameTags,
        styleNotes: '',
        filenameTags,
      });
    }
  }

  return results;
}

async function buildCanonicalEnglishPlanningDoc(
  posts: Record<string, string>,
  languageOrder: string[],
): Promise<{ doc: PlanningDoc; sourceLanguage: string }> {
  if (posts['en']) return { doc: buildPlanningDocFromMdx(posts['en']), sourceLanguage: 'en' };

  const sourceLanguage = languageOrder.find(lang => posts[lang]) ?? Object.keys(posts)[0];
  const sourceMdx = posts[sourceLanguage];
  if (!sourceMdx) throw new Error('Could not find MDX content to build image prompts');

  const system = `You are an editorial planner. Read the provided MDX blog post and return strict JSON in English with:
- title
- description
- intro
- sections: array of { heading, excerpt }

Rules:
- Translate to English when needed
- Preserve the article's actual section intent
- Keep excerpts concise and scene-relevant
- Return JSON only`;

  const raw = await generateWithAzure(system, `Source language: ${sourceLanguage}\n\nMDX:\n${sourceMdx}`);
  const parsed = extractJsonPayload<PlanningDoc>(raw);
  if (!parsed) throw new Error('Could not build English planning doc from MDX');
  return { doc: parsed, sourceLanguage };
}

async function generateImagePlans(
  planningDoc: PlanningDoc,
  imageCount: number,
  topic: string,
  brandDisplayName: string,
  brandStyleSummary: string,
  referenceCatalogSummary: string,
): Promise<ImagePlan[]> {
  const system = `You are a visual art director creating ${imageCount} English image plans for a blog post.

Return strict JSON array objects with these keys only:
- index
- sectionHeading
- sectionExcerpt
- promptEn
- characterHint

Rules:
- promptEn must always be English
- Ground every plan in the provided planning document, not generic blog imagery
- img1 should represent the article's main thesis / cover concept
- img2+ should map to distinct named sections or clearly different concepts
- Every prompt must specify subject, action, environment, framing, lighting, and mood
- No text, logos, UI, dashboards, or captions inside the image
- If a character is obviously relevant, set characterHint to the best English identifier; otherwise use an empty string
- Keep promptEn under 130 words
- Each image must be compositionally distinct from the others`;

  const userPrompt = `Brand: ${brandDisplayName}
Topic: ${topic}

Brand style summary:
${brandStyleSummary}

Available reference catalog:
${referenceCatalogSummary}

Planning document:
${JSON.stringify(planningDoc, null, 2)}`;

  const raw = await generateWithAzure(system, userPrompt);
  const parsed = extractJsonPayload<Array<{
    index: number;
    sectionHeading: string;
    sectionExcerpt: string;
    promptEn: string;
    characterHint?: string;
  }>>(raw);
  if (!parsed || !Array.isArray(parsed)) throw new Error('Image plan generation returned unexpected format');
  const padded = Array.from({ length: imageCount }, (_, idx) => parsed[idx] ?? {
    index: idx + 1,
    sectionHeading: idx === 0 ? planningDoc.title || 'Cover concept' : planningDoc.sections[idx - 1]?.heading || `Section ${idx + 1}`,
    sectionExcerpt: idx === 0 ? planningDoc.intro || planningDoc.description : planningDoc.sections[idx - 1]?.excerpt || '',
    promptEn: `Editorial illustration for ${topic}`,
    characterHint: '',
  });

  return padded.map((plan, idx) => ({
    index: idx + 1,
    sectionHeading: plan.sectionHeading?.trim() || (idx === 0 ? planningDoc.title || 'Cover concept' : `Section ${idx + 1}`),
    sectionExcerpt: plan.sectionExcerpt?.trim() || '',
    promptEn: plan.promptEn?.trim() || `Editorial illustration for ${topic}`,
    selectionReason: '',
    characterHint: plan.characterHint?.trim() || '',
    referenceMode: 'auto',
  }));
}

function applyReferenceSelection(
  plans: ImagePlan[],
  catalog: ReferenceCatalogEntry[],
  referenceMode: ReferenceMode,
  referenceName?: string,
): ImagePlan[] {
  if (referenceMode === 'none') {
    return plans.map(plan => ({
      ...plan,
      selectedReferenceName: undefined,
      selectionReason: 'Reference mode set to text-only generation.',
      referenceMode,
    }));
  }

  if (referenceMode === 'force-single') {
    return plans.map(plan => ({
      ...plan,
      selectedReferenceName: referenceName,
      selectionReason: referenceName
        ? `Forced single reference "${referenceName}" chosen by the user.`
        : 'Forced single reference mode selected without a reference name.',
      referenceMode,
    }));
  }

  return plans.map(plan => {
    const selected = selectBestReferenceForPlan(plan, catalog);
    return {
      ...plan,
      selectedReferenceName: selected.ref?.name,
      selectionReason: selected.reason,
      referenceMode,
    };
  });
}

function tokenizeForSearch(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(token =>
      token.length > 2 &&
      !['with', 'from', 'that', 'this', 'into', 'about', 'their', 'there', 'would', 'should', 'could', 'image', 'photo', 'editorial'].includes(token)
    );
}

function uniqueTokens(tokens: string[], limit: number): string[] {
  return Array.from(new Set(tokens)).slice(0, limit);
}

function buildUnsplashSearchQuery(plan: ImagePlan): string {
  const headingTokens = tokenizeForSearch(plan.sectionHeading);
  const promptTokens = tokenizeForSearch(plan.promptEn);
  const excerptTokens = tokenizeForSearch(plan.sectionExcerpt);
  const hintTokens = tokenizeForSearch(plan.characterHint ?? '');
  return uniqueTokens([
    ...headingTokens,
    ...hintTokens,
    ...promptTokens,
    ...excerptTokens,
  ], 10).join(' ');
}

function scoreUnsplashPhoto(plan: ImagePlan, photo: {
  alt_description?: string | null;
  description?: string | null;
}, resultIndex: number): number {
  const planTokens = uniqueTokens(tokenizeForSearch(
    `${plan.sectionHeading} ${plan.sectionExcerpt} ${plan.promptEn} ${plan.characterHint ?? ''}`
  ), 16);
  const photoText = `${photo.alt_description ?? ''} ${photo.description ?? ''}`.toLowerCase();
  let score = Math.max(0, 12 - resultIndex);

  for (const token of planTokens) {
    if (photoText.includes(token)) score += 3;
  }
  if (plan.characterHint && photoText.includes(plan.characterHint.toLowerCase().replace(/-/g, ' '))) score += 6;
  if ((photo.alt_description ?? '').length > 12) score += 1;
  return score;
}

function buildUnsplashImageUrl(rawUrl: string): string {
  const url = new URL(rawUrl);
  url.searchParams.set('w', '1536');
  url.searchParams.set('fit', 'max');
  url.searchParams.set('fm', 'png');
  url.searchParams.set('q', '80');
  return url.toString();
}

async function resolveUnsplashImage(
  plan: ImagePlan,
  usedPhotoIds: Set<string>,
): Promise<StoredImage | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) throw new Error('UNSPLASH_ACCESS_KEY not configured');

  const query = buildUnsplashSearchQuery(plan);
  if (!query) return null;

  const searchUrl = new URL('https://api.unsplash.com/search/photos');
  searchUrl.searchParams.set('query', query);
  searchUrl.searchParams.set('per_page', '12');
  searchUrl.searchParams.set('page', '1');
  searchUrl.searchParams.set('orientation', 'landscape');
  searchUrl.searchParams.set('content_filter', 'high');

  const auth = { Authorization: `Client-ID ${accessKey}`, 'Accept-Version': 'v1' };

  const searchRes = await fetch(searchUrl, { headers: auth });
  if (!searchRes.ok) {
    throw new Error(`Unsplash search ${searchRes.status}: ${await searchRes.text()}`);
  }

  const data = await searchRes.json() as {
    results: Array<{
      id: string;
      alt_description?: string | null;
      description?: string | null;
      urls: { raw: string; regular: string; small: string };
      links: { html: string; download_location: string };
      user: { name: string; username: string };
    }>;
  };

  const ranked = data.results
    .filter(photo => !usedPhotoIds.has(photo.id))
    .map((photo, idx) => ({ photo, score: scoreUnsplashPhoto(plan, photo, idx) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score < 10) return null;

  usedPhotoIds.add(best.photo.id);

  const trackingRes = await fetch(best.photo.links.download_location, { headers: auth });
  if (!trackingRes.ok) {
    throw new Error(`Unsplash download tracking ${trackingRes.status}: ${await trackingRes.text()}`);
  }

  const sourceUrl = buildUnsplashImageUrl(best.photo.urls.raw);
  const previewUrl = best.photo.urls.small || best.photo.urls.regular || sourceUrl;
  const photographerProfileUrl = `https://unsplash.com/@${best.photo.user.username}`;
  const alt = best.photo.alt_description?.trim()
    || best.photo.description?.trim()
    || plan.sectionHeading
    || `Unsplash photo for ${plan.promptEn}`;

  return {
    filename: `img${plan.index}.png`,
    previewUrl,
    alt,
    resolvedSource: 'unsplash',
    unsplash: {
      photoId: best.photo.id,
      photographerName: best.photo.user.name,
      photographerUsername: best.photo.user.username,
      photographerProfileUrl,
      photoPageUrl: best.photo.links.html,
      downloadLocation: best.photo.links.download_location,
      sourceUrl,
    },
  };
}

function buildAiPrompt(plan: ImagePlan, selectedRef?: ReferenceCatalogEntry): string {
  return selectedRef
    ? `${plan.promptEn}\n\nPreserve only the matched character identity, outfit cues, colors, and render style from reference image "${selectedRef.name}". Keep the scene, composition, and action unique to this prompt.`
    : (plan.promptEn || 'Editorial illustration');
}

async function generateAiImageForPlan(
  plan: ImagePlan,
  altSourceMdx: string,
  selectedRef?: ReferenceCatalogEntry,
): Promise<StoredImage> {
  const promptText = buildAiPrompt(plan, selectedRef);
  const altMatch = altSourceMdx.match(new RegExp(`<Image\\s[^>]*src=\\{img${plan.index}\\}[^>]*alt="([^"]+)"`))
    || altSourceMdx.match(new RegExp(`<Image\\s[^>]*alt="([^"]+)"[^>]*src=\\{img${plan.index}\\}`));
  const alt = altMatch?.[1]
    || promptText.replace(/\s{2,}/g, ' ').trim().slice(0, 120).replace(/[,.\s]+$/, '');
  const base64 = await generateImage(promptText, selectedRef?.base64);
  return {
    filename: `img${plan.index}.png`,
    base64,
    previewUrl: `data:image/png;base64,${base64}`,
    alt,
    resolvedSource: 'ai',
  };
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
    form.append('size', '1536x1024');
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
      body: JSON.stringify({ prompt: promptText, n: 1, size: '1536x1024', quality: 'high', output_format: 'png' }),
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
    azureOpenAI: isAzureTextConfigured(),
    claude: isClaudeConfigured(),
    azureDalle: !!(
      imageEndpoint && !imageEndpoint.includes('your-resource') &&
      imageKey      && !imageKey.includes('xxx') &&
      process.env.AZURE_IMAGE_DEPLOYMENT &&
      !process.env.AZURE_IMAGE_DEPLOYMENT.includes('xxx')
    ),
    unsplash: unsplashConfigured(),
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

    const imageSource: ImageSource = body.imageSource ?? 'ai';
    if (!['ai', 'unsplash'].includes(imageSource))
      return res.status(400).json({ error: 'Invalid imageSource' }) as unknown as void;

    const referenceMode: ReferenceMode = body.referenceMode ?? 'auto';
    if (!['auto', 'none', 'force-single'].includes(referenceMode))
      return res.status(400).json({ error: 'Invalid referenceMode' }) as unknown as void;

    if (body.imageCount > 0 && imageSource === 'unsplash' && !unsplashConfigured())
      return res.status(400).json({ error: 'Unsplash is not configured' }) as unknown as void;

    if (body.imageCount > 0 && imageSource === 'ai' && referenceMode === 'force-single') {
      if (!body.referenceName)
        return res.status(400).json({ error: 'referenceName is required when referenceMode is force-single' }) as unknown as void;
      const refs = listStyleRefs(body.brandId);
      if (!refs.some(ref => ref.name === body.referenceName))
        return res.status(400).json({ error: `Reference image "${body.referenceName}" not found for this brand` }) as unknown as void;
    }

    if (!isAzureTextConfigured() && !isClaudeConfigured()) {
      return res.status(400).json({ error: 'No text generation provider configured (Azure OpenAI and/or ANTHROPIC_API_KEY)' }) as unknown as void;
    }
    const textProvider = normalizeTextProvider(body.textProvider);
    if (textProvider === 'azure' && !isAzureTextConfigured()) {
      return res.status(400).json({ error: 'Azure OpenAI is not configured; set AZURE_* in tool/.env.local or choose Claude.' }) as unknown as void;
    }
    if (textProvider === 'claude' && !isClaudeConfigured()) {
      return res.status(400).json({ error: 'Anthropic API is not configured; set ANTHROPIC_API_KEY or choose Azure OpenAI.' }) as unknown as void;
    }

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
      images: StoredImage[];
    };

    // 1. Write MDX files to disk
    for (const [lang, mdx] of Object.entries(posts)) {
      const dir  = resolve(REPO_ROOT, 'brands', brandId, lang);
      const file = resolve(dir, `${slug}.mdx`);
      mkdirSync(dir, { recursive: true });
      writeFileSync(file, ensureMdxFrontmatterFence(mdx), 'utf-8');
      send('log', `✓ Written brands/${brandId}/${lang}/${slug}.mdx`);
    }

    // 2. Write images to disk
    for (const img of images) {
      if (!img.base64) continue;
      const dir  = resolve(REPO_ROOT, 'brands', brandId, 'images', slug);
      const file = resolve(dir, img.filename);
      mkdirSync(dir, { recursive: true });
      writeFileSync(file, Buffer.from(img.base64, 'base64'));
      send('log', `✓ Written brands/${brandId}/images/${slug}/${img.filename}`);
    }
    if (images.length > 0) {
      mkdirSync(resolve(REPO_ROOT, 'brands', brandId, 'images', slug), { recursive: true });
      const metadataPath = imageMetadataPath(brandId, slug);
      writeFileSync(metadataPath, JSON.stringify(imageMetadataPayload(slug, images.map(img => ({
        filename: img.filename,
        alt: img.alt,
        resolvedSource: img.resolvedSource,
        unsplash: img.unsplash,
      }))), null, 2), 'utf-8');
      send('log', `✓ Written brands/${brandId}/images/${slug}/sources.json`);
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
        writeFileSync(resolve(dir, `${post.slug}.mdx`), ensureMdxFrontmatterFence(mdx), 'utf-8');
        send('log', `✓ Written brands/${post.brandId}/${lang}/${post.slug}.mdx`);
      }

      for (const img of post.images ?? []) {
        if (!img.base64) continue;
        const dir = resolve(REPO_ROOT, 'brands', post.brandId, 'images', post.slug);
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, img.filename), Buffer.from(img.base64, 'base64'));
        send('log', `✓ Written brands/${post.brandId}/images/${post.slug}/${img.filename}`);
      }
      if ((post.images ?? []).length > 0) {
        mkdirSync(resolve(REPO_ROOT, 'brands', post.brandId, 'images', post.slug), { recursive: true });
        writeFileSync(
          imageMetadataPath(post.brandId, post.slug),
          JSON.stringify(imageMetadataPayload(post.slug, (post.images ?? []).map(img => ({
            filename: img.filename,
            alt: img.alt,
            resolvedSource: img.resolvedSource,
            unsplash: img.unsplash,
          }))), null, 2),
          'utf-8',
        );
        send('log', `✓ Written brands/${post.brandId}/images/${post.slug}/sources.json`);
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
- Preserve MDX frontmatter structure exactly (including funnelStage if present)
- Keep all image imports, <Image /> components, external hotlinked image URLs, and Unsplash attribution lines in place unless explicitly asked to change them
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

    const provider: TextProvider = staged.textProvider ?? 'azure';
    send('log', provider === 'claude' ? 'Refining with Claude…' : 'Refining with Azure OpenAI…');

    const raw = await chatCompleteWithProvider(provider, messages, {
      azureMaxCompletion: 8192,
      claudeMaxTokens: 8192,
    });

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
    updatedMdx = ensureMdxFrontmatterFence(updatedMdx);
    if (staged.funnelStage) {
      updatedMdx = setFrontmatterValue(updatedMdx, 'funnelStage', staged.funnelStage);
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
