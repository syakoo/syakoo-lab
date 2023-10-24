import { subsectionTitleStyle } from "./SectionTitle.css";
import { useSectionTitleId } from "./useSectionTitleId";
import { Link } from "@/design-system/ui";

type SubSectionTitleProps = {
  children: React.ReactNode;
};

/**
 * SubSectionTitle コンポーネント
 */
export const SubSectionTitle: React.FC<SubSectionTitleProps> = ({
  children,
}) => {
  const { titleRef, sectionId } = useSectionTitleId();

  return (
    <h3 ref={titleRef} className={subsectionTitleStyle} id={sectionId}>
      <Link href={`#${sectionId}`}>{children}</Link>
    </h3>
  );
};
