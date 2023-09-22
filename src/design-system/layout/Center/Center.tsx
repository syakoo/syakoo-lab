import React from "react";
import { centerStyle } from "./Center.css";
import { PolymorphicComponent } from "@/utils/polymorphic-component";

type CenterProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

/**
 * `children` を中央配置するためのコンポーネント
 */
export const Center: React.FC<CenterProps> = ({ as = "div", children }) => (
  <PolymorphicComponent
    as={as}
    // NOTE: polymorphic component なのでヨシ
    // eslint-disable-next-line react/forbid-component-props
    className={centerStyle}
  >
    {children}
  </PolymorphicComponent>
);
