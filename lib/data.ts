// ─────────────────────────────────────────────────────────────
// Faits du groupe. Tout ce qui est entre [CROCHETS] est à remplacer
// par les vraies informations d'Arcadia (les textes sont dans lib/i18n.ts).
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Arcadia",
  phone: "[TÉLÉPHONE]",
  address: "[ADRESSE DU BUREAU DE VENTE]",
  email: "[EMAIL]",
  // Numéro WhatsApp au format international sans + ni espaces, ex. 2126XXXXXXXX
  whatsapp: "",
  since: "[ANNÉE]",
  architect: "[ARCHITECTE]",
};

export type ProjectId = "californie" | "abdelmoumen" | "ghandi";

// L'ordre suit le film des projets (components/film/ProjectsFilm.tsx)
export const PROJECTS: { id: ProjectId; apartments: string; delivery: string; progress: string }[] = [
  { id: "californie", apartments: "[NOMBRE]", delivery: "[DATE]", progress: "[AVANCEMENT]" },
  { id: "abdelmoumen", apartments: "[NOMBRE]", delivery: "[DATE]", progress: "[AVANCEMENT]" },
  { id: "ghandi", apartments: "[NOMBRE]", delivery: "[DATE]", progress: "[AVANCEMENT]" },
];
