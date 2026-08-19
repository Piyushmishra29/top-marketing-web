import Link from "next/link";
import Star from "./Star";
import { CONTACT } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="on-navy foot" data-dark>
      <div className="shell">
        <Link href="/contact/" className="foot-cta">
          <span className="display d-1">Let us help you</span>
          <span className="display d-1 foot-cta-2">
            reach the <Star className="foot-star" /> TOP
          </span>
        </Link>

        <hr className="rule" />

        <div className="foot-grid">
          <div>
            <p className="eyebrow">Studio</p>
            <p>{CONTACT.city}</p>
          </div>
          <div>
            <p className="eyebrow">Social</p>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer">
              Instagram {CONTACT.handle}
            </a>
          </div>
          <div>
            <p className="eyebrow">Founder</p>
            <p>{CONTACT.founder}</p>
          </div>
          <div>
            <p className="eyebrow">Site</p>
            <p>{CONTACT.site}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
