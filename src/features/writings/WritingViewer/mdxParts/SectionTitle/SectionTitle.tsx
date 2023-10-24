import { sectionTitleStyle } from "./SectionTitle.css";
import { useSectionTitleId } from "./useSectionTitleId";
import { Link } from "@/design-system/ui";

type SectionTitleProps = {
  children: React.ReactNode;
};

/**
 * SectionTitle コンポーネント
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  const { titleRef, sectionId } = useSectionTitleId();

  return (
    <h2 ref={titleRef} className={sectionTitleStyle} id={sectionId}>
      <Link href={`#${sectionId}`}>{children}</Link>
    </h2>
  );
};
