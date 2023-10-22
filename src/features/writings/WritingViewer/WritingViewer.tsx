import type { Writing } from "../types";
import { WritingHeader } from "./WritingHeader";
import { writingViewerStyles } from "./WritingViewer.css";
import { mdxParts } from "./mdxParts/index";
import { resolveMDXAsComponent } from "@/features/mdx/resolveMDXAsComponent";

type WritingViewerProps = {
  writing: Writing;
};

export const WritingViewer: React.FC<WritingViewerProps> = ({ writing }) => {
  const MDXComponent = resolveMDXAsComponent(writing.content);

  return (
    <article className={writingViewerStyles.root}>
      <div className={writingViewerStyles.headerWrapper}>
        <WritingHeader meta={writing.meta} />
      </div>
      <div className={writingViewerStyles.contentWrapper}>
        <MDXComponent components={mdxParts} />
      </div>
      <aside className={writingViewerStyles.asideWrapper}>
        TOC
        {/* TODO: TOC */}
      </aside>
    </article>
  );
};
