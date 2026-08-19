import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/data";
import { asset } from "@/lib/asset";
import ParallaxImage from "@/components/ParallaxImage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Content, social, design, web, CGI, offline, influencer, performance, events and PR.",
};

export default function ServicesPage() {
  return (
    <section className="section shell page-top">
      <Reveal className="head">
        <p className="eyebrow">Services</p>
        <h1 className="display d-1">Nine ways in</h1>
        <p className="lede page-lede">
          Hire one. Hire all nine. Most brands start with the feed and end up
          handing us the hoardings too.
        </p>
      </Reveal>

      <div className="svc-pages">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} className="svc-page" y={44}>
            <article id={s.slug}>
              <div className="svc-page-art">
                <ParallaxImage src={asset(s.art)} alt={s.title} />
              </div>
              <div className="svc-page-body">
                <p className="eyebrow tnum">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="display d-2">{s.title}</h2>
                <p className="lede">{s.blurb}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
