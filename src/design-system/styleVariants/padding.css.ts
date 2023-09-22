/**
 * vanilla-extract の styleVariants はそれだけで CSS クラスを生成する。
 * そのため、ユーティリティ CSS のような Variants での管理を行う。
 */
import { styleVariants } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const paddingLeftVariants = styleVariants(tokens.spaces, (value) => ({
  paddingLeft: value,
}));
export const paddingRightVariants = styleVariants(tokens.spaces, (value) => ({
  paddingRight: value,
}));
export const paddingTopVariants = styleVariants(tokens.spaces, (value) => ({
  paddingTop: value,
}));
export const paddingBottomVariants = styleVariants(tokens.spaces, (value) => ({
  paddingBottom: value,
}));

export const paddingXVariants = styleVariants(tokens.spaces, (value) => ({
  paddingLeft: value,
  paddingRight: value,
}));
export const paddingYVariants = styleVariants(tokens.spaces, (value) => ({
  paddingTop: value,
  paddingBottom: value,
}));

export const paddingVariants = styleVariants(tokens.spaces, (value) => ({
  paddingTop: value,
  paddingBottom: value,
  paddingLeft: value,
  paddingRight: value,
}));

export const paddingVariantsCollection = {
  paddingLeft: paddingLeftVariants,
  paddingRight: paddingRightVariants,
  paddingTop: paddingTopVariants,
  paddingBottom: paddingBottomVariants,
  paddingX: paddingXVariants,
  paddingY: paddingYVariants,
  padding: paddingVariants,
} as const;
