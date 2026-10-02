/**
 * dispatch-due-deploys.ts
 *
 * Dispatches blog-update to landing page repos whose non-draft posts have a
 * Europe/Zurich pubDate after the last successful deploy-blog-update.yml run
 * and on or before today. CitySage is skipped (it ships from a release tag).
 *
 * Usage:
 *   npx tsx scripts/dispatch-due-deploys.ts
 *   npx tsx scripts/dispatch-due-deploys.ts --dry-run
 *
 * Requires CROSS_REPO_PAT or GITHUB_TOKEN when not a dry run.
 * repository_dispatch needs Contents write on the target repos.
 * Actions read lets the script skip brands already deployed. Without it, brands
 * with a non-draft post in the last LOOKBACK_DAYS are dispatched instead.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { brands } from "../brands.config.ts";

const TIME_ZONE = "Europe/Zurich";
const WORKFLOW_FILE = "deploy-blog-update.yml";
const LOOKBACK_DAYS = 7;

export interface ScheduledPost {
  /** Path relative to brands/{id}/ */
  file: string;
  draft: boolean;
  /** YYYY-MM-DD when present in frontmatter */
  pubDate: string | null;
}

/** YYYY-MM-DD that many calendar days before `day`. `day` is already a calendar date. */
export function calendarDaysBefore(day: string, days: number): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!match || days < 0 || !Number.isInteger(days)) {
    throw new Error(`Invalid calendar day offset: ${day} - ${days}`);
  }
  const instant = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  instant.setUTCDate(instant.getUTCDate() - days);
  return instant.toISOString().slice(0, 10);
}

/** Calendar day of an instant in Europe/Zurich, as YYYY-MM-DD. */
export function zurichCalendarDay(instant: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

/**
 * A post is due when it is not a draft, its pubDate is on or before `today`,
 * and (if a successful deploy exists) strictly after that run's Zurich start day.
 * Days are compared as YYYY-MM-DD strings. `lastRunDay` null means the workflow
 * has never succeeded: any already-due post qualifies.
 */
export function isPostDue(
  post: { draft: boolean; pubDate: string },
  today: string,
  lastRunDay: string | null,
): boolean {
  if (post.draft === true) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.pubDate)) return false;
  if (post.pubDate > today) return false;
  if (lastRunDay === null) return true;
  return post.pubDate > lastRunDay;
}

/** True when this brand should receive one blog-update dispatch. */
export function shouldDispatch(
  posts: Array<{ draft: boolean; pubDate: string | null }>,
  today: string,
  lastRunDay: string | null,
): boolean {
  return posts.some(
    (post) =>
      post.pubDate !== null &&
      isPostDue({ draft: post.draft, pubDate: post.pubDate }, today, lastRunDay),
  );
}

export function duePosts(
  posts: ScheduledPost[],
  today: string,
  lastRunDay: string | null,
): ScheduledPost[] {
  return posts.filter(
    (post) =>
      post.pubDate !== null &&
      isPostDue({ draft: post.draft, pubDate: post.pubDate }, today, lastRunDay),
  );
}

/** Reads `draft` and `pubDate` from leading YAML frontmatter. */
export function readSchedule(source: string): { draft: boolean; pubDate: string | null } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { draft: false, pubDate: null };

  let draft = false;
  let pubDate: string | null = null;
  for (const line of match[1].split(/\r?\n/)) {
    const draftMatch = /^draft:\s*["']?(true|false)["']?\s*(?:#.*)?$/.exec(line);
    if (draftMatch) draft = draftMatch[1] === "true";
    const dateMatch = /^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*(?:#.*)?$/.exec(line);
    if (dateMatch) pubDate = dateMatch[1];
  }
  return { draft, pubDate };
}

function repoRoot(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

async function walkMarkdown(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw err;
  }

  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdown(full)));
    } else if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))) {
      files.push(full);
    }
  }
  return files;
}

export async function collectBrandPosts(brandId: string): Promise<ScheduledPost[]> {
  const root = path.join(repoRoot(), "brands", brandId);
  const files = await walkMarkdown(root);
  const posts: ScheduledPost[] = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const schedule = readSchedule(source);
    posts.push({
      file: path.relative(root, file),
      draft: schedule.draft,
      pubDate: schedule.pubDate,
    });
  }
  return posts;
}

class GitHubRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubRequestError";
    this.status = status;
  }
}

async function latestSuccessfulRunDay(repo: string, token: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${repo}/actions/workflows/${WORKFLOW_FILE}/runs?status=success&per_page=1`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new GitHubRequestError(`GET ${url} failed (${response.status}): ${body}`, response.status);
  }

  const data = (await response.json()) as {
    workflow_runs?: Array<{ run_started_at?: string | null }>;
  };
  const run = data.workflow_runs?.[0];
  if (!run) return null;
  if (!run.run_started_at) {
    throw new Error(`Successful ${WORKFLOW_FILE} run on ${repo} is missing run_started_at`);
  }
  const instant = new Date(run.run_started_at);
  if (Number.isNaN(instant.getTime())) {
    throw new Error(`Invalid run_started_at on ${repo}: ${run.run_started_at}`);
  }
  return zurichCalendarDay(instant);
}

async function dispatchBrand(
  repo: string,
  brandId: string,
  token: string,
  dryRun: boolean,
): Promise<boolean> {
  const url = `https://api.github.com/repos/${repo}/dispatches`;
  if (dryRun) {
    console.log(`    [dry-run] Would POST to ${url}`);
    return true;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      event_type: "blog-update",
      client_payload: {
        brand: brandId,
        triggered_by: "blog-factory",
      },
    }),
  });

  if (response.status === 204) {
    console.log(`    Dispatched successfully`);
    return true;
  }

  const body = await response.text();
  console.error(`    Failed (${response.status}): ${body}`);
  return false;
}

function invokedDirectly(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  const token = process.env.CROSS_REPO_PAT || process.env.GITHUB_TOKEN;
  if (!token && !dryRun) {
    console.error("Error: CROSS_REPO_PAT or GITHUB_TOKEN environment variable is required");
    process.exit(1);
  }

  const today = zurichCalendarDay(new Date());
  console.log(`Today in Europe/Zurich: ${today}${dryRun ? " (DRY RUN)" : ""}\n`);

  let failed = false;

  for (const brand of brands) {
    if (brand.previewOnly) {
      console.log(`  ${brand.displayName}: preview only, not dispatched.`);
      continue;
    }

    if (brand.id === "citysage") {
      console.log(`  ${brand.displayName}: CitySage ships from a release tag and is not dispatched.`);
      continue;
    }

    console.log(`  ${brand.displayName} → ${brand.repo}`);
    const posts = await collectBrandPosts(brand.id);

    let lastRunDay: string | null = null;
    let assumedLookback = false;
    if (!token) {
      console.log(`    [dry-run] No token; last successful ${WORKFLOW_FILE} run was not read.`);
      const alreadyDue = duePosts(posts, today, null);
      if (alreadyDue.length === 0) {
        console.log(`    No non-draft posts on or before today.`);
      } else {
        for (const post of alreadyDue) {
          console.log(`    candidate ${post.file} (${post.pubDate})`);
        }
        console.log(
          `    Dispatch depends on whether a pubDate is after the Zurich day of the latest successful run.`,
        );
      }
      continue;
    }

    try {
      lastRunDay = await latestSuccessfulRunDay(brand.repo, token);
    } catch (err) {
      if (err instanceof GitHubRequestError && err.status === 403) {
        lastRunDay = calendarDaysBefore(today, LOOKBACK_DAYS);
        assumedLookback = true;
        console.log(
          `    Workflow runs are not readable with this token. Dispatching posts dated after ${lastRunDay}.`,
        );
      } else {
        console.error(`    ${err instanceof Error ? err.message : err}`);
        failed = true;
        continue;
      }
    }

    if (lastRunDay === null) {
      console.log(`    No successful ${WORKFLOW_FILE} run yet.`);
    } else if (!assumedLookback) {
      console.log(`    Last successful run started on ${lastRunDay} (${TIME_ZONE}).`);
    }

    const due = duePosts(posts, today, lastRunDay);
    if (due.length === 0) {
      console.log(`    No posts due since last deploy.`);
      continue;
    }

    for (const post of due) {
      console.log(`    due ${post.file} (${post.pubDate})`);
    }

    const ok = await dispatchBrand(brand.repo, brand.id, token, dryRun);
    if (!ok) failed = true;
  }

  console.log("\nDone.");
  if (failed) process.exit(1);
}

if (invokedDirectly()) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
