import { Link } from "@/design-system/ui";

import haskellFunctionPuzzleImageSrc from "./images/haskell-function-puzzle.png";
import magicSquareImageSrc from "./images/magic-square.png";
import realSharingImageSrc from "./images/real-sharing.png";
import syakooGameImageSrc from "./images/syakoo-game.png";
import type { Work } from "./types";

export const works: Work[] = [
  {
    name: "Syakoo Game",
    imageSrc: syakooGameImageSrc,
    releasedAt: "2024-08-18",
    siteUrl: "https://game.syakoo-lab.com",
    repositoryUrl: "",
    description:
      "ブラウザで遊べる無料のゲーム集。空き時間で気軽に楽しむことができます。",
  },
  {
    name: "Haskell Function Puzzle",
    imageSrc: haskellFunctionPuzzleImageSrc,
    releasedAt: "2021-03-16",
    siteUrl: "https://haskell-function-puzzle.vercel.app",
    repositoryUrl: "https://github.com/syakoo/haskell-function-puzzle",
    description: (
      <div>
        Haskell の関数合成パズルサイト。React + TypeScript で作成しています。
        <Link colored href="/writings/20210316">
          紹介サイト
        </Link>
      </div>
    ),
  },
  {
    name: "Real Sharing",
    imageSrc: realSharingImageSrc,
    releasedAt: "2020-04-17",
    siteUrl: "https://syakoo.github.io/real_share_app",
    repositoryUrl: "https://github.com/syakoo/real_share_app",
    description:
      "Web NFC を使った秘密分散共有法のシミュレーションアプリ。React + TypeScript + Redux-saga で作成しています。",
  },
  {
    name: "MagicSquare",
    imageSrc: magicSquareImageSrc,
    releasedAt: "2019-08-31",
    siteUrl: "https://magic-square.firebaseapp.com",
    repositoryUrl: "https://github.com/syakoo/MagicSquare",
    description:
      "魔法陣のタイムアタックアプリ。初めて作った Web アプリケーションです。React + TS で作っています。",
  },
];
