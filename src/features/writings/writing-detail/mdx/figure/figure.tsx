import type { ReactNode } from "react";

import styles from "./figure.module.css";

type FigureCaptionProps = {
  children: ReactNode;
};
type FigureProps = {
  children: ReactNode;
};

export const FigureCaption: React.FC<FigureCaptionProps> = ({ children }) => {
  return (
    <figcaption className="text-center text-text-secondary">
      {children}
    </figcaption>
  );
};

/**
 * Figure コンポーネント
 */
export const Figure: React.FC<FigureProps> = ({ children }) => {
  return (
    <figure
      className={`${styles.figure} mx-auto my-200 flex flex-col justify-center gap-100`}
    >
      {children}
    </figure>
  );
};
