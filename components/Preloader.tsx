"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { STAR_PATH, STAR_VIEWBOX } from "@/lib/star";
import { markIntroDone } from "@/lib/intro";

/** Draws the star, then lifts the curtain off the wall. Once per session. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("top:intro");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      markIntroDone();
      return;
    }
    setSkip(false);
    sessionStorage.setItem("top:intro", "1");
  }, []);

  useEffect(() => {
    if (skip) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          markIntroDone();
          el.style.display = "none";
        },
      });

      tl.to(".pl-star path", {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
      })
        .to(".pl-star path", { fill: "#fff", duration: 0.4 }, "-=0.2")
        .from(".pl-word", { yPercent: 120, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .to(".pl-star", { rotate: 200, scale: 0.7, duration: 0.7, ease: "power3.inOut" }, "-=0.35")
        .to(el, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "+=0.15");
    }, el);

    return () => ctx.revert();
  }, [skip]);

  if (skip) return null;

  return (
    <div className="preloader" ref={root} aria-hidden>
      <div className="pl-lockup">
        <svg className="pl-star" viewBox={STAR_VIEWBOX} width="86" height="90">
          <path
            d={STAR_PATH}
            fill="transparent"
            stroke="#fff"
            strokeWidth="2"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
        </svg>
        <div className="pl-word-mask">
          <span className="display pl-word">TOP</span>
        </div>
      </div>
    </div>
  );
}
