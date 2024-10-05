import { Big } from "./big";
import { BookView } from "./book-view";
import { Chat } from "./chat";
import { Choices, Choice } from "./choices";
import { CodeSandbox } from "./code-sandbox";
import { Figure } from "./figure";
import * as GeometryComponents from "./geometry";
import { Image } from "./image";
import { LinkCard } from "./link-card";
import { Note } from "./note";
import { Scrap } from "./scrap";
import { SectionTitle, SubSectionTitle } from "./section-title";

export const mdxComponents = {
  Big,
  BookView,
  Chat,
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
