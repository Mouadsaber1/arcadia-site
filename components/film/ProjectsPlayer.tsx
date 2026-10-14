"use client";

import { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { ProjectsFilm } from "./ProjectsFilm";
import { PROJECTS_FILM } from "./constants";

type Props = {
  sectionId: string;
  count: number;
  onActive: (index: number) => void;
};

// Le film avance avec le scroll : la position dans la section donne l'image à afficher.
export default function ProjectsPlayer({ sectionId, count, onActive }: Props) {
  const player = useRef<PlayerRef>(null);
  const last = useRef({ frame: -1, active: -1 });

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      const frame = Math.round(progress * (PROJECTS_FILM.duration - 1));
      if (frame !== last.current.frame) {
        last.current.frame = frame;
        player.current?.seekTo(frame);
      }
      const active = Math.min(count - 1, Math.floor(progress * count));
      if (active !== last.current.active) {
        last.current.active = active;
        onActive(active);
      }
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
  }, [sectionId, count, onActive]);

  return (
    <Player
      ref={player}
      component={ProjectsFilm}
      durationInFrames={PROJECTS_FILM.duration}
      fps={PROJECTS_FILM.fps}
      compositionWidth={PROJECTS_FILM.width}
      compositionHeight={PROJECTS_FILM.height}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      acknowledgeRemotionLicense
      style={{ width: "100%", height: "100%" }}
    />
  );
}
