import React from "react";
import { centerStyle } from "./Center.css";

type CenterProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

/**
 * `children` を中央配置するためのコンポーネント
 */
export const Center: React.FC<CenterProps> = ({ as = "div", children }) => {
  const Tag = as;

  // NOTE: Tag はプリミティブな要素
  // eslint-disable-next-line react/forbid-component-props
  return <Tag className={centerStyle}>{children}</Tag>;
};
