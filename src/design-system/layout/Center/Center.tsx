import React from "react";
import { centerStyle } from "./Center.css";
import { PolymorphicComponent } from "@/utils/polymorphicComponent";

type CenterProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

/**
 * `children` を中央配置するためのコンポーネント
 */
export const Center: React.FC<CenterProps> = ({ as = "div", children }) => (
  <PolymorphicComponent as={as} className={centerStyle}>
    {children}
  </PolymorphicComponent>
);
