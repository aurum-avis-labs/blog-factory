#!/usr/bin/env python3
"""Fetch licensed Unsplash photos for blog-factory posts.

One Unsplash *search* plus one *download_location* call per image (3 images → 4
API requests). Honors the 50 req/hour demo-app cap, rotates to
UNSPLASH_ACCESS_KEY_FALLBACK after HTTP 403, and never writes keys to disk.
"""

from __future__ import annotations

import argparse
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

REPO = Path(__file__).resolve().parents[1]
USED_IDS_PATH = REPO / "scripts" / "unsplash-used-photo-ids.json"
UTM_SOURCE = "blog_factory"

KEYS: list[str] = []
KEY_INDEX = 0
REMAINING: dict[str, int] = {}
RESET_AT: dict[str, int] = {}


def load_keys() -> list[str]:
    primary = os.environ.get("UNSPLASH_ACCESS_KEY", "").strip()
    fallback = os.environ.get("UNSPLASH_ACCESS_KEY_FALLBACK", "").strip()
    keys = [k for k in (primary, fallback) if k]
    if not keys:
        raise SystemExit("UNSPLASH_ACCESS_KEY is missing")
    return keys


def current_key() -> str:
    return KEYS[KEY_INDEX]


def rotate_key(reason: str) -> None:
    global KEY_INDEX
    if KEY_INDEX + 1 >= len(KEYS):
        raise SystemExit(f"All Unsplash keys exhausted: {reason}")
    KEY_INDEX += 1
    print(f"  rotating Unsplash key after {reason}", flush=True)


