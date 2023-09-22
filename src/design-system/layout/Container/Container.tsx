import React from "react";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { containerStyle } from "./Container.css";

type ContainerProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
} & RecipeVariants<typeof containerStyle>;

/**
 * 子要素を格納するサイズを決定するレイアウトコンテナコンポーネント
 */
export const Container: React.FC<ContainerProps> = ({
  as = "div",
  children,
  size = "100",
  ...otherVariantProps
}) => {
  const Tag = as;

  return (
    // NOTE: Tag はプリミティブな要素
    // eslint-disable-next-line react/forbid-component-props
    <Tag className={containerStyle({ size, ...otherVariantProps })}>
      {children}
    </Tag>
  );
};
