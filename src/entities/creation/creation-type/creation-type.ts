import type { CreationType } from "@/entities/creation/models/creation";
import type { IconName } from "@/shared/design-system/icons/icon";

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
