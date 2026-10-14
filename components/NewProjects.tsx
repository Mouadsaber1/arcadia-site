"use client";

import { useEffect, useRef } from "react";
import { PROJECTS } from "@/lib/data";
import { EVT_PICK_PROJECT, scrollToId, type PickProjectDetail } from "@/lib/scroll";
import { useLang } from "./Lang";

type Img = { src: string; w: number; h: number };

const IMG = {
  hill: {
    pin: { src: "hill-sunset", w: 1280, h: 699 },
    gallery: [
      { src: "hill-promenade", w: 1280, h: 714 },
      { src: "hill-entree", w: 1040, h: 224 },
    ],
  },
  cal: {
    pin: { src: "cal-angle", w: 2752, h: 1536 },
    gallery: [
      { src: "cal-aerien", w: 2752, h: 1536 },
      { src: "cal-facade", w: 2752, h: 1536 },
    ],
  },
} satisfies Record<string, { pin: Img; gallery: Img[] }>;

const srcSet = (name: string) => `/p/${name}-1000.webp 1000w, /p/${name}-2000.webp 2000w`;

// Le rendu s'ouvre au scroll à travers une arche, le « portail » de la marque,
// jusqu'à remplir l'écran. Une seule variable CSS (--p, de 0 à 1) pilote tout.
function usePinProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / (travel * 0.75))) : 1;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return ref;
}

// Les images de la galerie entrent une fois, quand elles arrivent à l'écran
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px" }
    );
    el.querySelectorAll(".feat__fig").forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Feature({ id, index }: { id: "hill" | "cal"; index: number }) {
  const { t } = useLang();
  const f = t.feature;
  const txt = f[id];
  const img = IMG[id];
  const pin = usePinProgress();
  const gallery = useReveal();
  const cal = PROJECTS.find((p) => p.id === "californie")!;
  const projectId = id === "hill" ? "hill" : "californie";

  const facts =
    id === "hill"
      ? [
          [f.program, txt.program],
          [f.district, txt.district],
          [f.opening, "[DATE]"],
          [f.surface, "[SURFACE]"],
        ]
      : [
          [f.program, txt.program],
          [f.district, txt.district],
          [t.projects.apartments, cal.apartments],
          [t.projects.delivery, cal.delivery],
        ];

  const brochure = () => {
    window.dispatchEvent(new CustomEvent<PickProjectDetail>(EVT_PICK_PROJECT, { detail: { projectId, request: 1 } }));
    scrollToId("contact");
  };

  return (
    <article className="feat" id={`nouveau-${id}`} aria-labelledby={`nouveau-${id}-title`}>
      <div className="feat__pin" ref={pin}>
        <div className="feat__sticky">
          <p className="feat__kicker" aria-hidden="true">
            <span className="feat__num">{["I", "II"][index]}</span>
            {txt.kicker}
          </p>
          <div className="feat__media">
            <img
              src={`/p/${img.pin.src}-2000.webp`}
              srcSet={srcSet(img.pin.src)}
              sizes="100vw"
              width={img.pin.w}
              height={img.pin.h}
              alt={txt.alt[0]}
              decoding="async"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
          <div className="feat__over">
            <h3 id={`nouveau-${id}-title`} className="feat__name">{txt.name}</h3>
            <p className="feat__line">{txt.line}</p>
          </div>
        </div>
      </div>

      <div className="wrap feat__body">
        <div className="feat__intro">
          <p className="label">{txt.kicker}</p>
          <p className="feat__text">{txt.text}</p>
          <button type="button" className="btn btn--line" onClick={brochure}>
            {t.projects.cta}
          </button>
        </div>
        <dl className="feat__facts">
          {facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>

      <div className="wrap feat__gallery" ref={gallery}>
        {img.gallery.map((g, i) => (
          <figure key={g.src} className="feat__fig">
            <div className="feat__frame">
              <img
                src={`/p/${g.src}-2000.webp`}
                srcSet={srcSet(g.src)}
                sizes="(max-width: 760px) 100vw, 60vw"
                width={g.w}
                height={g.h}
                alt={txt.alt[i + 1]}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>{txt.captions[i]}</figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}

export default function NewProjects() {
  const { t } = useLang();
  return (
    <section className="news" id="nouveaux" aria-labelledby="nouveaux-title">
      <div className="wrap news__head">
        <p className="label">{t.feature.label}</p>
        <h2 id="nouveaux-title" className="title">
          {t.feature.hill.name} · {t.feature.cal.name}
        </h2>
      </div>
      <Feature id="hill" index={0} />
      <Feature id="cal" index={1} />
    </section>
  );
}
