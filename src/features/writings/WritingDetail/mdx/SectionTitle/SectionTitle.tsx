import { Link } from "@/design-system/ui";

import { sectionTitleStyle } from "./SectionTitle.css";

type SectionTitleProps = {
  children: React.ReactNode;
  id?: string;
};

/**
 * SectionTitle コンポーネント
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ children, id }) => {
  return (
    <h2 className={sectionTitleStyle} id={id}>
      <Link href={`#${id}`}>{children}</Link>
    </h2>
  );
};
