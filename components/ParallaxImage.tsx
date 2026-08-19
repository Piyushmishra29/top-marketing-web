"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Drifts an image against the scroll inside its own frame. */
export default function ParallaxImage({
  src,
  alt,
  amount = 12,
}: {
  src: string;
  alt: string;
  amount?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const f = frame.current;
    const i = img.current;
    if (!f || !i) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      i,
      { yPercent: -amount / 2 },
      {
        yPercent: amount / 2,
        ease: "none",
        scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: 0.5 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [amount]);

  return (
    <div className="parallax-frame" ref={frame}>
      <img src={src} alt={alt} ref={img} loading="lazy" />
    </div>
  );
}
