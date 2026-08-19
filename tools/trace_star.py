#!/usr/bin/env python3
"""Trace the TOP star mark from the deck bitmap into an exact 10-point SVG path."""
from PIL import Image
import math, os

im = Image.open("assets-raw/pages/pg-009.png").convert("L")
px = im.load()
# isolate the solo star (inside the ring, page 10 "Performance Marketing")
X0, Y0, X1, Y1 = 430, 470, 700, 720
ink = [(x, y) for y in range(Y0, Y1) for x in range(X0, X1) if px[x, y] < 120]
xs = [p[0] for p in ink]; ys = [p[1] for p in ink]
minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
print("star bbox", minx, miny, maxx, maxy, "->", maxx - minx, "x", maxy - miny)

S = set(ink)
cx = sum(xs) / len(xs); cy = sum(ys) / len(ys)

# radial profile: farthest ink pixel along each angle
N = 1440
prof = []
for i in range(N):
    a = 2 * math.pi * i / N
    dx, dy = math.cos(a), math.sin(a)
    r = 0.0; best = 0.0
    while r < 400:
        r += 0.5
        x = int(round(cx + dx * r)); y = int(round(cy + dy * r))
        if (x, y) in S:
            best = r
    prof.append(best)

# local maxima = the 5 tips, local minima = the 5 valleys
def extrema(kind):
    out = []
    for i in range(N):
        w = [prof[(i + k) % N] for k in range(-14, 15)]
        v = prof[i]
        if (kind == "max" and v >= max(w) and v > 0) or (kind == "min" and v <= min(w) and v > 0):
            out.append(i)
    # collapse neighbouring indices
    grouped, run = [], [out[0]]
    for i in out[1:]:
        if i - run[-1] <= 20: run.append(i)
        else: grouped.append(run); run = [i]
    grouped.append(run)
    if len(grouped) > 1 and (grouped[0][0] + N - grouped[-1][-1]) <= 20:
        grouped[0] = grouped[-1] + grouped[0]; grouped.pop()
    return [g[len(g) // 2] for g in grouped]

tips, valleys = extrema("max"), extrema("min")
print("tips", len(tips), "valleys", len(valleys))

pts = sorted([(i, prof[i]) for i in tips + valleys])
verts = []
for i, r in pts:
    a = 2 * math.pi * i / N
    verts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))

# normalise into a 0..100 viewBox, preserving aspect
vx = [v[0] for v in verts]; vy = [v[1] for v in verts]
w = max(vx) - min(vx); h = max(vy) - min(vy)
sc = 100.0 / max(w, h)
norm = [((v[0] - min(vx)) * sc, (v[1] - min(vy)) * sc) for v in verts]
d = "M" + " L".join(f"{x:.2f},{y:.2f}" for x, y in norm) + " Z"
print(f"viewBox 0 0 {w*sc:.2f} {h*sc:.2f}")
print(d)
os.makedirs("lib", exist_ok=True)
open("/tmp/star_path.txt", "w").write(f"{w*sc:.2f} {h*sc:.2f}\n{d}\n")
