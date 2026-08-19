"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import { WALL_TILES } from "@/lib/assets";
import { asset } from "@/lib/asset";

export default function WorkPage() {
  const [shot, setShot] = useState<string | null>(null);

  return (
    <>
      <section className="section shell page-top">
        <Reveal className="head">
          <p className="eyebrow">Work</p>
          <h1 className="display d-1">
            Five years,
            <br />
            one wall
          </h1>
          <p className="lede page-lede">
            Campaigns, launches, offers and openings, pulled from the shoots and
            feeds we have run since 2019. Click any piece to see it bigger.
          </p>
        </Reveal>

        <Reveal className="grid-wall" stagger={0.03} y={26}>
          {WALL_TILES.map((src) => (
            <button key={src} className="grid-tile" onClick={() => setShot(asset(src))}>
              <img src={asset(src)} alt="Campaign artwork" loading="lazy" />
            </button>
          ))}
        </Reveal>
      </section>

      <Lightbox src={shot} onClose={() => setShot(null)} />
    </>
  );
}
