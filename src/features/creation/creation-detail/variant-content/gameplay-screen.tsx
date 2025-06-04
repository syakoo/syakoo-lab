import type { FC } from "react";

import type { CreationGame } from "@/entities/creation/models/creation";

import { styles } from "./gameplay-screen.css";

type GameplayScreenProps = Pick<CreationGame, "gameplayScreen" | "title">;

export const GameplayScreen: FC<GameplayScreenProps> = ({
  gameplayScreen,
  title,
}) => {
  return (
    <div className={styles.container}>
      <iframe
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
  );
};
