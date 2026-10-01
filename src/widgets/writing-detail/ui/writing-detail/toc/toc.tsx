"use client";

import type { WritingTocItem } from "../../../../../entities/writing";

import { Link } from "../../../../../shared/design-system/ui/link/link";
import { Span, Text } from "../../../../../shared/design-system/ui/text/text";
import { useTocActiveSection } from "./use-toc-active-section";

type TocViewProps = {
  items: WritingTocItem[];
  activeId?: string;
  hideTitle?: boolean;
};

export const TocView: React.FC<TocViewProps> = ({
  items,
  activeId,
  hideTitle = false,
}) => {
  return (
    <nav>
      {!hideTitle && <Text weight="bold">目次</Text>}
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

type TocProps = {
  items: WritingTocItem[];
};

export const Toc: React.FC<TocProps> = ({ items }) => {
  const activeSectionId = useTocActiveSection(items);

  if (items.length === 0) {
    return null;
  }
  return <TocView activeId={activeSectionId} items={items} />;
};
