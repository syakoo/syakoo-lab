"use client";

import { useEffect, useState } from "react";

import { Link } from "../../../../shared/design-system/ui/link/link";
import { Span, Text } from "../../../../shared/design-system/ui/text/text";
import { useMount } from "../../../../shared/utils/use-mount/use-mount";

type TOCItem = {
  label: string;
  href: string;
};
type TOCViewProps = {
  items: TOCItem[];
  activeLabel?: string;
};

export const TOCView: React.FC<TOCViewProps> = ({ items, activeLabel }) => {
  return (
    <nav>
      <Text weight="bold">目次</Text>
      <ul className="mt-50 flex max-w-container-50 flex-col gap-25">
        {items.map(({ label, href }) => (
          <li key={label} className="p-25">
            <Link display="block" href={href} noHovered>
              <Span
                color={activeLabel === label ? "primary" : "secondary"}
                size="75"
              >
                {label}
              </Span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

type TOCData = (TOCItem & {
  positionY: number;
})[];

export const TOC: React.FC = () => {
  const [toc, setToc] = useState<TOCData>([]);
  const [activeSectionLabel, setActiveSectionLabel] = useState<string>();

  // TOC 取得
  useMount(() => {
    const h2Els = document.querySelectorAll("article h2");
    const tocItems: TOCData = [];

    for (const el of h2Els) {
      const label = el.textContent || "";

      tocItems.push({
        label,
        href: `#${el.id}`,
        positionY:
          el.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight / 2,
      });
    }

    setToc(tocItems);
  });

  useEffect(() => {
    const scrollEvent = () => {
      const y = window.scrollY;
      const idx = toc.findIndex((d) => d.positionY > y);

      if (idx === 0) {
        setActiveSectionLabel(undefined);
      } else if (idx === -1) {
        setActiveSectionLabel(toc[toc.length - 1]?.label);
      } else {
        setActiveSectionLabel(toc[idx - 1]?.label);
      }
    };

    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }
  return <TOCView activeLabel={activeSectionLabel} items={toc} />;
};
