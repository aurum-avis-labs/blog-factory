#!/usr/bin/env python3
"""Copy cached Unsplash images onto PR branches and add attribution in MDX."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]


def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd or REPO, check=check, text=True, capture_output=True)


def patch_mdx(path: Path, sources: dict, image_dir_slug: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if "utm_source=blog_factory" in text:
        return False
    by_file = {img["filename"]: img for img in sources.get("images") or [] if isinstance(img, dict)}
    hero = next((img for img in by_file.values() if img["filename"].startswith("hero") or img["filename"].startswith("img1")), None)
    if not hero:
        return False

    lines = text.splitlines(keepends=True)
    var_to_file: dict[str, str] = {}
    for line in lines:
        m = re.match(r"import (\w+) from '@/assets/blog/([^']+)';", line)
        if m:
            var_to_file[m.group(1)] = Path(m.group(2)).name

    out: list[str] = []
    inserted_hero = False
    changed = False
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.strip() == "{" and i + 1 < len(lines) and "<Image" in lines[i + 1]:
            i += 1
            continue
        if line.strip() == "}" and out and "<Image" in (out[-1] + (out[-2] if len(out) > 1 else "")):
            i += 1
            continue
        out.append(line)
        if (
            not inserted_hero
            and line.startswith("import ")
            and (i + 1 >= len(lines) or not lines[i + 1].startswith("import "))
        ):
            if i + 1 < len(lines) and lines[i + 1].strip() == "":
                i += 1
            hero_html = hero["attributionHtml"].replace("<p><em>Photo by", "<p><em>Hero photo by", 1)
            out.append("\n" + hero_html + "\n\n")
            inserted_hero = True
            changed = True
        if "<Image" in line:
            src = re.search(r"src=\{(\w+)\}", line)
            if src:
                fname = var_to_file.get(src.group(1))
                img = by_file.get(fname or "")
                if img and "attributionHtml" in img:
                    out.append("\n" + img["attributionHtml"] + "\n")
                    changed = True
        i += 1
    if changed:
        path.write_text("".join(out), encoding="utf-8")
    return changed


def apply_job(job: dict) -> None:
    cache = REPO / job["destRoot"] / job["slug"]
    sources_path = cache / "sources.json"
    if not sources_path.exists():
        print(f"skip {job['slug']}: no cache", flush=True)
        return
    sources = json.loads(sources_path.read_text(encoding="utf-8"))
    branch = job["branch"]
    number = job["pr"]
    brand = job["brand"]
    slug = job["slug"]
    print(f"\n=== PR #{number} {branch} / {slug} ===", flush=True)
    run(["git", "fetch", "origin", branch])
    work = Path(tempfile.mkdtemp(prefix=f"bf-pr-{number}-"))
    try:
        run(["git", "worktree", "add", "--detach", str(work), f"origin/{branch}"])
        dest = work / "brands" / brand / "images" / slug
        dest.mkdir(parents=True, exist_ok=True)
        for item in cache.iterdir():
            if item.name.startswith("."):
                continue
            shutil.copy2(item, dest / item.name)
        for mdx in (work / "brands" / brand).glob("*/*.mdx"):
            body = mdx.read_text(encoding="utf-8", errors="replace")
            if f"/assets/blog/{slug}/" in body or f"images/{slug}/" in str(mdx):
                patch_mdx(mdx, sources, slug)
        run(["git", "add", f"brands/{brand}/images/{slug}", f"brands/{brand}"], cwd=work)
        status = run(["git", "status", "--porcelain"], cwd=work)
        if not status.stdout.strip():
            print("  no changes", flush=True)
            return
        run(
            [
                "git",
                "commit",
                "-m",
                f"{brand}: Unsplash photos for {slug}",
            ],
            cwd=work,
        )
        run(["git", "push", "origin", f"HEAD:refs/heads/{branch}"], cwd=work)
        print("  pushed", flush=True)
    finally:
        run(["git", "worktree", "remove", "--force", str(work)], check=False)
        shutil.rmtree(work, ignore_errors=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--jobs", nargs="+", required=True)
    parser.add_argument("--only-pr", type=int, default=0)
    args = parser.parse_args()
    jobs: list[dict] = []
    for path in args.jobs:
        jobs.extend(json.loads(Path(path).read_text(encoding="utf-8")))
    if args.only_pr:
        jobs = [j for j in jobs if j.get("pr") == args.only_pr]
    for job in jobs:
        if "pr" not in job:
            continue
        try:
            apply_job(job)
        except subprocess.CalledProcessError as err:
            print(err.stdout)
            print(err.stderr)
            print(f"FAILED {job.get('pr')} {err}", flush=True)
            sys.exit(1)


if __name__ == "__main__":
    main()
