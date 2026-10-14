"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { EVT_PICK_PROJECT, scrollToId, type PickProjectDetail } from "@/lib/scroll";
import { useLang } from "./Lang";
import { Portal, PROGRAM_TONES } from "./Brand";

const ProjectsPlayer = dynamic(() => import("./film/ProjectsPlayer"), { ssr: false });

export default function Projects() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive(i), []);

  const brochure = (projectId: string) => {
    window.dispatchEvent(
      new CustomEvent<PickProjectDetail>(EVT_PICK_PROJECT, { detail: { projectId, request: 1 } })
    );
    scrollToId("contact");
  };

  return (
    <section className="projects" id="projets" aria-labelledby="projets-title">
      <div className="wrap projects__intro">
        <div>
          <p className="label">{t.projects.nav}</p>
          <h2 id="projets-title" className="title">{t.projects.title}</h2>
        </div>
        <p className="lead">{t.projects.hint}</p>
      </div>

      <div className="wrap projects__grid">
        <div className="projects__stage">
          <div className="stage">
            <nav className="stage__tabs" aria-label={t.projects.nav}>
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-current={active === i ? "true" : undefined}
                  onClick={() => scrollToId(`projet-${p.id}`, -120)}
                >
                  {t.projects.items[p.id].district}
                </button>
              ))}
            </nav>
            <div className="stage__film" aria-hidden="true" dir="ltr">
              <ProjectsPlayer sectionId="projets-scroll" count={PROJECTS.length} onActive={onActive} />
            </div>
          </div>
        </div>

        <div className="projects__list" id="projets-scroll">
          {PROJECTS.map((p, i) => {
            const txt = t.projects.items[p.id];
            return (
              <article
                key={p.id}
                id={`projet-${p.id}`}
                className={`project ${active === i ? "is-active" : ""}`}
                aria-labelledby={`projet-${p.id}-title`}
              >
                <div
                  className="portal-tile"
                  aria-hidden="true"
                  style={{ background: PROGRAM_TONES[p.id].bg, color: PROGRAM_TONES[p.id].ink }}
                >
                  <Portal className="portal-tile__sign" />
                  <span lang="fr">{p.id.toUpperCase()}</span>
                </div>
                <p className="label">{txt.district}, {t.projects.city}</p>
                <h3 id={`projet-${p.id}-title`} className="title project__name">{txt.name}</h3>
                <p className="project__pitch">{txt.pitch}</p>
                <dl className="project__facts">
                  <div><dt>{t.projects.apartments}</dt><dd>{p.apartments}</dd></div>
                  <div><dt>{t.projects.delivery}</dt><dd>{p.delivery}</dd></div>
                  <div><dt>{t.projects.progress}</dt><dd>{p.progress}</dd></div>
                  <div><dt>{t.projects.price}</dt><dd>{t.projects.onRequest}</dd></div>
                </dl>
                <button type="button" className="btn btn--line" onClick={() => brochure(p.id)}>
                  {t.projects.cta}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
