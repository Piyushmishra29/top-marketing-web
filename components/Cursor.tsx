"use client";

import { useEffect, useRef } from "react";
import { STAR_PATH, STAR_VIEWBOX } from "@/lib/star";

/** A star reticle that trails the pointer and swells over interactive things. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let scale = 1;
    let ts = 1;
    let spin = 0;
    let frame = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hot = (e.target as Element)?.closest?.(
        "a, button, [data-cursor='grab'], input, textarea",
      );
      ts = hot ? 2.1 : 1;
      el.dataset.grab =
        (e.target as Element)?.closest?.("[data-cursor='grab']") ? "1" : "0";
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      scale += (ts - scale) * 0.14;
      spin += 0.25 + Math.abs(tx - x) * 0.06;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${spin}deg) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };

    el.style.opacity = "1";
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 22,
        height: 22,
        zIndex: 70,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity .4s",
      }}
    >
      <svg viewBox={STAR_VIEWBOX} width="22" height="22" overflow="visible">
        <path
          d={STAR_PATH}
          fill="#fff"
          stroke="#0c1539"
          strokeWidth="4"
          strokeLinejoin="round"
          paintOrder="stroke"
        />
      </svg>
    </div>
  );
}
