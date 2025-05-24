import {
  type WritingListType,
  writingListTypePath,
} from "@/features/writings/writing-list/_shared/writing-list-type";
import { Row } from "@/shared/design-system/layout";
import { Link } from "@/shared/design-system/ui";

import { writingTabStyle } from "./writing-tab.css";

type WritingTabProps = {
  selectedType: WritingListType;
};

export const WritingTab: React.FC<WritingTabProps> = ({ selectedType }) => {
  const writingListTypes = [
    {
      type: "all",
      label: "All",
    },
    {
      type: "article",
      label: "Article",
    },
    {
      type: "note",
      label: "Note",
    },
    {
      type: "diary",
      label: "Diary",
    },
  ] as const satisfies readonly {
    type: WritingListType;
    label: string;
  }[];

  return (
    <Row>
      {writingListTypes.map(({ label, type }) => {
        const isActive = selectedType === type;

        return (
          <Link
            key={type}
            href={writingListTypePath(type)}
            noHovered={isActive}
          >
            <div
              aria-current={isActive}
              className={writingTabStyle.item({
                active: isActive,
              })}
            >
              {label}
            </div>
          </Link>
        );
      })}
    </Row>
  );
};
