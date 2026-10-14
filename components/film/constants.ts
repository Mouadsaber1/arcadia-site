// Dimensions et positions des films, sans dépendance à Remotion :
// importables depuis la page sans alourdir le premier chargement.

export const SKYLINE = { width: 1920, height: 800, fps: 30, duration: 360 };
export const SKYLINE_GROUND = 760;

export const TOWERS = [
  { name: "Californie", kind: "slabs" as const, x: 470, w: 300, h: 330 },
  { name: "Abdelmoumen", kind: "fins" as const, x: 880, w: 190, h: 560 },
  { name: "Ghandi", kind: "arches" as const, x: 1190, w: 330, h: 300 },
];

// 3 scènes de 4 s, une par résidence, pilotées par le scroll
export const PROJECTS_FILM = { width: 1200, height: 1000, fps: 30, duration: 360, segment: 120 };
