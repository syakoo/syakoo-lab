import type { IconName } from "../../../shared";
import type { CreationType } from "../models/creation";

export type CreationTypeInfo = {
  label: string;
  icon: IconName;
};

export const creationTypes: Record<CreationType, CreationTypeInfo> = {
  illust: {
    label: "Illust",
    icon: "brush",
  },
  game: {
    label: "Game",
    icon: "game",
  },
  webapp: {
    label: "Webapp",
    icon: "globe",
  },
};
