"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WALL_TILES } from "@/lib/assets";
import { asset } from "@/lib/asset";

type Props = {
  /** Ambient drift speed in px/frame when nobody is touching it. */
  drift?: number;
  onSelect?: (src: string) => void;
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const wrap = (v: number, len: number) => ((v % len) + len) % len;

export default function PosterWall({ drift = 0.16, onSelect }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- grid geometry, sized to the viewport -------------------
    let cellW = 0;
    let cellH = 0;
    let cols = 0;
    let rows = 0;
    let gridW = 0;
    let gridH = 0;
    let vw = 0;
    let vh = 0;

    const layout = () => {
      const r = root.getBoundingClientRect();
      vw = r.width;
      vh = r.height;
      const narrow = vw < 720;
      const tileW = narrow ? 158 : 300;
      const tileH = narrow ? 182 : 340;
      const gap = narrow ? 8 : 12;
      cellW = tileW + gap;
      cellH = tileH + gap;
      // enough columns that the pattern never visibly repeats on screen
      cols = Math.max(5, Math.ceil(vw / cellW) + 2);
      rows = Math.ceil(WALL_TILES.length / cols);
      if (rows < 3) {
        rows = 3;
        cols = Math.ceil(WALL_TILES.length / rows);
      }
      gridW = cols * cellW;
      gridH = rows * cellH;
      tileRefs.current.forEach((el) => {
        if (!el) return;
        el.style.width = `${tileW}px`;
        el.style.height = `${tileH}px`;
      });
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(root);

    // --- interaction state --------------------------------------
    let offX = 0;
    let offY = 0;
    let velX = 0;
    let velY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let frame = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velX = 0;
      velY = 0;
      root.setPointerCapture(e.pointerId);
      root.dataset.dragging = "1";
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      offX += dx;
      offY += dy;
      velX = dx;
      velY = dy;
    };

    const onUp = (e: PointerEvent) => {
      dragging = false;
      root.dataset.dragging = "0";
      try {
        root.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
    };

    const onWheel = (e: WheelEvent) => {
      // horizontal trackpad gestures pan the wall; vertical is left to the page
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        offX -= e.deltaX;
        velX = -e.deltaX * 0.4;
      }
    };

    const onLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    root.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerleave", onLeave);

    // --- render loop ---------------------------------------------
    const tick = () => {
      if (!dragging) {
        offX += velX;
        offY += velY;
        velX *= 0.93;
        velY *= 0.93;
        if (Math.abs(velX) < 0.02) velX = 0;
        if (Math.abs(velY) < 0.02) velY = 0;
        if (!reduced) offX -= drift;
      }

      const halfW = gridW / 2;
      const halfH = gridH / 2;
      const skew = clamp(velX * 0.05, -7, 7);

      for (let i = 0; i < WALL_TILES.length; i++) {
        const el = tileRefs.current[i];
        if (!el) continue;
        const col = i % cols;
        const row = Math.floor(i / cols);
        // stagger every other row so it reads as a pasted-up wall, not a table
        const baseX = col * cellW + (row % 2 ? cellW * 0.5 : 0);
        const baseY = row * cellH;

        const x = wrap(baseX + offX + halfW, gridW) - halfW;
        const y = wrap(baseY + offY + halfH, gridH) - halfH;

        if (Math.abs(x) > vw / 2 + cellW || Math.abs(y) > vh / 2 + cellH) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";

        // depth: tiles further from the middle sit back a little
        const d = Math.hypot(x / (vw / 2 || 1), y / (vh / 2 || 1));
        const depth = 1 - clamp(d, 0, 1.4) * 0.035;

        // proximity: the tile nearest the pointer leans forward
        const near = clamp(
          1 - Math.hypot(pointerX - (vw / 2 + x), pointerY - (vh / 2 + y)) / 300,
          0,
          1,
        );

        const scale = depth + near * 0.07;
        el.style.transform =
          `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) ` +
          `rotate(${skew * 0.14}deg) scale(${scale})`;
        el.style.zIndex = String(10 + Math.round(near * 20));
        el.style.setProperty("--near", near.toFixed(3));
      }
      frame = requestAnimationFrame(tick);
    };

    setReady(true);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      root.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [drift]);

  const handleSelect = useCallback(
    (src: string) => () => onSelect?.(src),
    [onSelect],
  );

  return (
    <div
      ref={rootRef}
      className="wall"
      data-cursor="grab"
      data-ready={ready ? "1" : "0"}
      role="region"
      aria-label="Campaign work. Drag to move around the wall."
    >
      {WALL_TILES.map((src, i) => (
        <button
          key={src}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className="wall-tile"
          onClick={handleSelect(asset(src))}
          tabIndex={-1}
          aria-hidden
        >
          <img src={asset(src)} alt="" draggable={false} loading={i < 12 ? "eager" : "lazy"} />
        </button>
      ))}
    </div>
  );
}
