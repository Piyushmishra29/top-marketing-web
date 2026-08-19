"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { asset } from "@/lib/asset";

/** The nine services as a list; the artwork follows your pointer. */
export default function ServiceList() {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 150}px, 0)`;
  };

  return (
    <div className="svc" onPointerMove={move}>
      {SERVICES.map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/#${s.slug}`}
          className="svc-row"
          onPointerEnter={() => setActive(i)}
          onPointerLeave={() => setActive(null)}
          data-dim={active !== null && active !== i ? "1" : "0"}
        >
          <span className="svc-index tnum">{String(i + 1).padStart(2, "0")}</span>
          <span className="display svc-title">{s.title}</span>
          <span className="svc-arrow" aria-hidden>
            &rarr;
          </span>
        </Link>
      ))}

      <div className="svc-preview" ref={previewRef} aria-hidden>
        {SERVICES.map((s, i) => (
          <img
            key={s.slug}
            src={asset(s.art)}
            alt=""
            data-on={active === i ? "1" : "0"}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