def load_used_ids() -> set[str]:
    used: set[str] = set()
    if USED_IDS_PATH.exists():
        try:
            used.update(json.loads(USED_IDS_PATH.read_text(encoding="utf-8")))
        except json.JSONDecodeError:
            pass
    for sources_path in (REPO / "brands").glob("*/images/*/sources.json"):
        try:
            data = json.loads(sources_path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        images = data.get("images") or []
        if isinstance(images, list):
            for img in images:
                if isinstance(img, dict) and img.get("photoId"):
                    used.add(img["photoId"])
                elif isinstance(img, dict) and img.get("id"):
                    used.add(img["id"])
    return used


def save_used_ids(used: set[str]) -> None:
    USED_IDS_PATH.write_text(
        json.dumps(sorted(used), indent=2) + "\n", encoding="utf-8"
    )


def parse_rate_headers(headers: Any, key: str) -> None:
    remaining = headers.get("X-Ratelimit-Remaining") or headers.get("RateLimit-Remaining")
    reset = headers.get("X-Ratelimit-Reset") or headers.get("RateLimit-Reset")
    if remaining is not None:
        try:
            REMAINING[key] = int(remaining)
        except ValueError:
            pass
    if reset is not None:
        try:
            RESET_AT[key] = int(reset)
        except ValueError:
            pass


def wait_for_quota(need: int = 1) -> None:
    global KEY_INDEX
    while True:
        for i, key in enumerate(KEYS):
            remaining = REMAINING.get(key)
            if remaining is None or remaining >= need:
                if i != KEY_INDEX:
                    print(
                        f"  switching to Unsplash key {i + 1} (remaining={remaining})",
                        flush=True,
                    )
                    KEY_INDEX = i
                return
        soonest = min(RESET_AT.get(k, int(time.time()) + 3600) for k in KEYS)
        sleep_for = max(1, soonest - int(time.time()) + 2)
        print(
            f"  all Unsplash keys exhausted, sleeping {sleep_for}s then retrying",
            flush=True,
        )
        time.sleep(sleep_for)
        for key in KEYS:
            REMAINING.pop(key, None)
            RESET_AT.pop(key, None)


def api_request(url: str) -> Any:
    global KEYS
    last_err: Exception | None = None
    for _ in range(len(KEYS) + 1):
        wait_for_quota(1)
        key = current_key()
        req = urllib.request.Request(
            url,
            headers={
                "Authorization": f"Client-ID {key}",
                "Accept-Version": "v1",
                "User-Agent": "blog-factory-unsplash/1.0",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                parse_rate_headers(resp.headers, key)
                body = resp.read()
                if not body:
                    return None
                if (resp.headers.get("Content-Type") or "").startswith("application/json"):
                    return json.loads(body.decode())
                return None
        except urllib.error.HTTPError as err:
            last_err = err
            parse_rate_headers(err.headers, key)
            payload = err.read().decode(errors="replace")
            if err.code == 403:
                parse_rate_headers(err.headers, key)
                reset = RESET_AT.get(key, int(time.time()) + 3600)
                wait = max(5, reset - int(time.time()) + 3)
                if wait <= 7200 and ("rate" in payload.lower() or REMAINING.get(key, 0) == 0):
                    print(f"  HTTP 403 rate limit, sleeping {wait}s then retrying same key", flush=True)
                    time.sleep(wait)
                    continue
                rotate_key(f"HTTP 403: {payload[:180]}")
                continue
            if err.code == 429:
                wait_for_quota(1)
                continue
            raise RuntimeError(f"Unsplash {err.code}: {payload[:300]}") from err
    raise RuntimeError(f"Unsplash request failed: {last_err}")


def search_photos(query: str, used: set[str], count: int) -> list[dict[str, Any]]:
    picked: list[dict[str, Any]] = []
    for page in range(1, 8):
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
        results = (data or {}).get("results") or []
        if not results:
            break
        for photo in results:
            pid = photo.get("id")
            if not pid or pid in used:
                continue
            used.add(pid)
            picked.append(photo)
            if len(picked) >= count:
                return picked
        time.sleep(0.4)
    raise RuntimeError(f"Not enough unused Unsplash photos for {query!r} (got {len(picked)})")


def track_download(photo: dict[str, Any]) -> None:
    loc = (photo.get("links") or {}).get("download_location")
    if not loc:
        raise RuntimeError("photo missing download_location")
    api_request(loc)


def download_url(raw_url: str, width: int, height: int) -> str:
    parsed = urllib.parse.urlparse(raw_url)
    q = urllib.parse.parse_qs(parsed.query)
    q["w"] = [str(width)]
    q["h"] = [str(height)]
    q["fit"] = ["crop"]
    q["fm"] = ["webp"]
    q["q"] = ["80"]
    return urllib.parse.urlunparse(
        parsed._replace(query=urllib.parse.urlencode({k: v[-1] for k, v in q.items()}))
    )


def download_bytes(url: str) -> bytes:
    req = urllib.request.Request(
        url, headers={"User-Agent": "blog-factory-unsplash/1.0"}
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def encode_image(src_jpg: Path, dest: Path, width: int, height: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    from PIL import Image

    im = Image.open(src_jpg).convert("RGB")
    src_w, src_h = im.size
    scale = max(width / src_w, height / src_h)
    new_w = max(width, round(src_w * scale))
    new_h = max(height, round(src_h * scale))
    im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = max(0, (new_w - width) // 2)
    top = max(0, (new_h - height) // 2)
    im = im.crop((left, top, left + width, top + height))
    ext = dest.suffix.lower()
    if ext in {".jpg", ".jpeg"}:
        im.save(dest, "JPEG", quality=82, optimize=True)
    elif ext == ".png":
        im.save(dest, "PNG", optimize=True)
    elif ext == ".webp":
        im.save(dest, "WEBP", quality=78, method=6)
    else:
        raise RuntimeError(f"Unsupported image extension: {dest.suffix}")


def attribution_html(photographer: str, username: str) -> str:
    profile = (
        f"https://unsplash.com/@{username}"
        f"?utm_source={UTM_SOURCE}&utm_medium=referral"
    )
    unsplash = f"https://unsplash.com/?utm_source={UTM_SOURCE}&utm_medium=referral"
    return (
        f'<p><em>Photo by <a href="{profile}" target="_blank" rel="noopener noreferrer">'
        f"{photographer}</a> on <a href=\"{unsplash}\" target=\"_blank\" "
        f'rel="noopener noreferrer">Unsplash</a></em></p>'
    )


def process_job(job: dict[str, Any], used: set[str]) -> dict[str, Any]:
    brand = job["brand"]
    slug = job["slug"]
    query = job["query"]
    files = job["files"]
    dest_root = Path(job.get("destRoot") or (REPO / "brands" / brand / "images"))
    dest_dir = dest_root / slug
    dest_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n=== {brand}/{slug} ===", flush=True)
    known_ids = [spec.get("photoId") for spec in files]
    if all(known_ids):
        photos = [
            api_request(f"https://api.unsplash.com/photos/{urllib.parse.quote(pid)}")
            for pid in known_ids
        ]
    else:
        photos = search_photos(query, used, len(files))
    entries: list[dict[str, Any]] = []

    for spec, photo in zip(files, photos):
        filename = spec["name"]
        is_hero = bool(spec.get("hero"))
        width = int(spec.get("width") or (1200 if is_hero else 1200))
        height = int(spec.get("height") or (675 if is_hero else 800))
        if not spec.get("photoId"):
            track_download(photo)
        raw = (photo.get("urls") or {}).get("raw")
        tmp = dest_dir / f".{filename}.download.webp"
        tmp.write_bytes(download_bytes(download_url(raw, width, height)))
        dest = dest_dir / filename
        encode_image(tmp, dest, width, height)
        tmp.unlink(missing_ok=True)
        user = photo.get("user") or {}
        entry = {
            "filename": filename,
            "searchQuery": query,
            "photoId": photo["id"],
            "photographerName": user.get("name"),
            "photographerUsername": user.get("username"),
            "photographerProfileUrl": f"https://unsplash.com/@{user.get('username')}",
            "photoPageUrl": (photo.get("links") or {}).get("html"),
            "downloadTracked": True,
            "dimensions": f"{width}x{height}",
            "sizeKB": round(dest.stat().st_size / 1024, 1),
            "attributionHtml": attribution_html(
                user.get("name") or "Unsplash photographer",
                user.get("username") or "",
            ),
        }
        entries.append(entry)
        print(
            f"  {filename}: {photo['id']} by {user.get('name')} ({entry['sizeKB']} KB) remaining={REMAINING.get(current_key())}",
            flush=True,
        )
        time.sleep(0.6)

    wait_for_quota(4)

    payload = {
        "slug": slug,
        "resolvedSource": "unsplash",
        "images": entries,
    }
    (dest_dir / "sources.json").write_text(
        json.dumps(payload, indent=2) + "\n", encoding="utf-8"
    )
    save_used_ids(used)
    return payload


def main() -> None:
    global KEYS
    parser = argparse.ArgumentParser()
    parser.add_argument("--jobs", required=True, help="JSON file of fetch jobs")
    parser.add_argument("--only", nargs="*", default=[], help="Limit to these slugs")
    args = parser.parse_args()

    KEYS = load_keys()
    jobs = json.loads(Path(args.jobs).read_text(encoding="utf-8"))
    if args.only:
        jobs = [j for j in jobs if j["slug"] in args.only]
    used = load_used_ids()
    print(f"Seeded {len(used)} photo IDs; {len(jobs)} jobs; {len(KEYS)} keys", flush=True)
    for job in jobs:
        process_job(job, used)
    print("done", flush=True)


if __name__ == "__main__":
    main()
