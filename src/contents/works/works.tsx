import haskellFunctionPuzzleImageSrc from "./images/HaskellFunctionPuzzle.png";
import magicSquareImageSrc from "./images/MagicSquare.png";
import realSharingImageSrc from "./images/RealSharing.png";
import { Link } from "@/design-system/ui";
import type { Work } from "@/features/works/types/work";

export const works: Work[] = [
  {
    name: "MagicSquare",
    imageSrc: magicSquareImageSrc,
    releasedAt: "2019-08-31T19:12:03.284Z",
    siteUrl: "https://magic-square.firebaseapp.com",
    repositoryUrl: "https://github.com/syakoo/MagicSquare",
    description:
      "魔法陣のタイムアタックアプリ。初めて作った Web アプリケーションです。React + TS で作っています。",
  },
  {
    name: "Real Sharing",
    imageSrc: realSharingImageSrc,
    releasedAt: "2020-04-17T19:12:03.284Z",
    siteUrl: "https://syakoo.github.io/real_share_app",
    repositoryUrl: "https://github.com/syakoo/real_share_app",
    description:
      "Web NFC を使った秘密分散共有法のシミュレーションアプリ。React + TypeScript + Redux-saga で作成しています。",
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
];