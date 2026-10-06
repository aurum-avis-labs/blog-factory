#!/usr/bin/env python3
"""Add de/fr/it MDX to Postology PRs 79, 80, 91 and fix EN image imports."""

from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
STAGING = REPO / ".locale-staging"

JOBS = [
    {
        "pr": 79,
        "branch": "cursor/postology-buffer-later-publer-49cb",
        "en_slug": "buffer-vs-later-vs-publer-comparison",
        "locales": {
            "de": "buffer-vs-later-vs-publer-vergleich",
            "fr": "buffer-vs-later-vs-publer-comparaison",
            "it": "buffer-vs-later-vs-publer-confronto",
        },
        "staging": "buffer",
    },
    {
        "pr": 80,
        "branch": "cursor/postology-best-scheduling-tools-2026-49cb",
        "en_slug": "best-social-media-scheduling-tools-creators-2026",
        "locales": {
            "de": "beste-social-media-planungstools-creator-2026",
            "fr": "meilleurs-outils-planification-createurs-2026",
            "it": "migliori-tool-scheduling-creator-2026",
        },
        "staging": "best",
    },
    {
        "pr": 91,
        "branch": "cursor/postology-native-vs-third-party-49cb",
        "en_slug": "native-vs-third-party-social-schedulers",
        "locales": {
            "de": "native-vs-drittanbieter-social-planer",
            "fr": "planificateurs-natifs-vs-tiers",
            "it": "scheduler-nativi-vs-terze-parti",
        },
        "staging": "native",
    },
]


def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd or REPO, check=check, text=True, capture_output=True)


def patch_en_imports(path: Path, slug: str) -> None:
    text = path.read_text(encoding="utf-8")
    old = (
        "import inline1 from '@/assets/blog/content-automation-vs-scheduling-tools/inline1.webp';\n"
        "import inline2 from '@/assets/blog/content-automation-vs-scheduling-tools/inline2.webp';"
    )
    new = (
        f"import inline1 from '@/assets/blog/{slug}/inline1.webp';\n"
        f"import inline2 from '@/assets/blog/{slug}/inline2.webp';"
    )
    if old in text:
        text = text.replace(old, new)
        path.write_text(text, encoding="utf-8")


def apply_job(job: dict) -> None:
    branch = job["branch"]
    print(f"\n=== PR #{job['pr']} {branch} ===", flush=True)
    run(["git", "fetch", "origin", branch])
    work = Path(tempfile.mkdtemp(prefix=f"bf-locale-{job['pr']}-"))
    try:
        run(["git", "worktree", "add", "--detach", str(work), f"origin/{branch}"])
        en_path = work / "brands/postology/en" / f"{job['en_slug']}.mdx"
        patch_en_imports(en_path, job["en_slug"])
        for lang, slug in job["locales"].items():
            src = STAGING / job["staging"] / f"{lang}.mdx"
            dest_dir = work / "brands/postology" / lang
            dest_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest_dir / f"{slug}.mdx")
        run(["git", "add", "brands/postology"], cwd=work)
        status = run(["git", "status", "--porcelain"], cwd=work)
        if not status.stdout.strip():
            print("  no changes", flush=True)
            return
        run(
            [
                "git",
                "commit",
                "-m",
                f"postology: add de/fr/it for {job['en_slug']}",
            ],
            cwd=work,
        )
        run(["git", "push", "origin", f"HEAD:refs/heads/{branch}"], cwd=work)
        print("  pushed", flush=True)
    finally:
        run(["git", "worktree", "remove", "--force", str(work)], check=False)
        shutil.rmtree(work, ignore_errors=True)


def main() -> None:
    for job in JOBS:
        apply_job(job)
    print("done", flush=True)


if __name__ == "__main__":
    main()
