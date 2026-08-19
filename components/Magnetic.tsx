"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Pulls its child a little towards the pointer. */
export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | undefined;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const enter = () => gsap.to(el, { scale: 1.04, duration: 0.4, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.32,
        y: (e.clientY - (r.top + r.height / 2)) * 0.42,
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const leave = () =>
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <span ref={ref} className="magnetic">{children}</span>;
}
