import React from "react";
import { Easing, interpolate } from "remotion";

// Trois architectures dessinées au trait, une par résidence Arcadia.
// `t` = temps local en secondes depuis le début du dessin du bâtiment.

// Couleurs de la marque : encre, chaux, patine profonde, vert-de-gris
export const INK = "#1F2A27";
export const PAPER = "#F1ECE2";
export const GLASS = "#2E4A44";
export const LEAF = "#6F948B";

export type Kind = "slabs" | "fins" | "arches";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 1 → 0 : valeur de strokeDashoffset pour dessiner une ligne entre t0 et t1 */
const draw = (t: number, t0: number, t1: number) => interpolate(t, [t0, t1], [1, 0], { ...clamp, easing: ease });
const fade = (t: number, t0: number, t1: number, to = 1) => interpolate(t, [t0, t1], [0, to], { ...clamp, easing: ease });

type Props = {
  kind: Kind;
  t: number;
  x: number; // bord gauche
  ground: number; // y du sol
  w: number;
  h: number;
  stroke?: number; // épaisseur de base
  speed?: number; // 1 = normal, 2 = deux fois plus rapide
  id: string;
};

const L = ({ d, w, off, o = 1 }: { d: string; w: number; off: number; o?: number }) => (
  <path d={d} stroke={INK} strokeWidth={w} fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset={off} opacity={o} />
);

