"use client";

import type { Writing } from "../types";
import { TOC } from "./TOC";
import { WritingHeader } from "./WritingHeader";
import { writingViewerStyles } from "./WritingViewer.css";
import { mdxParts } from "./mdxParts/index";
import { Link } from "@/design-system/ui";
import { useMermaid } from "@/features/mdx/plugins/mermaid/useMermaid";
import { resolveMDXAsComponent } from "@/features/mdx/resolveMDXAsComponent";
import { useTwitter } from "@/features/mdx/useTwitter";

type WritingViewerProps = {
  writing: Writing;
};

const components = {
  ...mdxParts,
  a: (props: Parameters<typeof Link>[0]) => <Link colored {...props} />,
};

export const WritingViewer: React.FC<WritingViewerProps> = ({ writing }) => {
  useMermaid();
  useTwitter();
  const MDXComponent = resolveMDXAsComponent(writing.serializedBody);

  return (
    <article className={writingViewerStyles.root}>
      <div className={writingViewerStyles.headerWrapper}>
        <WritingHeader meta={writing.meta} />
      </div>
      <div className={writingViewerStyles.contentWrapper}>
        <MDXComponent components={components} />
      </div>
      <aside className={writingViewerStyles.asideWrapper}>
        <div className={writingViewerStyles.stickyContainer}>
          <TOC />
        </div>
      </aside>
    </article>
  );
};
