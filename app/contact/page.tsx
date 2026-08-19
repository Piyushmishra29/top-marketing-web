import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Star from "@/components/Star";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with TOP Marketing Solutions, Hyderabad.",
};

export default function ContactPage() {
  return (
    <section className="section shell page-top contact">
      <Reveal className="head">
        <p className="eyebrow">Contact</p>
        <h1 className="display d-1">
          Let us help you
          <br />
          reach the <Star className="contact-star" /> TOP
        </h1>
        <p className="lede page-lede">
          Tell us what you are launching, who it is for, and when it has to be
          live. We will come back with a plan and a number.
        </p>
      </Reveal>

      <Reveal className="contact-grid">
        <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="contact-card">
          <p className="eyebrow">Instagram</p>
          <p className="display d-2">{CONTACT.handle}</p>
        </a>
        <div className="contact-card">
          <p className="eyebrow">Studio</p>
          <p className="display d-2">{CONTACT.city}</p>
        </div>
        <div className="contact-card">
          <p className="eyebrow">Founder</p>
          <p className="display d-2">{CONTACT.founder}</p>
        </div>
      </Reveal>
    </section>
  );
}
