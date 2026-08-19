#!/usr/bin/env python3
"""Cut the OUR CLIENTELE grid (deck page 12) into 54 trimmed, transparent logo PNGs."""
from PIL import Image
import os, json

BASE = os.path.expanduser("~/Desktop/top-marketing-web")
SRC = f"{BASE}/assets-raw/pages/pg-011.png"
OUT = f"{BASE}/public/logos"
os.makedirs(OUT, exist_ok=True)

# Gutter midpoints found by projection analysis of the source bitmap
COLS = [95, 329, 533, 744, 960, 1138, 1335, 1502, 1683, 1828]
ROWS = [255, 358, 483, 620, 755, 899, 1027]

# (row, col) -> row-bottom override, for logos that straddle a gutter
BOTTOM_OVERRIDE = {(0, 6): 385}  # The Charcoal Project: "PROJECT" sits below the r1/r2 gutter
TOP_OVERRIDE = {(1, 6): 385}     # Tuborg: keep that stray "PROJECT" out of its cell

NAMES = [
    "porsche","meil-foundation","meta","sudha-reddy-foundation","ferrari",
    "acetech","the-charcoal-project","the-met","pink-power-run",
    "iiid-showcase","bbt","lakeshore","wedding-asia","paytm-insider",
    "kpc","tuborg","boosterxp","toma-terra",
    "prism-outdoors","air-live","the-game-room","stri-shakti-awards","casa-decor",
    "pink-pagdi","namishrree","ala-liberty","sixx-gallery",
    "mangala-gowri","ministry-of-kids","empire-home","team-innovation","surface-sefar",
    "sterlina-design","the-blanche-living","marigold-weddings","the-grand-ballroom",
    "experium","czar-homes","rang","s-casa","la-muse",
    "ananda-convention","yours-eventfully","shubh-kalash","aple-lites",
    "event-tower","flash","juice","seating-world","stone-waters",
    "tap-india","kadari-art-gallery","perceptice","f-salon",
]

src = Image.open(SRC).convert("RGB")
manifest = []
i = 0
for r in range(6):
    for c in range(9):
        top = TOP_OVERRIDE.get((r, c), ROWS[r])
        bottom = BOTTOM_OVERRIDE.get((r, c), ROWS[r + 1])
        cell = src.crop((COLS[c], top, COLS[c + 1], bottom))

        # trim to ink bbox
        g = cell.convert("L")
        mask = g.point(lambda v: 255 if v < 235 else 0)
        bbox = mask.getbbox()
        if bbox:
            pad = 4
            bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad),
                    min(cell.width, bbox[2] + pad), min(cell.height, bbox[3] + pad))
            cell = cell.crop(bbox)

        # white -> transparent, keeping anti-aliased edges soft
        cell = cell.convert("RGBA")
        d = list(cell.getdata())
        out = []
        for (R, G, B, _) in d:
            lum = (R * 299 + G * 587 + B * 114) // 1000
            a = 0 if lum >= 250 else (255 if lum <= 200 else int(255 * (250 - lum) / 50))
            out.append((R, G, B, a))
        cell.putdata(out)

        name = NAMES[i]
        cell.save(f"{OUT}/{name}.png")
        manifest.append({"name": name, "file": f"/logos/{name}.png",
                         "w": cell.width, "h": cell.height})
        i += 1

json.dump(manifest, open(f"{OUT}/../logos.json", "w"), indent=1)
print(f"wrote {len(manifest)} logos to {OUT}")
