#!/usr/bin/env python3
"""Pull colour campaign artwork + the team cut-out out of the deck's service pages."""
from PIL import Image
import os, json

BASE = os.path.expanduser("~/Desktop/top-marketing-web")
PG = f"{BASE}/assets-raw/pages"
OUT = f"{BASE}/public/art"
os.makedirs(OUT, exist_ok=True)

# page index -> (slug, crop box of the artwork side of the slide)
SERVICE_ART = {
    2:  ("content-creation", (0, 430, 1900, 1035)),
    3:  ("social-media",     (0, 40, 1075, 1060)),
    4:  ("graphic-design",   (0, 0, 800, 1080)),
    5:  ("web-design",       (0, 20, 1000, 1060)),
    6:  ("cgi",              (40, 60, 900, 1040)),
    7:  ("offline-marketing",(0, 40, 1150, 1060)),
    8:  ("influencer",       (0, 120, 1120, 1060)),
    9:  ("performance",      (60, 60, 1080, 1040)),
    10: ("eventing-pr",      (0, 40, 1560, 690)),
}

man = {}
for idx, (slug, box) in SERVICE_ART.items():
    im = Image.open(f"{PG}/pg-{idx:03d}.png").convert("RGB")
    c = im.crop(box)
    c.thumbnail((1600, 1600), Image.LANCZOS)
    c.save(f"{OUT}/{slug}.jpg", quality=90, optimize=True)
    man[slug] = {"file": f"/art/{slug}.jpg", "w": c.width, "h": c.height}
    print(f"{slug:20s} {c.width}x{c.height}")

# team photo - page 2, right side, on white
im = Image.open(f"{PG}/pg-001.png").convert("RGB")
team = im.crop((700, 90, 1810, 1080))
team.save(f"{OUT}/team.jpg", quality=92, optimize=True)
print("team", team.size)

json.dump(man, open(f"{OUT}/../art.json", "w"), indent=1)
