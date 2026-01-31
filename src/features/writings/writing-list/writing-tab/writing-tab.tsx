import { Row } from "../../../../shared/design-system/layout/flex/flex";
import { Link } from "../../../../shared/design-system/ui/link/link";
import { cn } from "../../../../shared/utils/cn/cn";
import {
  type WritingListType,
  writingListTypePath,
} from "../_shared/writing-list-type";

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
              className={cn(
                "p-100 no-underline",
                isActive
                  ? "border-current border-b-4 text-text-primary"
                  : "text-text-secondary",
              )}
            >
              {label}
            </div>
          </Link>
        );
      })}
    </Row>
  );
};
