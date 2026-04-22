"use client";

import { useEffect, useState } from "react";
import type { WritingTocItem } from "../../../../entities/writing/models/writing";

import { Link } from "../../../../shared/design-system/ui/link/link";
import { Span, Text } from "../../../../shared/design-system/ui/text/text";

type TocViewProps = {
  items: WritingTocItem[];
  activeId?: string;
};

export const TocView: React.FC<TocViewProps> = ({ items, activeId }) => {
  return (
    <nav>
      <Text weight="bold">目次</Text>
      <ul className="mt-50 flex max-w-container-50 flex-col gap-25">
        {items.map(({ label, id, depth }) => (
          <li
            key={id}
            className={`p-25 ${depth === 3 ? "pl-100" : ""}`}
            data-depth={depth}
          >
            <Link display="block" href={`#${id}`} noHovered>
              <Span color={activeId === id ? "primary" : "secondary"} size="75">
                {label}
              </Span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

type TocData = (WritingTocItem & {
  positionY: number;
})[];

type TocProps = {
  items: WritingTocItem[];
};

export const Toc: React.FC<TocProps> = ({ items }) => {
  const [toc, setToc] = useState<TocData>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>();

  useEffect(() => {
    const resolvedTocItems: TocData = items.map((item) => {
      const el = document.getElementById(item.id);
      return {
        ...item,
        positionY: el
          ? el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2
          : Number.POSITIVE_INFINITY,
      };
    });
    setToc(resolvedTocItems);
  }, [items]);

  useEffect(() => {
    if (toc.length === 0) {
      setActiveSectionId(undefined);
      return;
    }

    const scrollEvent = () => {
      const y = window.scrollY;
      const idx = toc.findIndex((d) => d.positionY > y);

      if (idx === 0) {
        setActiveSectionId(undefined);
      } else if (idx === -1) {
        setActiveSectionId(toc[toc.length - 1]?.id);
      } else {
        setActiveSectionId(toc[idx - 1]?.id);
      }
    };

    scrollEvent();
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }
  return <TocView activeId={activeSectionId} items={items} />;
};
