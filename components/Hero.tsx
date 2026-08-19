"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PosterWall from "./PosterWall";
import Star from "./Star";
import { whenIntroDone } from "@/lib/intro";

const LINES = ["We will be", "the last agency", "you hire."];

export default function Hero({ onSelect }: { onSelect: (src: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    const fades = [eyebrowRef.current, noteRef.current, cueRef.current].filter(
      Boolean,
    ) as HTMLElement[];

    gsap.set(lines, { yPercent: 118 });
    gsap.set(fades, { opacity: 0 });

    const unsubscribe = whenIntroDone(() => {
      gsap
        .timeline()
        .to(eyebrowRef.current, { opacity: 1, duration: 0.6 })
        .to(lines, { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.09 }, "-=0.35")
        .to([noteRef.current, cueRef.current], { opacity: 1, duration: 0.7 }, "-=0.4");
    });

    // the wall recedes as the page scrolls off it
    const scrub = { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 };
    const t1 = gsap.to(wallRef.current, { scale: 0.92, ease: "none", scrollTrigger: scrub });
    const t2 = gsap.to(copyRef.current, {
      yPercent: -40,
      opacity: 0,
      ease: "none",
      scrollTrigger: scrub,
    });

    return () => {
      unsubscribe();
      t1.scrollTrigger?.kill();
      t2.scrollTrigger?.kill();
      t1.kill();
      t2.kill();
      gsap.set([...lines, ...fades], { clearProps: "all" });
    };
  }, []);

  return (
    <section className="hero" data-dark ref={sectionRef}>
      <div className="hero-wall" ref={wallRef}>
        <PosterWall onSelect={onSelect} />
      </div>

      <div className="hero-copy" ref={copyRef}>
        <p className="eyebrow hero-eyebrow" ref={eyebrowRef}>
          Hyderabad &middot; Marketing &amp; Communications
        </p>
        <h1 className="display d-hero hero-title">
          {LINES.map((l, i) => (
            <span className="reveal-line" key={l}>
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
              >
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-note" ref={noteRef}>
          Five years of work, still going. Drag it around.
        </p>
      </div>

      <div className="hero-scroll" ref={cueRef} aria-hidden>
        <Star className="hero-scroll-star" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
