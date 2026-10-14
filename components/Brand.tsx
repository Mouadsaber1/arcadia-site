// Le système de signes Arcadia (d'après la direction de marque) :
// la lame (signature du groupe), le sceau (l'officiel), le portail (les programmes).

type SvgProps = { className?: string; color?: string; title?: string };

const LAME = (color: string, stroke = 1.6) => (
  <g fill={color} stroke={color}>
    <polygon className="lame__blade" points="97,12 109,12 168,238 136,238" stroke="none" />
    <line className="lame__line" x1="100" y1="14" x2="42" y2="238" strokeWidth={stroke} pathLength={1} />
  </g>
);

export function Lame({ className, color = "currentColor", title, stroke = 1.6 }: SvgProps & { stroke?: number }) {
  return (
    <svg className={className} viewBox="0 0 200 260" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {LAME(color, stroke)}
    </svg>
  );
}

export function Seal({ className, color = "currentColor", title }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 300 300" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <g fill="none" stroke={color}>
        <circle cx="150" cy="150" r="140" strokeWidth="2" />
        <circle cx="150" cy="150" r="130" strokeWidth="0.8" />
        <circle cx="150" cy="150" r="98" strokeWidth="0.8" />
      </g>
      <g fill={color}>
        <circle cx="150" cy="16" r="3" />
        <circle cx="150" cy="284" r="3" />
        <circle cx="16" cy="150" r="3" />
        <circle cx="284" cy="150" r="3" />
      </g>
      <g transform="translate(108 92) scale(0.42)">{LAME(color, 3.4)}</g>
    </svg>
  );
}

export function Portal({ className, color = "currentColor", title }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 200 340" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect x="20" y="10" width="160" height="300" fill="none" stroke={color} strokeWidth="2.4" />
      <rect x="28" y="18" width="144" height="284" fill="none" stroke={color} strokeWidth="1" />
      <g transform="translate(45 88) scale(0.55)">{LAME(color, 3.6)}</g>
    </svg>
  );
}

// Nuance de patine propre à chaque programme (fond, encre)
export const PROGRAM_TONES = {
  californie: { bg: "#7FA39A", ink: "#1F2A27" },
  abdelmoumen: { bg: "#2E4A44", ink: "#F1ECE2" },
  ghandi: { bg: "#DCE6E2", ink: "#2E4A44" },
} as const;
