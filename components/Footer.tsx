"use client";

import { SITE } from "@/lib/data";
import { Seal } from "./Brand";
import { useLang } from "./Lang";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <Seal className="footer__seal" title="Sceau Arcadia" />
        <p className="footer__name" lang="fr" aria-hidden="true">ARCADIA</p>
        <p className="footer__ar" lang="ar" dir="rtl" aria-hidden="true">أركاديا</p>
      </div>
      <div className="wrap footer__in">
        <span>{t.footer.line}</span>
        <span>{SITE.address}</span>
        <span><bdi>{SITE.phone}</bdi></span>
      </div>
    </footer>
  );
}
