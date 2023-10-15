import type { Writing } from "../types";
import { WritingHeader } from "./WritingHeader";

type WritingViewerProps = {
  writing: Writing;
};

export const WritingViewer: React.FC<WritingViewerProps> = ({ writing }) => {
  return (
    <article>
      <WritingHeader meta={writing.meta} />
      <div>
        <div>{/* TODO: 本文 */}</div>
        <aside>{/* TODO: TOC */}</aside>
      </div>
    </article>
  );
};
