import { writingTabStyle } from "./WritingTab.css";
import { Row } from "@/design-system/layout";
import { Link } from "@/design-system/ui";
import {
  WRITING_LIST_TYPES,
  type WritingListType,
} from "@/features/writings/WritingList/shared/writingListType";

type WritingTabProps = {
  selectedType: WritingListType;
};

export const WritingTab: React.FC<WritingTabProps> = ({ selectedType }) => {
  return (
    <Row>
      {WRITING_LIST_TYPES.map(({ label, type, url }) => {
        const isActive = selectedType === type;

        return (
          <Link key={type} href={url} noHovered={isActive}>
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