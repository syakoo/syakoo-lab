import { FigureCaption, Figure as FigureComponent } from "./figure";

type Figure = typeof FigureComponent & {
  Caption: typeof FigureCaption;
};

export const Figure = FigureComponent as Figure;
Figure.Caption = FigureCaption;
Figure.Caption.displayName = "Figure.Caption";
