import type React from "react";

import { PolymorphicComponent } from "../../../utils/polymorphic-component/polymorphic-component";

import {
  type ContainerStyleVariants,
  containerStyle,
} from "./container.styles";

type ContainerProps = {
  as?: React.ElementType;
  children: React.ReactNode;
} & ContainerStyleVariants;

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
