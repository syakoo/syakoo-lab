"use client";

import { Link } from "@/shared/design-system/ui/link/link";

type SubSectionTitleProps = {
  children: React.ReactNode;
  id?: string;
};

/**
 * SubSectionTitle コンポーネント
 */
export const SubSectionTitle: React.FC<SubSectionTitleProps> = ({
  children,
  id,
}) => {
  return (
    <h3 className="mt-400 mb-200 scroll-mt-200 font-bold text-300" id={id}>
      <Link href={`#${id}`}>{children}</Link>
    </h3>
  );
};
