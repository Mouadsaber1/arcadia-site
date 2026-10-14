import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Building, INK, PAPER } from "./Building";
import { SKYLINE, SKYLINE_GROUND as GROUND, TOWERS } from "./constants";

// Film d'ouverture : la ligne d'horizon de Casablanca se dessine,
// puis les trois résidences Arcadia s'en détachent. 12 s, en boucle.
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Immeubles de la ville, au trait fin (déterministe)
const CITY: { x: number; w: number; h: number }[] = (() => {
  const out: { x: number; w: number; h: number }[] = [];
  let s = 7;
  const r = () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
  let x = -40;
  while (x < 1980) {
    const w = 60 + r() * 120;
    const h = 90 + r() * 230;
    out.push({ x, w, h });
    x += w + 6 + r() * 18;
  }
  return out;
})();

export const Skyline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;

  const outro = interpolate(frame, [durationInFrames - 0.8 * fps, durationInFrames - 1], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: PAPER }}>
      <Interactive.Div
        name="Ville"
        style={{
          position: "absolute",
          inset: 0,
          opacity: outro,
          scale: interpolate(frame, [0, durationInFrames], [1, 1.04], { ...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1) }),
          transformOrigin: "50% 95%",
        }}
      >
        <svg viewBox={`0 0 ${SKYLINE.width} ${SKYLINE.height}`} width="100%" height="100%">
          {/* Sol */}
          <path
            d={`M-20 ${GROUND}H1940`}
            stroke={INK}
            strokeWidth={1.5}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={interpolate(sec, [0, 1.4], [1, 0], { ...clamp, easing: ease })}
          />

          {/* La ville, au trait clair, de gauche à droite */}
          {CITY.map((b, i) => {
            const t0 = 0.3 + (b.x / 1920) * 1.6;
            return (
              <path
                key={i}
                d={`M${b.x} ${GROUND}V${GROUND - b.h}H${b.x + b.w}V${GROUND}`}
                stroke={INK}
                strokeWidth={1}
                fill={PAPER}
                opacity={0.28}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={interpolate(sec, [t0, t0 + 1.1], [1, 0], { ...clamp, easing: ease })}
              />
            );
          })}

          {/* Minaret au loin, repère de Casablanca */}
          <g opacity={interpolate(sec, [1.6, 2.6], [0, 0.4], { ...clamp, easing: ease })} stroke={INK} strokeWidth={1} fill={PAPER}>
            <path d={`M1700 ${GROUND}V${GROUND - 470}H1752V${GROUND}`} />
            <path d={`M1708 ${GROUND - 470}V${GROUND - 520}H1744V${GROUND - 470}`} />
            <path d={`M1726 ${GROUND - 520}V${GROUND - 556}`} />
            {[0, 1, 2, 3].map((k) => (
              <path key={k} d={`M1700 ${GROUND - 140 - k * 90}H1752`} opacity={0.6} />
            ))}
          </g>

          {/* Les trois résidences Arcadia, au premier plan */}
          {TOWERS.map((tw, i) => (
            <g key={tw.name}>
              {/* masque le trait de la ville derrière le bâtiment */}
              <rect
                x={tw.x - 30}
                y={GROUND - tw.h - 60}
                width={tw.w + 60}
                height={tw.h + 60}
                fill={PAPER}
                opacity={interpolate(sec, [2 + i * 0.5, 2.6 + i * 0.5], [0, 1], clamp)}
              />
              <Building id={`sky-${i}`} kind={tw.kind} t={sec - (2 + i * 0.55)} x={tw.x} ground={GROUND} w={tw.w} h={tw.h} stroke={2} speed={1.1} />
            </g>
          ))}
        </svg>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
