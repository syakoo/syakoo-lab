"use client";

import type { WritingTocItem } from "../../../../../entities/writing";

import styles from "../writing-detail.module.css";
import { TocView } from "./toc";
import { TocDrawer } from "./toc-drawer";
import { useTocActiveSection } from "./use-toc-active-section";

type WritingDetailTocProps = {
  items: WritingTocItem[];
};

export const WritingDetailToc: React.FC<WritingDetailTocProps> = ({
  items,
}) => {
  const activeSectionId = useTocActiveSection(items);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <aside className={`${styles.aside} flex h-full flex-col gap-200 p-200`}>
        <div className="sticky top-[calc(var(--spacing-200)+var(--size-header))]">
          <TocView activeId={activeSectionId} items={items} />
        </div>
      </aside>
      <TocDrawer activeId={activeSectionId} items={items} />
    </>
  );
};
