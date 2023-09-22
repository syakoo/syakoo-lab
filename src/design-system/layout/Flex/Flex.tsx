import React from "react";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { flexItemStyle, flexStyle } from "./Flex.css";
import { PolymorphicComponent } from "@/utils/polymorphic-component";

type FlexProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
} & RecipeVariants<typeof flexStyle>;
/**
 * Flex 系のレイアウトコンポーネント
 *
 * 基本的には `Row` や `Col` を用いる
 */
export const Flex: React.FC<FlexProps> = ({
  as = "div",
  children,
  ...variantProps
}) => {
  const Tag = as;

  // NOTE: Tag はプリミティブな要素
  // eslint-disable-next-line react/forbid-component-props
  return <Tag className={flexStyle(variantProps)}>{children}</Tag>;
};

type FlexItemProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
} & RecipeVariants<typeof flexItemStyle>;
/**
 * Flex 用のアイテムレイアウトコンポーネント
 *
 * アイテム毎にカスタマイズする必要がないのであれば使用しなくても良い
 */
export const FlexItem: React.FC<FlexItemProps> = ({
  as = "div",
  children,
  ...variantProps
}) => (
  <PolymorphicComponent
    as={as}
    // NOTE: polymorphic component なのでヨシ
    // eslint-disable-next-line react/forbid-component-props
    className={flexItemStyle(variantProps)}
  >
    {children}
  </PolymorphicComponent>
);

/**
 * 横向きの Flex レイアウトコンポーネント
 */
export const Row: React.FC<Omit<FlexProps, "direction">> = ({
  gap = "100",
  justify = "flexStart",
  align = "stretch",
  ...otherProps
}) => (
  <Flex
    align={align}
    direction="row"
    gap={gap}
    justify={justify}
    {...otherProps}
  />
);

/**
 * 縦向きの Flex レイアウトコンポーネント
 */
export const Col: React.FC<Omit<FlexProps, "direction">> = ({
  gap = "100",
  justify = "flexStart",
  align = "stretch",
  ...otherProps
}) => (
  <Flex
    align={align}
    direction="column"
    gap={gap}
    justify={justify}
    {...otherProps}
  />
);
