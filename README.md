# TOP Marketing Solutions — website

A motion-led site for **TOP Marketing Solutions**, a Hyderabad marketing and
communications agency. Next.js 16, static export, GSAP + Lenis.

Live preview: `npm run dev` → http://localhost:3000

## The idea

The brand is monochrome — navy `#0C1539` and white, nothing else. Colour only
ever enters the page through the agency's own campaign work. So the site is
built around a **wall**: an infinite, draggable field of five years of output.
Every route is a different way of looking at that same wall.

| Route | What it is |
|---|---|
| `/` | The wall, live. Drag it in any direction; it has momentum and drifts on its own. Then the manifesto, the numbers, the nine services and the client roster. |
| `/work` | The wall calmed into a grid. Click any piece to open it. |
| `/services` | The nine disciplines, each with its real artwork, drifting on parallax. |
| `/about` | The team, the numbers, and all 54 client marks. |
| `/contact` | Where to find them. |

## Motion

- **Intro** — the star draws itself, the wordmark rises, the curtain lifts off the wall. Once per session (`sessionStorage`), skipped entirely under `prefers-reduced-motion`.
- **The wall** (`components/PosterWall.tsx`) — a virtualised infinite grid. Each tile's position is wrapped modulo the grid size every frame, so 28 tiles tile an endless plane. Pointer drag with inertia, ambient drift, depth scaling, and a proximity lift on the tile nearest the cursor.
- **Star cursor** — trails the pointer, spins with velocity, swells over anything interactive. White fill with a navy stroke so it reads on both grounds.
- **Route transitions** — a navy panel wipes off each new page.
- Scroll reveals, count-ups, a scroll-velocity-skewed marquee, magnetic buttons, and a hero that recedes as you scroll off it.

Every motion path checks `prefers-reduced-motion` and falls back to a static,
fully legible page.

## Assets

Everything visual came out of `TOP company profile.pdf`, whose pages are
flattened bitmaps with no vector layers. Three scripts in `tools/` reconstruct
usable assets from them — rerun any of them if the deck is updated:

| Script | Output |
|---|---|
| `tools/segment_logos.py` | `public/logos/` — 54 client marks, found by projecting the page-12 grid onto its axes to locate gutters, then trimmed to their ink bbox and alpha-matted off white. |
| `tools/slice_wall.py` | `public/wall/` — 28 poster tiles sliced from the cover collage. |
| `tools/slice_service_art.py` | `public/art/` — the nine service visuals plus the team photo. |
| `tools/trace_star.py` | The star mark, traced by radial sampling into the exact 10-vertex path in `lib/star.ts`. |

`lib/assets.ts` is generated from those outputs — don't hand-edit it.

## Deploying

The build is a plain static export in `out/`.

```bash
npm run build            # root domain
npm run build:preview    # served under /top (sets NEXT_PUBLIC_BASE_PATH)
```

`basePath` only rewrites `next/link` and `next/image`, so every hand-rolled
`<img src>` goes through `asset()` in `lib/asset.ts`. Use it for any new asset.

## Still open

- Contact has no form and no phone number or email — the deck lists neither. It currently points at Instagram. Wire in whatever the real enquiry route should be.
- Wall tiles have no captions, because the deck does not say which campaign is which. Add per-tile client and campaign names to turn the wall into real case studies.
- Copy is written from the deck's own wording; it has not been through the client.
