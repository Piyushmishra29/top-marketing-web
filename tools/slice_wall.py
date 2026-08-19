#!/usr/bin/env python3
"""Slice the deck's cover collage into wall tiles."""
from PIL import Image
import os

BASE = os.path.expanduser("~/Desktop/top-marketing-web")
OUT = f"{BASE}/public/wall"
os.makedirs(OUT, exist_ok=True)

src = Image.open(f"{BASE}/assets-raw/pages/pg-000.png").convert("RGB")
W, H = src.size
COLS, ROWS = 8, 4
tw, th = W // COLS, H // ROWS

n = 0
for r in range(ROWS):
    for c in range(COLS):
        t = src.crop((c * tw, r * th, (c + 1) * tw, (r + 1) * th))
        # the dead centre of the collage is the big TOP logo lockup - skip those tiles
        if r in (1, 2) and c in (3, 4):
            continue
        t = t.resize((tw * 2, th * 2), Image.LANCZOS)
        n += 1
        t.save(f"{OUT}/collage-{n:02d}.jpg", quality=88, optimize=True)
print(f"{n} collage tiles -> {OUT}  ({tw*2}x{th*2})")
