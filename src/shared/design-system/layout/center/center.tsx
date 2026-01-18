import type React from "react";

import { PolymorphicComponent } from "@/shared/utils/polymorphic-component/polymorphic-component";

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
    className="flex flex-col content-stretch items-center justify-center"
  >
    {children}
  </PolymorphicComponent>
);
