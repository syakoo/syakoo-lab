import type { AboutMeConfig } from "../../features/home/about-me/types";

import atcoderImageSrc from "./atcoder.png";
import githubImageSrc from "./github.png";
import leetCodeImageSrc from "./leetcode.png";
import meImageSrc from "./me.jpg";
import steamImageSrc from "./steam.png";
import xImageSrc from "./x.png";

export const aboutMeConfig = {
  name: "syakoo",
  bio: "気分駆動フロントエンドエンジニア。言語・フレームワーク仕様よりは設計やアルゴリズムなどの抽象的な部分に興味があります。",
  imageSrc: meImageSrc,
  links: [
    {
      name: "Github",
      url: "https://github.com/syakoo",
      imageSrc: githubImageSrc,
    },
    {
      name: "X (Twitter)",
      url: "https://twitter.com/sako_data",
      imageSrc: xImageSrc,
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/syakoo/",
      imageSrc: leetCodeImageSrc,
    },
    {
      name: "Steam",
      url: "https://steamcommunity.com/profiles/76561198944381322/",
      imageSrc: steamImageSrc,
    },
    {
      name: "AtCoder",
      url: "https://atcoder.jp/users/syakoo",
      imageSrc: atcoderImageSrc,
    },
  ],
} satisfies AboutMeConfig;
