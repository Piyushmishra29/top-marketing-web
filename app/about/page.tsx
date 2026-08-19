import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import LogoWall from "@/components/LogoWall";
import Marquee from "@/components/Marquee";
import { STATS, CONTACT } from "@/lib/data";
import { asset } from "@/lib/asset";
import { LOGOS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About",
  description:
    "A Hyderabad marketing team combining creativity, strategy and data-driven insight.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section shell page-top">
        <Reveal className="head">
          <p className="eyebrow">About</p>
          <h1 className="display d-1">
            The people
            <br />
            behind the wall
          </h1>
          <p className="lede page-lede">
            We combine creativity, strategy and data-driven insights to help
            brands grow, connect and lead in their industry. The goal is simple:
            marketing that moves a number, not just a mood board.
          </p>
        </Reveal>

        <Reveal className="team">
          <img src={asset("/art/team.jpg")} alt="The TOP Marketing Solutions team" />
        </Reveal>
      </section>

      <section className="on-navy section" data-dark>
        <Marquee text="SMM &nbsp;&#9733;&nbsp; CONTENT &nbsp;&#9733;&nbsp; DESIGN &nbsp;&#9733;&nbsp; EVENTS &nbsp;&#9733;&nbsp; TALENTS &nbsp;&#9733;&nbsp;" className="marquee-outline" />
        <div className="shell" style={{ marginTop: "clamp(3rem,7vw,5rem)" }}>
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
        </div>
      </section>

      <section className="section shell">
        <Reveal className="head">
          <p className="eyebrow">Clientele</p>
          <h2 className="display d-1">{LOGOS.length} brands</h2>
          <p className="lede page-lede">
            Five years of retaining India&rsquo;s finest brands, from{" "}
            {CONTACT.city}.
          </p>
        </Reveal>
        <LogoWall />
      </section>
    </>
  );
}
