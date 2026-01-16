"use client";

import type { FC, PropsWithChildren } from "react";
import { useState } from "react";

import { Icon } from "@/shared/design-system/icons/icon";
import { Text } from "@/shared/design-system/ui/text/text";

import { styles } from "./file-view.css";

type Props = PropsWithChildren<{
  fileName: string;
}>;

export const FileViewUI: FC<Props> = ({ children, fileName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.root}>
      <button className={styles.summary} onClick={handleToggle} type="button">
        <div className={styles.icon({ open: isOpen })}>
          <Icon height={16} name="chevron-right" width={16} />
        </div>
        <Text size="75">{fileName}</Text>
      </button>
      {isOpen ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
};
