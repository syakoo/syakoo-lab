import { Row } from "@/design-system/layout";
import { Link } from "@/design-system/ui";
import {
  writingListTypeConfig,
  type WritingListType,
} from "@/features/writings/WritingList/_shared/writingListType";

import { writingTabStyle } from "./WritingTab.css";

type WritingTabProps = {
  selectedType: WritingListType;
};

export const WritingTab: React.FC<WritingTabProps> = ({ selectedType }) => {
  return (
    <Row>
      {writingListTypeConfig.map(({ label, type, url }) => {
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
