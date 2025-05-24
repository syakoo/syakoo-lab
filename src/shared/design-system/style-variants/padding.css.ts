/**
 * vanilla-extract の styleVariants はそれだけで CSS クラスを生成する。
 * そのため、ユーティリティ CSS のような Variants での管理を行う。
 */
import { styleVariants } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const paddingLeftVariants = styleVariants(theme.space, (value) => ({
  paddingLeft: value,
}));
export const paddingRightVariants = styleVariants(theme.space, (value) => ({
  paddingRight: value,
}));
export const paddingTopVariants = styleVariants(theme.space, (value) => ({
  paddingTop: value,
}));
export const paddingBottomVariants = styleVariants(theme.space, (value) => ({
  paddingBottom: value,
}));

export const paddingXVariants = styleVariants(theme.space, (value) => ({
  paddingLeft: value,
  paddingRight: value,
}));
export const paddingYVariants = styleVariants(theme.space, (value) => ({
  paddingTop: value,
  paddingBottom: value,
}));

export const paddingVariants = styleVariants(theme.space, (value) => ({
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
