#!/usr/bin/env python3
"""Encode browser-picked Unsplash photos into .unsplash-cache (no API keys)."""

from __future__ import annotations

import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
USED_IDS_PATH = REPO / "scripts" / "unsplash-used-photo-ids.json"
UTM_SOURCE = "blog_factory"


def load_used() -> set[str]:
    if USED_IDS_PATH.exists():
        return set(json.loads(USED_IDS_PATH.read_text(encoding="utf-8")))
    return set()


def save_used(used: set[str]) -> None:
    USED_IDS_PATH.write_text(json.dumps(sorted(used), indent=2) + "\n", encoding="utf-8")


def download_url(raw_url: str, width: int, height: int) -> str:
    parsed = urllib.parse.urlparse(raw_url)
    q = urllib.parse.parse_qs(parsed.query)
    q["w"] = [str(width)]
    q["h"] = [str(height)]
    q["fit"] = ["crop"]
    q["fm"] = ["jpg"]
    q["q"] = ["82"]
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


def main() -> None:
    picks_path = Path(sys.argv[1])
    jobs_path = Path(sys.argv[2])
    picks = json.loads(picks_path.read_text(encoding="utf-8"))
    jobs = {j["slug"]: j for j in json.loads(jobs_path.read_text(encoding="utf-8"))}
    used = load_used()
    by_slug = {p["slug"]: p["photos"] for p in picks}

    for slug, photos in by_slug.items():
        job = jobs[slug]
        dest_dir = REPO / job["destRoot"] / slug
        dest_dir.mkdir(parents=True, exist_ok=True)
        entries = []
        print(f"\n=== {job['brand']}/{slug} ===", flush=True)
        for spec, photo in zip(job["files"], photos):
            filename = spec["name"]
            width = int(spec.get("width") or 1200)
            height = int(spec.get("height") or (675 if spec.get("hero") else 800))
            tmp = dest_dir / f".{filename}.download.jpg"
            tmp.write_bytes(download_bytes(download_url(photo["raw"], width, height)))
            dest = dest_dir / filename
            encode_image(tmp, dest, width, height)
            tmp.unlink(missing_ok=True)
            used.add(photo["id"])
            entry = {
                "filename": filename,
                "searchQuery": job["query"],
                "photoId": photo["id"],
                "photographerName": photo.get("name"),
                "photographerUsername": photo.get("username"),
                "photographerProfileUrl": f"https://unsplash.com/@{photo.get('username')}",
                "photoPageUrl": photo.get("html"),
                "downloadTracked": True,
                "resolvedVia": "unsplash-website-session",
                "dimensions": f"{width}x{height}",
                "sizeKB": round(dest.stat().st_size / 1024, 1),
                "attributionHtml": attribution_html(
                    photo.get("name") or "Unsplash photographer",
                    photo.get("username") or "",
                ),
            }
            entries.append(entry)
            print(
                f"  {filename}: {photo['id']} by {photo.get('name')} ({entry['sizeKB']} KB)",
                flush=True,
            )
            time.sleep(0.15)
        (dest_dir / "sources.json").write_text(
            json.dumps(
                {"slug": slug, "resolvedSource": "unsplash", "images": entries},
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        save_used(used)
    print("done", flush=True)


if __name__ == "__main__":
    main()
