import { Figure as FigureComponent, FigureCaption } from "./Figure";

type Figure = typeof FigureComponent & {
  Caption: typeof FigureCaption;
};

export const Figure = FigureComponent as Figure;
Figure.Caption = FigureCaption;
Figure.Caption.displayName = "Figure.Caption";
