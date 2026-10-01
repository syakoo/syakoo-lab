"use client";

import { useEffect, useState } from "react";
import type { WritingTocItem } from "../../../../../entities/writing";

type TocData = (WritingTocItem & { positionY: number })[];

export const useTocActiveSection = (
  items: WritingTocItem[],
): string | undefined => {
  const [positionedTocItems, setPositionedTocItems] = useState<TocData>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>();

  useEffect(() => {
    const resolvedTocItems: TocData = items.map((item) => {
      const el = document.getElementById(item.id);
      return {
        ...item,
        positionY: el
          ? el.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight / 2
          : Number.POSITIVE_INFINITY,
      };
    });
    setPositionedTocItems(resolvedTocItems);
  }, [items]);

  useEffect(() => {
    if (positionedTocItems.length === 0) {
      setActiveSectionId(undefined);
      return;
    }

    const scrollEvent = () => {
      const y = window.scrollY;
      const idx = positionedTocItems.findIndex((d) => d.positionY > y);

      if (idx === 0) {
        setActiveSectionId(undefined);
      } else if (idx === -1) {
        setActiveSectionId(
          positionedTocItems[positionedTocItems.length - 1]?.id,
        );
      } else {
        setActiveSectionId(positionedTocItems[idx - 1]?.id);
      }
    };

    scrollEvent();
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [positionedTocItems]);

  return activeSectionId;
};
