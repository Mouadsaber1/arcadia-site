"use client";

import { useLang } from "./Lang";

const ROMAN = ["I", "II", "III", "IV"];

// Une vraie séquence : les chiffres romains de la marque portent l'ordre des étapes.
export default function Method() {
  const { t } = useLang();
  return (
    <section className="section" id="methode" aria-labelledby="methode-title">
      <div className="wrap">
        <p className="label">{t.nav.method}</p>
        <h2 id="methode-title" className="title method__title">{t.method.title}</h2>
        <ol className="steps">
          {t.method.steps.map((s, i) => (
            <li key={i} className="step">
              <span className="step__n" aria-hidden="true">{ROMAN[i]}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
