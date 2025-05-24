import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const artGalleryItemStyles = {
  image: style({
    aspectRatio: "1 / 1",
    objectFit: "cover",
    width: "100%",
    height: "auto",
    borderRadius: theme.radius[200],
  }),
  titleWrapper: style({
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  }),
  heartButtonWrapper: style({
    width: 26,
  }),
};