export const Building: React.FC<Props> = ({ kind, t: raw, x, ground, w, h, stroke = 2, speed = 1, id }) => {
  const t = raw * speed;
  const top = ground - h;
  const els: React.ReactNode[] = [];
  const clipId = `clip-${id}`;

  if (kind === "slabs") {
    // Californie : dalles horizontales en débord, balcons plantés, pergola en toiture
    const levels = 7;
    const lh = h / (levels + 0.4);
    const bays = 5;
    const bw = w / bays;
    const bodyTop = ground - levels * lh;
    for (let f = 0; f < levels; f++) {
      const y = ground - (f + 1) * lh;
      const o = f % 2 === 0 ? w * 0.05 : w * 0.025;
      const s = 0.2 + f * 0.16;
      for (let b = 0; b < bays; b++) {
        const g0 = 1.5 + (f * bays + b) * 0.025;
        els.push(<rect key={`g${f}${b}`} x={x + b * bw + bw * 0.08} y={y + lh * 0.16} width={bw * 0.84} height={lh * 0.62} fill={GLASS} opacity={fade(t, g0, g0 + 0.6, 0.16 + ((f + b) % 3) * 0.06)} clipPath={`url(#${clipId})`} />);
        if ((f * 2 + b) % 4 === 0) {
          const p0 = 2 + f * 0.08 + b * 0.05;
          const cx = x + b * bw + bw * 0.18;
          const cy = y + lh * 0.72;
          els.push(
            <g key={`p${f}${b}`} fill={LEAF} opacity={fade(t, p0, p0 + 0.5, 0.85)}>
              <circle cx={cx} cy={cy - lh * 0.06} r={lh * 0.08} />
              <circle cx={cx + lh * 0.1} cy={cy - lh * 0.1} r={lh * 0.1} />
              <circle cx={cx + lh * 0.21} cy={cy - lh * 0.05} r={lh * 0.065} />
            </g>
          );
        }
      }
      els.push(<L key={`s${f}`} d={`M${x - o} ${y}H${x + w + o}`} w={f === levels - 1 ? stroke * 1.5 : stroke} off={draw(t, s, s + 0.9)} />);
      els.push(<L key={`r${f}`} d={`M${x - o} ${y + lh * 0.72}H${x + w + o}`} w={stroke * 0.4} off={draw(t, s + 0.1, s + 1)} o={0.5} />);
    }
    for (let i = 0; i <= bays; i++) {
      els.push(<L key={`v${i}`} d={`M${x + i * bw} ${ground}V${bodyTop}`} w={i === 0 || i === bays ? stroke : stroke * 0.5} off={draw(t, 0.6 + i * 0.12, 1.8 + i * 0.12)} />);
    }
    const pg = lh * 0.42;
    for (let i = 0; i < 12; i++) {
      const px = x + w * 0.18 + i * (w * 0.64) / 11;
      els.push(<L key={`pg${i}`} d={`M${px} ${bodyTop}V${bodyTop - pg}`} w={stroke * 0.5} off={draw(t, 1.6 + i * 0.04, 2.1 + i * 0.04)} o={0.7} />);
    }
    els.push(<L key="pgt" d={`M${x + w * 0.16} ${bodyTop - pg}H${x + w * 0.84}`} w={stroke * 0.7} off={draw(t, 2, 2.6)} />);
  }

  if (kind === "fins") {
    // Abdelmoumen : tour élancée à ailettes verticales, couronnement en retrait
    const levels = 14;
    const lh = h / (levels + 1);
    const bodyTop = ground - levels * lh;
    const fins = 13;
    for (let f = 0; f < levels; f++) {
      const y = ground - (f + 1) * lh;
      els.push(<rect key={`g${f}`} x={x} y={y + lh * 0.12} width={w} height={lh * 0.76} fill={GLASS} opacity={fade(t, 1.6 + f * 0.05, 2.3 + f * 0.05, 0.12 + (f % 3) * 0.05)} />);
      els.push(<L key={`h${f}`} d={`M${x} ${y}H${x + w}`} w={stroke * 0.5} off={draw(t, 0.9 + f * 0.05, 1.6 + f * 0.05)} o={0.6} />);
    }
    for (let i = 0; i < fins; i++) {
      const fx = x + (i * w) / (fins - 1);
      const strong = i % 4 === 0;
      els.push(<L key={`f${i}`} d={`M${fx} ${ground}V${bodyTop}`} w={strong ? stroke * 1.1 : stroke * 0.45} off={draw(t, 0.2 + i * 0.06, 1.4 + i * 0.06)} />);
    }
    const cw = w * 0.62;
    const cx = x + (w - cw) / 2;
    els.push(<L key="crown" d={`M${cx} ${bodyTop}V${bodyTop - lh}H${cx + cw}V${bodyTop}`} w={stroke} off={draw(t, 1.4, 2.2)} />);
    els.push(<L key="roof" d={`M${x - w * 0.04} ${bodyTop}H${x + w * 1.04}`} w={stroke * 1.4} off={draw(t, 1.2, 2)} />);
  }

  if (kind === "arches") {
    // Ghandi : terrasses en gradins, baies en arc
    const levels = 6;
    const lh = h / levels;
    for (let f = 0; f < levels; f++) {
      const inset = f >= 4 ? w * 0.08 * (f - 3) : 0;
      const lx = x + inset;
      const lw = w - inset * 2;
      const y = ground - (f + 1) * lh;
      const n = Math.max(3, Math.round(lw / (lh * 0.95)));
      const aw = (lw / n) * 0.62;
      const s = 0.2 + f * 0.18;
      for (let i = 0; i < n; i++) {
        const ax = lx + (i + 0.5) * (lw / n) - aw / 2;
        const ay = y + lh * 0.2;
        const ah = lh * 0.72;
        const r = aw / 2;
        const d = `M${ax} ${ay + ah}V${ay + r}A${r} ${r} 0 0 1 ${ax + aw} ${ay + r}V${ay + ah}`;
        els.push(<path key={`ag${f}${i}`} d={`${d}Z`} fill={GLASS} opacity={fade(t, 1.5 + f * 0.1 + i * 0.03, 2.1 + f * 0.1 + i * 0.03, 0.14 + ((f + i) % 3) * 0.06)} />);
        els.push(<L key={`a${f}${i}`} d={d} w={stroke * 0.6} off={draw(t, s + 0.3 + i * 0.03, s + 1.1 + i * 0.03)} />);
      }
      els.push(<L key={`sl${f}`} d={`M${lx - w * 0.02} ${y}H${lx + lw + w * 0.02}`} w={stroke} off={draw(t, s, s + 0.8)} />);
      els.push(<L key={`sd${f}`} d={`M${lx} ${y + lh}V${y}M${lx + lw} ${y + lh}V${y}`} w={stroke} off={draw(t, s, s + 0.6)} />);
    }
  }

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={top - h} width={w} height={h * 2} />
        </clipPath>
      </defs>
      {els}
    </g>
  );
};
