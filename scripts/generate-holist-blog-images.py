#!/usr/bin/env python3
"""Generate unique abstract support images for Holist-IQ blog posts (no cross-post reuse)."""

from __future__ import annotations

import hashlib
import os
import random
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Install Pillow: pip install Pillow", file=sys.stderr)
    raise

REPO = Path(__file__).resolve().parents[1]
BRAND_IMAGES = REPO / "brands" / "holist-iq" / "images"

BG = [(6, 6, 8), (11, 11, 15), (14, 14, 19), (18, 18, 26)]
GREEN = (82, 196, 107)
VIOLET = (99, 68, 249)
PURPLE = (135, 32, 235)
NEUTRAL = (215, 219, 234)


def _rng(slug: str, slot: int) -> random.Random:
    h = hashlib.sha256(f"{slug}:{slot}".encode()).hexdigest()
    return random.Random(int(h[:16], 16))


def _draw_system_map(draw: ImageDraw.ImageDraw, w: int, h: int, rng: random.Random) -> None:
    n = 7 + rng.randint(0, 8)
    margin = 60
    pts = [(rng.randint(margin, w - margin), rng.randint(margin, h - margin)) for _ in range(n)]
    for _ in range(n + rng.randint(2, 6)):
        a, b = rng.sample(pts, 2)
        color = VIOLET if rng.random() > 0.35 else PURPLE
        draw.line([a, b], fill=color, width=rng.randint(1, 3))
    for p in pts:
        r = rng.randint(10, 22)
        c = GREEN if rng.random() > 0.25 else NEUTRAL
        draw.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=c)


def generate(slug: str, count: int = 3) -> Path:
    out_dir = BRAND_IMAGES / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    for i in range(1, count + 1):
        rng = _rng(slug, i)
        is_hero = i == 1
        w, h = (1200, 900) if is_hero else (1000, 700)
        bg = BG[rng.randint(0, len(BG) - 1)]
        img = Image.new("RGB", (w, h), bg)
        draw = ImageDraw.Draw(img)
        _draw_system_map(draw, w, h, rng)
        if not is_hero:
            # subtle band for mid-body variety
            y = h // 2 + rng.randint(-80, 80)
            draw.rectangle([40, y - 2, w - 40, y + 2], fill=GREEN)
        path = out_dir / f"img{i}.png"
        img.save(path, format="PNG", optimize=True)
        if path.stat().st_size > 320_000 and is_hero:
            img.save(path, format="JPEG", quality=82, optimize=True)
            path = path.with_suffix(".jpg")
            # keep png name for pipeline consistency
            png_path = out_dir / f"img{i}.png"
            Image.open(path).save(png_path, format="PNG", optimize=True)
            path.unlink(missing_ok=True)
    return out_dir


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: generate-holist-blog-images.py <translationKey> [imageCount=3]")
        sys.exit(1)
    slug = sys.argv[1]
    count = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    out = generate(slug, count)
    print(out)


if __name__ == "__main__":
    main()
