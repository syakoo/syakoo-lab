import type { SerializedMDXContent } from "../../../features/mdx/types";

export type CreationType = "illust" | "game" | "webapp";
export type Creation = CreationIllust | CreationGame | CreationWebapp;

export type CreationIllust = CreationBase & {
  type: "illust";
  illust: {
    src: string;
    width: number;
    height: number;
  };
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationGame = CreationBase & {
  type: "game";
  gameplayScreen: {
    src: string;
    width: number;
    height: number;
  };
  logo: {
    src: string;
    width: number;
    height: number;
  };
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationWebapp = CreationBase & {
  type: "webapp";
  logo: {
    src: string;
    width: number;
    height: number;
  };
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationBase = {
  id: string;
  title: string;
  published: string;
  publicLinks: {
    title: string;
    href: string;
    color: string;
  }[];
  updated?: string;
  noindex?: boolean;
};

export type CreationIllustSummary = Omit<CreationIllust, "content">;
export type CreationWebappSummary = Omit<CreationWebapp, "content">;
export type CreationGameSummary = Omit<CreationGame, "content">;

/**
 * content を除いた Creation の型。一覧表示などで使用する。
 *
 * @example
 * ```ts
 * const summaries = await readCreationSummaries();
 * summaries.map((summary) => (
 *   <CreationCard key={summary.id} {...summary} />
 * ));
 * ```
 */
export type CreationSummary =
  | CreationIllustSummary
  | CreationWebappSummary
  | CreationGameSummary;
