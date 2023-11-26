import { Big } from "./Big";
import { BookView } from "./BookView";
import { Choices, Choice } from "./Choices";
import { CodeSandbox } from "./CodeSandbox";
import { Figure } from "./Figure";
import * as GeometryComponents from "./Geometry";
import { Image } from "./Image";
import { LinkCard } from "./LinkCard";
import { Note } from "./Note";
import { Scrap } from "./Scrap";
import { SectionTitle, SubSectionTitle } from "./SectionTitle";

export const mdxComponents = {
  Big,
  BookView,
  Note,
  CodeSandbox,
  ...GeometryComponents,
  LinkCard,
  Choice,
  Choices,
  Scrap,
  Image,
  SectionTitle,
  SubSectionTitle,
  Figure,
};
