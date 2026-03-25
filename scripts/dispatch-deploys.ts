/**
 * dispatch-deploys.ts
 *
 * Sends repository_dispatch events to landing page repos for the specified brands.
 * This triggers their deploy-blog-update.yml workflow to fetch fresh content and deploy.
 *
 * Usage:
 *   npx tsx scripts/dispatch-deploys.ts --brands=aurum,do-for-me
 *   npx tsx scripts/dispatch-deploys.ts --brands=all
 *   npx tsx scripts/dispatch-deploys.ts --brands=aurum --dry-run
 *
 * Requires CROSS_REPO_PAT environment variable with contents:write permission on target repos.
 */

import { brands } from "../brands.config.ts";

const args = process.argv.slice(2);
const brandsArg = args
  .find((a) => a.startsWith("--brands="))
  ?.split("=")[1];
const dryRun = args.includes("--dry-run");

if (!brandsArg) {
  console.error("Usage: npx tsx scripts/dispatch-deploys.ts --brands=<brand1,brand2|all> [--dry-run]");
  process.exit(1);
}

const token = process.env.CROSS_REPO_PAT || process.env.GITHUB_TOKEN;
if (!token && !dryRun) {
  console.error("Error: CROSS_REPO_PAT or GITHUB_TOKEN environment variable is required");
  process.exit(1);
}

// Resolve which brands to dispatch
const brandIds = brandsArg === "all"
  ? brands.map((b) => b.id)
  : brandsArg.split(",").map((s) => s.trim()).filter(Boolean);

const targetBrands = brandIds.map((id) => {
  const brand = brands.find((b) => b.id === id);
  if (!brand) {
    console.error(`Unknown brand: ${id}`);
    console.error(`Available: ${brands.map((b) => b.id).join(", ")}`);
    process.exit(1);
  }
  return brand;
});

console.log(`Dispatching to ${targetBrands.length} brand(s)${dryRun ? " (DRY RUN)" : ""}:\n`);

for (const brand of targetBrands) {
  const [owner, repo] = brand.repo.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/dispatches`;

  console.log(`  ${brand.displayName} → ${brand.repo}`);

  if (dryRun) {
    console.log(`    [dry-run] Would POST to ${url}`);
    continue;
  }

  try {
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
          brand: brand.id,
          triggered_by: "blog-factory",
        },
      }),
    });

    if (response.status === 204) {
      console.log(`    Dispatched successfully`);
    } else {
      const body = await response.text();
      console.error(`    Failed (${response.status}): ${body}`);
    }
  } catch (err) {
    console.error(`    Error: ${err}`);
  }
}

console.log("\nDone.");
