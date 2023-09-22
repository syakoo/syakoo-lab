import React from "react";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { containerStyle } from "./Container.css";
import { PolymorphicComponent } from "@/utils/polymorphic-component";

type ContainerProps = {
  as?: React.ElementType;
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
}) => (
  <PolymorphicComponent
    as={as}
    // NOTE: polymorphic component なのでヨシ
    // eslint-disable-next-line react/forbid-component-props
    className={containerStyle({ size, ...otherVariantProps })}
  >
    {children}
  </PolymorphicComponent>
);
