import type React from "react";
import { forwardRef } from "react";

type PolymorphicComponentProps<C extends React.ElementType> = {
  as: C;
} & React.ComponentPropsWithRef<C>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export const PolymorphicComponent = forwardRef(
  <C extends React.ElementType>(
    { as, ...otherProps }: PolymorphicComponentProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as;

    return <Component {...otherProps} ref={ref} />;
  },
);
PolymorphicComponent.displayName = "PolymorphicComponent";
