import { memo } from "react";

import { BookIcon } from "./BookIcon";
import { DocumentIcon } from "./DocumentIcon";
import { HeartIcon } from "./HeartIcon";
import { NoteIcon } from "./NoteIcon";
import { WarnIcon } from "./WarnIcon";
import type { IconComponentProps } from "./types";

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
