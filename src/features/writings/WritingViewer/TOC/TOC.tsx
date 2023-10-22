import { useState, useEffect } from "react";
import { tocStyles } from "./TOC.css";
import { Link, Text } from "@/design-system/ui";

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
      <ul className={tocStyles.list}>
        {items.map(({ label, href }) => (
          <li
            key={label}
            className={tocStyles.item({ active: activeLabel === label })}
          >
            <Link display="block" href={href} noHovered>
              {label}
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

  useEffect(() => {
    if (toc.length) return;

    // FIXME: 筋が悪いので直したい
    // 遷移先である DOM Id の導入から修正する
    setTimeout(() => {
      const h2Els = document.querySelectorAll("article h2");
      const tocItems: TOCData = [];

      h2Els.forEach((el) => {
        const label = el.textContent || "";

        tocItems.push({
          label,
          href: `#${el.id}`,
          positionY:
            el.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight / 2,
        });
      });

      setToc(tocItems);
    }, 100);
  }, [toc]);

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

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [toc]);

  useEffect(() => {
    setToc([]);
  }, []);

  if (toc.length === 0) {
    return null;
  }
  return <TOCView activeLabel={activeSectionLabel} items={toc} />;
};
