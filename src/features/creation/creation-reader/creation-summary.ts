import type {
  CreationGame,
  CreationIllust,
  CreationWebapp,
} from "@/entities/creation/models/creation";

export type CreationIllustSummary = Omit<CreationIllust, "content">;
export type CreationWebappSummary = Omit<CreationWebapp, "content">;
export type CreationGameSummary = Omit<CreationGame, "content">;

export type CreationSummary =
  | CreationIllustSummary
  | CreationWebappSummary
  | CreationGameSummary;
