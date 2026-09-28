#!/usr/bin/env python3
"""Generate unique Holist-IQ-style abstract support images (hero + inline)."""
from __future__ import annotations

import hashlib
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

BG = [(6, 6, 8), (11, 11, 15), (14, 14, 19)]
GREEN = (82, 196, 107)
VIOLET = (99, 68, 249)
PURPLE = (135, 32, 235)
WHITE = (245, 246, 250)


def seeded_rng(seed: str, variant: int) -> random.Random:
    h = hashlib.sha256(f"{seed}:{variant}".encode()).hexdigest()
    return random.Random(int(h[:16], 16))


def draw_network(draw: ImageDraw.ImageDraw, rng: random.Random, w: int, h: int) -> None:
    n = rng.randint(14, 22)
    pts = [(rng.randint(80, w - 80), rng.randint(80, h - 80)) for _ in range(n)]
    for i, (x1, y1) in enumerate(pts):
        for j in range(i + 1, n):
            if rng.random() > 0.82:
                continue
            x2, y2 = pts[j]
            color = VIOLET if rng.random() > 0.5 else (174, 182, 214)
            draw.line((x1, y1, x2, y2), fill=color, width=rng.randint(1, 2))
    for x, y in pts:
        r = rng.randint(6, 14)
        col = GREEN if rng.random() > 0.35 else PURPLE
        draw.ellipse((x - r, y - r, x + r, y + r), fill=col, outline=WHITE, width=1)


def draw_loop_arcs(draw: ImageDraw.ImageDraw, rng: random.Random, w: int, h: int) -> None:
    cx, cy = w // 2, h // 2
    for k in range(rng.randint(2, 4)):
        radius = rng.randint(120, min(w, h) // 2 - 40)
        start = rng.randint(0, 270)
        end = start + rng.randint(90, 220)
        bbox = (cx - radius, cy - radius, cx + radius, cy + radius)
        col = GREEN if k % 2 == 0 else VIOLET
        draw.arc(bbox, start=start, end=end, fill=col, width=rng.randint(3, 5))
        # arrow hint
        ang = math.radians(end)
        ax = cx + radius * math.cos(ang)
        ay = cy + radius * math.sin(ang)
        draw.polygon(
            [
                (ax, ay),
                (ax - 12, ay - 6),
                (ax - 6, ay + 10),
            ],
            fill=col,
        )


def make_image(out: Path, seed: str, variant: int, size: tuple[int, int]) -> None:
    w, h = size
    rng = seeded_rng(seed, variant)
    bg = BG[variant % len(BG)]
    img = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(img)
    if variant == 0:
        draw_network(draw, rng, w, h)
        draw_loop_arcs(draw, rng, w, h)
    elif variant == 1:
        draw_loop_arcs(draw, rng, w, h)
        for _ in range(rng.randint(8, 14)):
            x, y = rng.randint(40, w - 40), rng.randint(40, h - 40)
            draw.line((x, y, x + rng.randint(-60, 60), y + rng.randint(-60, 60)), fill=GREEN, width=2)
    else:
        draw_network(draw, rng, w, h)
        for _ in range(3):
            x1, y1 = rng.randint(100, w - 100), rng.randint(100, h - 100)
            x2, y2 = rng.randint(100, w - 100), rng.randint(100, h - 100)
            draw.line((x1, y1, x2, y2), fill=PURPLE, width=3)
    img = img.filter(ImageFilter.GaussianBlur(radius=0.3))
    out.parent.mkdir(parents=True, exist_ok=True)
    if out.suffix.lower() in {".jpg", ".jpeg"}:
        img.save(out, "JPEG", quality=85, optimize=True)
    else:
        img.save(out, "PNG", optimize=True)


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: generate-holist-support-images.py <translationKey> <out_dir>")
        sys.exit(1)
    key = sys.argv[1]
    out_dir = Path(sys.argv[2])
    make_image(out_dir / "img1.png", key, 0, (1200, 900))
    make_image(out_dir / "img2.png", key, 1, (1000, 700))
    make_image(out_dir / "img3.png", key, 2, (1000, 700))
    print(f"Wrote img1-3 under {out_dir}")


if __name__ == "__main__":
    main()
