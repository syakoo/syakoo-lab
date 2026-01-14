"use client";

import { Link } from "@/shared/design-system/ui/link/link";

import { subsectionTitleStyle } from "./section-title.css";

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
    <h3 className={subsectionTitleStyle} id={id}>
      <Link href={`#${id}`}>{children}</Link>
    </h3>
  );
};
