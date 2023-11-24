import type { RecipeVariants } from "@vanilla-extract/recipes";
import type React from "react";

import { PolymorphicComponent } from "@/utils/polymorphicComponent";

import { textStyle } from "./Text.css";

type TextProps = {
  children: React.ReactNode;
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4";
} & Partial<RecipeVariants<typeof textStyle>>;

export const Text: React.FC<TextProps> = ({
  children,
  as = "p",
  color = "currentColor",
  size = "100",
  weight = "normal",
}) => (
  <PolymorphicComponent as={as} className={textStyle({ color, size, weight })}>
    {children}
  </PolymorphicComponent>
);

export const H1: React.FC<TextProps> = ({
  as = "h1",
  size = "600",
  weight = "bold",
  ...otherProps
}) => <Text as={as} size={size} weight={weight} {...otherProps} />;

export const H2: React.FC<TextProps> = ({
  as = "h2",
  size = "500",
  weight = "bold",
  ...otherProps
}) => <Text as={as} size={size} weight={weight} {...otherProps} />;

export const H3: React.FC<TextProps> = ({
  as = "h3",
  size = "400",
  weight = "bold",
  ...otherProps
}) => <Text as={as} size={size} weight={weight} {...otherProps} />;

export const H4: React.FC<TextProps> = ({
  as = "h4",
  size = "300",
  weight = "bold",
  ...otherProps
}) => <Text as={as} size={size} weight={weight} {...otherProps} />;

export const P: React.FC<TextProps> = ({
  as = "p",
  size = "100",
  weight = "normal",
  ...otherProps
}) => <Text as={as} size={size} weight={weight} {...otherProps} />;

export const Span: React.FC<TextProps> = ({
  as = "span",
  size = "100",
  weight = "normal",
  ...otherProps
}) => <Text as={as} size={size} weight={weight} {...otherProps} />;
