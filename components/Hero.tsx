"use client";

import { scrollToId } from "@/lib/scroll";
import { HeroPortal } from "./Brand";
import { useLang } from "./Lang";

// L'ouverture suit la règle de la marque : un signe, une couleur, du silence.
// D'après le deck : le portail sur patine profonde. La signature apparaît d'abord,
// le double cadre se trace, la lame se révèle à l'intérieur, puis le nom.
export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__center">
        <p className="hero__line">{t.hero.line}</p>
        <HeroPortal className="hero__portal" />
        <h1 id="hero-title" className="hero__name" lang="fr" aria-label="Arcadia">ARCADIA</h1>
        <div className="hero__ctas">
          <button type="button" className="btn btn--light" onClick={() => scrollToId("projets")}>
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
