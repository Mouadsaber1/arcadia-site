"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { PROJECTS, SITE } from "@/lib/data";
import { TOWERS, SKYLINE } from "./film/constants";
import { useLang } from "./Lang";

// Le film se charge après le texte
const SkylinePlayer = dynamic(() => import("./film/SkylinePlayer"), { ssr: false });
const IDS = ["californie", "abdelmoumen", "ghandi"] as const;

export default function Group() {
  const { t } = useLang();
  const [still, setStill] = useState<boolean | null>(null);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  return (
    <section className="section group-section" id="groupe" aria-labelledby="groupe-title">
      <div className="wrap group">
        <div className="group__title">
          <p className="label">{t.nav.group}</p>
          <h2 id="groupe-title" className="title">{t.group.title}</h2>
        </div>
        <div className="group__body">
          <p className="lead">{t.group.text}</p>
          <dl className="facts">
            <div><dt>{t.group.residences}</dt><dd>{PROJECTS.length}</dd></div>
            <div><dt>{t.group.since}</dt><dd>{SITE.since}</dd></div>
            <div><dt>{t.group.architect}</dt><dd>{SITE.architect}</dd></div>
          </dl>
        </div>
      </div>

      <div className="skyline" role="img" aria-label={t.hero.skyline} dir="ltr">
        <div className="skyline__frame">
          {still !== null && <SkylinePlayer still={still} />}
          {TOWERS.map((tw, i) => (
            <span
              key={tw.name}
              className="skyline__label"
              aria-hidden="true"
              style={{ "--x": `${((tw.x + tw.w / 2) / SKYLINE.width) * 100}%` } as React.CSSProperties}
            >
              {t.projects.items[IDS[i]].district}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
