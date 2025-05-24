import { style } from "@vanilla-extract/css";

export const containerStyle = style({
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  gridTemplateColumns: "100%",
  minHeight: "100vh",
  gridTemplateAreas: `"header"
                      "main"
                      "footer"`,
});

export const containerHeaderStyle = style({
  gridArea: "header",
  position: "sticky",
  top: 0,
  zIndex: 100,
});
export const containerMainStyle = style({
  gridArea: "main",
});
export const containerFooterStyle = style({
  gridArea: "footer",
});
