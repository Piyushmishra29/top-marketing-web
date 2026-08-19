"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Star from "./Star";
import Magnetic from "./Magnetic";

const LINKS = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav-mark" aria-label="TOP Marketing Solutions, home">
          <Star className="nav-star" />
          <span className="display">TOP</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={path.startsWith(l.href) ? "1" : "0"}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Magnetic>
          <Link href="/contact/" className="nav-cta">
            Let&rsquo;s talk
          </Link>
        </Magnetic>

        <button
          className="nav-burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span data-open={open ? "1" : "0"} />
        </button>
      </header>

      {open && (
        <div className="nav-sheet">
          {[...LINKS, { href: "/contact/", label: "Contact" }].map((l) => (
            <Link key={l.href} href={l.href} className="display d-2">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
