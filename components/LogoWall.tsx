"use client";

import { LOGOS } from "@/lib/assets";
import { asset } from "@/lib/asset";

export default function LogoWall() {
  return (
    <ul className="logos">
      {LOGOS.map((l) => (
        <li key={l.name}>
          <img src={asset(l.file)} alt={l.name.replace(/-/g, " ")} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}
