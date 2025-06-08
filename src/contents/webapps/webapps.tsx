import haskellFunctionPuzzleImageSrc from "./images/haskell-function-puzzle.png";
import magicSquareImageSrc from "./images/magic-square.png";
import realSharingImageSrc from "./images/real-sharing.png";
import type { WebappContent } from "./types";

export const webapps: WebappContent[] = [
  {
    id: "haskell-function-puzzle",
    name: "Haskell Function Puzzle",
    imageSrc: haskellFunctionPuzzleImageSrc,
    releasedAt: "2021-03-16",
    siteUrl: "https://haskell-function-puzzle.vercel.app",
    repositoryUrl: "https://github.com/syakoo/haskell-function-puzzle",
    description: `
Haskell の関数合成パズルサイト。React + TypeScript で作成しています。

[紹介サイト](/writings/20210316)
`,
  },
  {
    id: "real-sharing",
    name: "Real Sharing",
    imageSrc: realSharingImageSrc,
    releasedAt: "2020-04-17",
    siteUrl: "https://syakoo.github.io/real_share_app",
    repositoryUrl: "https://github.com/syakoo/real_share_app",
    description:
      "Web NFC を使った秘密分散共有法のシミュレーションアプリ。React + TypeScript + Redux-saga で作成しています。",
  },
  {
    id: "magic-square",
    name: "MagicSquare",
    imageSrc: magicSquareImageSrc,
    releasedAt: "2019-08-31",
    siteUrl: "https://magic-square.firebaseapp.com",
    repositoryUrl: "https://github.com/syakoo/MagicSquare",
    description:
      "魔法陣のタイムアタックアプリ。初めて作った Web アプリケーションです。React + TS で作っています。",
  },
];
