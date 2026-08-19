"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Lightbox from "@/components/Lightbox";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import ServiceList from "@/components/ServiceList";
import LogoWall from "@/components/LogoWall";
import Magnetic from "@/components/Magnetic";
import { STATS } from "@/lib/data";
import { LOGOS } from "@/lib/assets";

export default function Home() {
  const [shot, setShot] = useState<string | null>(null);

  return (
    <>
      <Hero onSelect={setShot} />


      <Lightbox src={shot} onClose={() => setShot(null)} />

      {/* ---- manifesto ----------------------------------------- */}
      <section className="on-navy manifesto" data-dark>
        <Marquee text="LET US HELP YOU REACH THE TOP &nbsp;&#9733;&nbsp;" />
        <div className="shell manifesto-body">
          <Reveal className="manifesto-grid">
            <p className="eyebrow">What we do</p>
            <p className="lede">
              We combine creativity, strategy and data to help brands grow,
              connect and lead. Nine disciplines under one roof, so the campaign
              that runs on a phone is the same campaign that runs on a hoarding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- proof --------------------------------------------- */}
      <section className="section shell">
        <Reveal className="stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <p className="display stat-value">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <hr className="rule" />

      {/* ---- services ------------------------------------------ */}
      <section className="section shell">
        <Reveal className="head">
          <p className="eyebrow">Services</p>
          <h2 className="display d-1">Nine ways in</h2>
        </Reveal>
        <ServiceList />
      </section>

      {/* ---- clients ------------------------------------------- */}
      <section className="section shell">
        <Reveal className="head">
          <p className="eyebrow">Clientele</p>
          <h2 className="display d-1">
            {LOGOS.length} brands
            <br />
            on the wall
          </h2>
        </Reveal>
        <LogoWall />
        <Reveal className="head-end">
          <Magnetic>
            <Link href="/work/" className="btn">
              See the work
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </>
  );
}
