"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import { Lame } from "./Brand";
import { LangSwitch, useLang } from "./Lang";

export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // La barre devient opaque une fois sortie de l'écran d'ouverture vert-de-gris
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "nouveaux", label: t.nav.news },
    { id: "groupe", label: t.nav.group },
    { id: "projets", label: t.nav.projects },
    { id: "methode", label: t.nav.method },
  ];

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap nav__in">
        <a href="#" className="nav__brand" aria-label="Arcadia">
          <Lame className="nav__lame" />
          <span lang="fr">ARCADIA</span>
        </a>
        <nav className="nav__links" aria-label={t.nav.projects}>
          {links.map((l) => (
            <button key={l.id} type="button" onClick={() => scrollToId(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav__end">
          <LangSwitch />
          <button type="button" className="btn btn--sm" onClick={() => scrollToId("contact")}>
            {t.nav.cta}
          </button>
        </div>
      </div>
    </header>
  );
}
