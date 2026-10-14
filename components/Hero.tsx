"use client";

import { scrollToId } from "@/lib/scroll";
import { Lame } from "./Brand";
import { useLang } from "./Lang";

// L'ouverture suit la règle de la marque : un signe, une couleur, du silence.
// La lame se trace (le trait fin, puis la lame pleine), le nom apparaît ensuite.
export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__center">
        <Lame className="hero__lame" stroke={1.6} />
        <h1 id="hero-title" className="hero__name" lang="fr" aria-label="Arcadia">ARCADIA</h1>
        <p className="hero__ar" lang="ar" dir="rtl">أركاديا</p>
        <p className="hero__line">{t.hero.line}</p>
        <div className="hero__ctas">
          <button type="button" className="btn btn--ink" onClick={() => scrollToId("projets")}>
            {t.hero.cta1}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => scrollToId("contact")}>
            {t.hero.cta2}
          </button>
        </div>
      </div>
    </section>
  );
}
