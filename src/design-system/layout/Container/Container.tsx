import type { RecipeVariants } from "@vanilla-extract/recipes";
import React from "react";

import { PolymorphicComponent } from "@/utils/polymorphicComponent";

import { containerStyle } from "./Container.css";

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
    className={containerStyle({ size, ...otherVariantProps })}
  >
    {children}
  </PolymorphicComponent>
);
