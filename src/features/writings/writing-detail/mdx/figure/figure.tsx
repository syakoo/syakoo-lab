import type { ReactNode } from "react";

import { figureCaptionStyle, figureStyle } from "./figure.css";

type FigureCaptionProps = {
  children: ReactNode;
};
type FigureProps = {
  children: ReactNode;
};

export const FigureCaption: React.FC<FigureCaptionProps> = ({ children }) => {
  return <figcaption className={figureCaptionStyle}>{children}</figcaption>;
};

/**
 * Figure コンポーネント
 */
export const Figure: React.FC<FigureProps> = ({ children }) => {
  return <figure className={figureStyle}>{children}</figure>;
};
