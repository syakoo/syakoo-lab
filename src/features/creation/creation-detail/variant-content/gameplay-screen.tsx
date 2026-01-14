"use client";

import { useRef } from "react";
import type { FC } from "react";

import type { CreationGame } from "@/entities/creation/models/creation";
import { Icon } from "@/shared/design-system/icons/icon";

import { styles } from "./gameplay-screen.css";

type GameplayScreenProps = Pick<CreationGame, "gameplayScreen" | "title">;

export const GameplayScreen: FC<GameplayScreenProps> = ({
  gameplayScreen,
  title,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    if (!iframeRef.current) return;
    void iframeRef.current.requestFullscreen();
  };

  return (
    <div>
      <div className={styles.screenContainer}>
        <iframe
          ref={iframeRef}
          className={styles.screen}
          height={gameplayScreen.height}
          src={gameplayScreen.src}
          style={{
            aspectRatio: `${gameplayScreen.width} / ${gameplayScreen.height}`,
          }}
          title={`${title}のゲームプレイ画面`}
          width={gameplayScreen.width}
        />
      </div>
      <div className={styles.fullscreenButtonContainer}>
        <button
          className={styles.fullscreenButton}
          onClick={handleFullscreen}
          type="button"
        >
          <Icon height={15} name="fullscreen" width={15} />
        </button>
      </div>
    </div>
  );
};
