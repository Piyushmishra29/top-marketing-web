"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

/** A navy panel that wipes off the new page on every route change. */
export default function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const path = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { display: "block", scaleY: 1, transformOrigin: "bottom" });
    gsap.to(el, {
      scaleY: 0,
      duration: 0.85,
      ease: "power4.inOut",
      onComplete: () => gsap.set(el, { display: "none" }),
    });
    gsap.from("main", { opacity: 0, y: 18, duration: 0.7, delay: 0.15, ease: "power2.out" });
  }, [path]);

  return <div className="page-wipe" ref={ref} aria-hidden />;
}
