import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const artGalleryItemStyles = {
  image: style({
    aspectRatio: "1 / 1",
    objectFit: "cover",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    borderRadius: tokens.radii[200],
  }),
  titleWrapper: style({
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  }),
};
