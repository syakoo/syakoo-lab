import { memo } from "react";

import { BookIcon } from "./book-icon";
import { DocumentIcon } from "./document-icon";
import { HeartIcon } from "./heart-icon";
import { NoteIcon } from "./note-icon";
import type { IconComponentProps } from "./types";
import { WarnIcon } from "./warn-icon";

export const iconDictionary = {
  document: DocumentIcon,
  note: NoteIcon,
  book: BookIcon,
  warn: WarnIcon,
  heart: HeartIcon,
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
