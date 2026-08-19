"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Watches which section sits under the fixed nav and flips a single
 * `data-overlay` flag on <html>, so the nav can stay legible over both
 * the navy wall and the white pages.
 */
export default function OverlayTheme() {
  const path = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const darks = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));

    const update = () => {
      const band = 34; // roughly the vertical middle of the nav
      const hit = darks.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= band && r.bottom >= band;
      });
      root.dataset.overlay = hit ? "dark" : "light";
      root.dataset.scrolled = window.scrollY > 24 ? "1" : "0";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [path]);

  return null;
}
