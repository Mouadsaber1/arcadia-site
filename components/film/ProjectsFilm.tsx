import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Building, INK, PAPER, type Kind } from "./Building";
import { PROJECTS_FILM } from "./constants";

// Film des projets, piloté par le scroll : chaque résidence se construit
// pendant que le visiteur lit sa présentation. 3 × 4 s.

const SCENES: { kind: Kind; w: number; h: number }[] = [
  { kind: "slabs", w: 620, h: 600 },
  { kind: "fins", w: 360, h: 820 },
  { kind: "arches", w: 680, h: 560 },
];

const GROUND = 930;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const ProjectsFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seg = PROJECTS_FILM.segment;

  return (
    <AbsoluteFill style={{ backgroundColor: PAPER }}>
      <svg viewBox={`0 0 ${PROJECTS_FILM.width} ${PROJECTS_FILM.height}`} width="100%" height="100%">
        <path d={`M0 ${GROUND}H1200`} stroke={INK} strokeWidth={1.5} />
        {SCENES.map((s, i) => {
          const local = frame - i * seg;
          const last = i === SCENES.length - 1;
          const opacity = interpolate(
            local,
            last ? [-10, 0] : [-10, 0, seg - 14, seg - 2],
            last ? [0, 1] : [0, 1, 1, 0],
            { ...clamp, easing: ease },
          );
          if (opacity <= 0) return null;
          // léger travelling latéral pendant la scène
          const dx = interpolate(local, [0, seg], [14, -14], clamp);
          return (
            <g key={i} opacity={opacity} transform={`translate(${dx} 0)`}>
              <Building id={`pf-${i}`} kind={s.kind} t={local / fps} x={(1200 - s.w) / 2} ground={GROUND} w={s.w} h={s.h} stroke={3} speed={1.25} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
