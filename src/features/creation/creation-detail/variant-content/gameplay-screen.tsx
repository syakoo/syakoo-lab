"use client";

import type { FC } from "react";
import { useRef } from "react";

import type { CreationGame } from "../../../../entities/creation/models/creation";
import { Icon } from "../../../../shared/design-system/icons/icon";

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
      <div className="flex max-md:-mx-200">
        <iframe
          ref={iframeRef}
          className="mx-auto h-auto w-full"
          height={gameplayScreen.height}
          src={gameplayScreen.src}
          style={{
            aspectRatio: `${gameplayScreen.width} / ${gameplayScreen.height}`,
          }}
          title={`${title}のゲームプレイ画面`}
          width={gameplayScreen.width}
        />
      </div>
      <div className="flex justify-end pt-50">
        <button
          className="flex size-[19px] cursor-pointer rounded-50 p-25 text-text-primary transition-opacity duration-200 hover:opacity-80"
          onClick={handleFullscreen}
          type="button"
        >
          <Icon height={15} name="fullscreen" width={15} />
        </button>
      </div>
    </div>
  );
};
