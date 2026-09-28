#!/usr/bin/env python3
"""Download Unsplash photo sets for Postology LIVE posts (one translationKey at a time)."""

from __future__ import annotations

import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

REPO = Path(__file__).resolve().parents[2]
IMAGES_ROOT = REPO / "brands" / "postology" / "images"

# Per translationKey: (filename, hero?, search query)
KEY_IMAGE_PLANS: dict[str, list[tuple[str, bool, str]]] = {
    "too-much-clicking-after-ai-tools": [
        ("hero.jpg", True, "creator laptop social media content workflow"),
        ("inline1.jpg", False, "freelancer laptop writing social posts"),
        ("inline2.jpg", False, "smartphone social media apps desk computer"),
    ],
    "idea-to-post-manual-bottlenecks": [
        ("hero.jpg", True, "content creator planning workflow notebook"),
        ("inline1.jpg", False, "person laptop creative work home office"),
        ("inline2.jpg", False, "content calendar planning whiteboard sticky notes"),
    ],
    "content-automation-vs-scheduling-tools": [
        ("hero.jpg", True, "social media scheduler dashboard calendar"),
        ("inline1.jpg", False, "marketing professional laptop analytics"),
        ("inline2.jpg", False, "digital calendar schedule planning desk"),
    ],
    "solo-creator-one-flow-posting": [
        ("hero.jpg", True, "content creator recording video ring light"),
        ("inline1.jpg", False, "woman laptop couch freelance work"),
        ("inline2.jpg", False, "paper planner calendar month schedule"),
    ],
    "multi-platform-posting-hidden-work": [
        ("hero.jpg", True, "multiple smartphones social media apps"),
        ("inline1.jpg", False, "person laptop managing social accounts"),
        ("inline2.jpg", False, "content calendar sticky notes planning"),
    ],
    "multi-platform-social-without-enterprise-team": [
        ("hero.jpg", True, "small startup team meeting laptop"),
        ("inline1.jpg", False, "freelancer laptop remote work coffee shop"),
        ("inline2.jpg", False, "social media icons laptop screen marketing"),
    ],
    "reduce-clicks-social-media-workflow-audit": [
        ("hero.jpg", True, "checklist notebook productivity workflow"),
        ("inline1.jpg", False, "person analyzing workflow laptop notes"),
        ("inline2.jpg", False, "organised desk planner timer efficiency"),
    ],
}


