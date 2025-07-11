import { memo } from "react";

import { BookIcon } from "./book-icon";
import { BrushIcon } from "./brush-icon";
import { ChevronRightIcon } from "./chevron-right-icon";
import { DocumentIcon } from "./document-icon";
import { FullscreenIcon } from "./fullscreen-icon";
import { GameIcon } from "./game-icon";
import { GlobeIcon } from "./globe-icon";
import { HeartIcon } from "./heart-icon";
import { LinkIcon } from "./link-icon";
import { NoteIcon } from "./note-icon";
import type { IconComponentProps } from "./types";
import { WarnIcon } from "./warn-icon";

export const iconDictionary = {
  document: DocumentIcon,
  note: NoteIcon,
  book: BookIcon,
  warn: WarnIcon,
  heart: HeartIcon,
  brush: BrushIcon,
  globe: GlobeIcon,
  game: GameIcon,
  link: LinkIcon,
  fullscreen: FullscreenIcon,
  "chevron-right": ChevronRightIcon,
};

export type IconName = keyof typeof iconDictionary;

type IconProps = {
  name: IconName;
} & IconComponentProps;

export const Icon: React.FC<IconProps> = memo(function Icon({
  name,
  ...otherProps
}) {
  const ResolvedIcon = iconDictionary[name];

  return <ResolvedIcon {...otherProps} />;
});
