import type { RecipeVariants } from "@vanilla-extract/recipes";

import { spacerStyle } from "./spacer.css";

type SpacerProps = RecipeVariants<typeof spacerStyle>;

export const Spacer: React.FC<SpacerProps> = (props) => {
  return <div aria-hidden className={spacerStyle(props)} />;
};
