"use client";

import { Player } from "@remotion/player";
import { Skyline } from "./Skyline";
import { SKYLINE } from "./constants";

// Composition Remotion jouée dans la page : vectorielle, sans fichier vidéo.
export default function SkylinePlayer({ still }: { still: boolean }) {
  return (
    <Player
      component={Skyline}
      durationInFrames={SKYLINE.duration}
      fps={SKYLINE.fps}
      compositionWidth={SKYLINE.width}
      compositionHeight={SKYLINE.height}
      autoPlay={!still}
      loop
      initialFrame={still ? 240 : 0}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      acknowledgeRemotionLicense
      style={{ width: "100%", aspectRatio: `${SKYLINE.width} / ${SKYLINE.height}` }}
    />
  );
}
