import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const aboutMeImageStyle = style({
  width: 64,
  height: 64,
  borderRadius: theme.radius.swaying,
});
