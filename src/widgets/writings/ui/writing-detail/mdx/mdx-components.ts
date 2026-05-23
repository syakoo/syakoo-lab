import { Big } from "./big/big";
import { BookView } from "./book-view/book-view";
import { Chat } from "./chat/chat-with-message";
import { Choice, Choices } from "./choices/choices";
import { CodeSandbox } from "./code-sandbox/code-sandbox";
import { Figure } from "./figure/figure-with-caption";
import * as GeometryComponents from "./geometry/geometry-exports";
import { Image } from "./image/image";
import { LinkCard } from "./link-card/link-card";
import { Note } from "./note/note";
import { Scrap } from "./scrap/scrap";
import { SectionTitle } from "./section-title/section-title";
import { SubSectionTitle } from "./section-title/sub-section-title";

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
