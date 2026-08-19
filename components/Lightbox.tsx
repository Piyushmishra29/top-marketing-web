"use client";

import { useEffect } from "react";

export default function Lightbox({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>
        Close
      </button>
      <img src={src} alt="Campaign artwork" />
    </div>
  );
}
