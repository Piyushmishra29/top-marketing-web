"use client";

import { useEffect, useRef } from "react";

/** A single line of type that never stops, and leans with the scroll. */
export default function Marquee({
  text,
  speed = 0.9,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let x = 0;
    let frame = 0;
    let lastScroll = window.scrollY;
    let boost = 0;
    const half = () => track.scrollWidth / 2;

    const tick = () => {
      const s = window.scrollY;
      boost += ((s - lastScroll) * 0.35 - boost) * 0.1;
      lastScroll = s;
      x -= speed + boost;
      const h = half();
      if (h > 0) {
        if (x <= -h) x += h;
        if (x > 0) x -= h;
      }
      track.style.transform = `translate3d(${x}px,0,0) skewX(${Math.max(-8, Math.min(8, -boost * 0.25))}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  return (
    <div className={`marquee ${className}`} aria-hidden>
      <div className="marquee-track" ref={trackRef}>
        {[0, 1].map((k) => (
          <span key={k} className="display marquee-item">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
