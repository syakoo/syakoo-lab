import { Link } from "@/shared/design-system/ui/link/link";

import styles from "./section-title.module.css";

type SectionTitleProps = {
  children: React.ReactNode;
  id?: string;
};

/**
 * SectionTitle コンポーネント
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ children, id }) => {
  return (
    <h2
      className={`${styles.title} relative mt-500 mb-200 scroll-mt-[calc(var(--spacing-200)+var(--size-header))] py-200 font-bold text-500`}
      id={id}
    >
      <Link href={`#${id}`}>{children}</Link>
    </h2>
  );
};
