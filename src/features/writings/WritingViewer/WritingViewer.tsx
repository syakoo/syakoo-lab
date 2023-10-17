import type { Writing } from "../types";
import { WritingHeader } from "./WritingHeader";
import { mdxParts } from "./mdxParts/index";
import { resolveMDXAsComponent } from "@/features/mdx/resolveMDXAsComponent";

type WritingViewerProps = {
  writing: Writing;
};

export const WritingViewer: React.FC<WritingViewerProps> = ({ writing }) => {
  const MDXComponent = resolveMDXAsComponent(writing.content);

  return (
    <article>
      <WritingHeader meta={writing.meta} />
      <div>
        <div>
          <MDXComponent components={mdxParts} />
        </div>
        <aside>{/* TODO: TOC */}</aside>
      </div>
    </article>
  );
};
