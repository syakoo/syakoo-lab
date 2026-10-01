"use client";

import { useCallback, useState } from "react";
import type { WritingTocItem } from "../../../../../entities/writing";
import { Icon } from "../../../../../shared/design-system/icons/icon";
import {
  Drawer,
  useDrawerClose,
} from "../../../../../shared/design-system/ui/drawer/drawer";
import { TocView } from "./toc";
import styles from "./toc-drawer.module.css";
import { useTocActiveSection } from "./use-toc-active-section";

type TocDrawerProps = {
  items: WritingTocItem[];
};

const TocDrawerBody: React.FC<{
  items: WritingTocItem[];
  activeId?: string;
}> = ({ items, activeId }) => {
  const requestClose = useDrawerClose();

  const handleNavClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("a")) {
        requestClose();
      }
    },
    [requestClose],
  );

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: capture link clicks to close Drawer
    // biome-ignore lint/a11y/noStaticElementInteractions: capture link clicks to close Drawer
    <div onClick={handleNavClick}>
      <TocView activeId={activeId} hideTitle items={items} />
    </div>
  );
};

export const TocDrawer: React.FC<TocDrawerProps> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const activeSectionId = useTocActiveSection(items);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <button
        aria-label="目次を開く"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        type="button"
      >
        <Icon height={20} name="list" width={20} />
      </button>

      <Drawer open={open} onClose={close} title="目次">
        <TocDrawerBody activeId={activeSectionId} items={items} />
      </Drawer>
    </>
  );
};
