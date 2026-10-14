"use client";

import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const NAV_OFFSET = -76;

export function scrollToId(id: string, offset = NAV_OFFSET) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset, duration: 1.2 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

// « Recevoir la brochure » pré-remplit le formulaire (résidence + type de demande)
export const EVT_PICK_PROJECT = "arcadia:pick-project";
export type PickProjectDetail = { projectId: string; request?: number };