def load_used_photo_ids() -> set[str]:
    used: set[str] = set()
    for sources_path in IMAGES_ROOT.glob("*/sources.json"):
        try:
            data = json.loads(sources_path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        for img in data.get("images") or []:
            if isinstance(img, str):
                continue
            pid = img.get("photoId")
            if pid:
                used.add(pid)
    return used


def api_request(url: str, *, method: str = "GET") -> Any:
    key = os.environ.get("UNSPLASH_ACCESS_KEY", "")
    if not key:
        raise SystemExit("UNSPLASH_ACCESS_KEY missing")
    req = urllib.request.Request(
        url,
        method=method,
        headers={
            "Authorization": f"Client-ID {key}",
            "Accept-Version": "v1",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        if resp.status != 204 and resp.headers.get("Content-Type", "").startswith("application/json"):
            return json.loads(resp.read().decode())
        return None


def search_photo(query: str, used_ids: set[str]) -> dict[str, Any]:
    for page in range(1, 6):
        params = urllib.parse.urlencode(
            {
                "query": query,
                "per_page": "30",
                "page": str(page),
                "orientation": "landscape",
                "content_filter": "high",
            }
        )
        data = api_request(f"https://api.unsplash.com/search/photos?{params}")
        results = data.get("results") or []
        if not results:
            break
        for photo in results:
            pid = photo.get("id")
            if pid and pid not in used_ids:
                return photo
        time.sleep(0.5)
    raise RuntimeError(f"No unused Unsplash result for query: {query!r}")


def track_download(photo: dict[str, Any]) -> None:
    loc = photo.get("links", {}).get("download_location")
    if not loc:
        raise RuntimeError("Photo missing download_location")
    api_request(loc)


def build_download_url(raw_url: str, *, width: int, height: int) -> str:
    parsed = urllib.parse.urlparse(raw_url)
    q = urllib.parse.parse_qs(parsed.query)
    q["w"] = [str(width)]
    q["h"] = [str(height)]
    q["fit"] = ["crop"]
    q["fm"] = ["jpg"]
    q["q"] = ["80"]
    flat = {k: v[-1] for k, v in q.items()}
    return urllib.parse.urlunparse(parsed._replace(query=urllib.parse.urlencode(flat)))


def download_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "blog-factory-postology-unsplash/1.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def file_size_kb(path: Path) -> float:
    return path.stat().st_size / 1024


def compress_with_ffmpeg(src: Path, dest: Path, *, max_kb: float, width: int, height: int) -> None:
    qualities = [4, 6, 8, 10, 12, 15, 18, 22, 26, 31]
    for qscale in qualities:
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(src),
                "-vf",
                f"scale={width}:{height}:force_original_aspect_ratio=increase,crop={width}:{height}",
                "-q:v",
                str(qscale),
                str(dest),
            ],
            check=True,
            capture_output=True,
        )
        if file_size_kb(dest) <= max_kb:
            return
    if file_size_kb(dest) > max_kb:
        raise RuntimeError(f"Could not compress {dest.name} under {max_kb}KB (got {file_size_kb(dest):.1f}KB)")


def save_jpeg(
    raw_url: str,
    dest: Path,
    *,
    width: int,
    height: int,
    max_kb: float,
) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    url = build_download_url(raw_url, width=width, height=height)
    tmp = dest.with_suffix(".download.jpg")
    tmp.write_bytes(download_bytes(url))
    compress_with_ffmpeg(tmp, dest, max_kb=max_kb, width=width, height=height)
    tmp.unlink(missing_ok=True)


def write_sources(translation_key: str, entries: list[dict[str, Any]]) -> None:
    payload = {
        "translationKey": translation_key,
        "resolvedSource": "unsplash",
        "images": entries,
    }
    out = IMAGES_ROOT / translation_key / "sources.json"
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def process_key(translation_key: str, used_ids: set[str]) -> list[dict[str, Any]]:
    plan = KEY_IMAGE_PLANS[translation_key]
    meta_entries: list[dict[str, Any]] = []

    print(f"\n=== {translation_key} ===", flush=True)
    for filename, is_hero, query in plan:
        time.sleep(1.2)
        photo = search_photo(query, used_ids)
        used_ids.add(photo["id"])
        track_download(photo)
        time.sleep(0.8)

        if is_hero:
            w, h, max_kb = 1200, 675, 300.0
        else:
            w, h, max_kb = 1200, 800, 350.0

        dest = IMAGES_ROOT / translation_key / filename
        save_jpeg(photo["urls"]["raw"], dest, width=w, height=h, max_kb=max_kb)
        size = file_size_kb(dest)
        user = photo.get("user") or {}
        entry = {
            "filename": filename,
            "searchQuery": query,
            "photoId": photo["id"],
            "photographerName": user.get("name"),
            "photographerUsername": user.get("username"),
            "photoPageUrl": photo.get("links", {}).get("html"),
            "downloadTracked": True,
            "dimensions": f"{w}x{h}",
            "sizeKB": round(size, 1),
        }
        meta_entries.append(entry)
        print(
            f"  {filename}: {photo['id']} by {user.get('name')} ({size:.1f} KB)",
            flush=True,
        )

    write_sources(translation_key, meta_entries)
    return meta_entries


def main() -> None:
    keys = sys.argv[1:]
    if not keys:
        print("Usage: fetch-unsplash-live.py <translationKey> [...]", file=sys.stderr)
        raise SystemExit(2)

    used_ids = load_used_photo_ids()
    if used_ids:
        print(f"Seeded {len(used_ids)} existing photo IDs from sources.json", flush=True)
    summary: dict[str, list[dict[str, Any]]] = {}
    for key in keys:
        if key not in KEY_IMAGE_PLANS:
            raise SystemExit(f"Unknown translationKey: {key}")
        summary[key] = process_key(key, used_ids)

    print("\n--- summary JSON ---")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
