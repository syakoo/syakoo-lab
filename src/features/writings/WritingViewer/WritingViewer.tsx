"use client";

import { addYears, isBefore } from "date-fns";
import type { Writing } from "../types";
import { TOC } from "./TOC";
import { WritingHeader } from "./WritingHeader";
import { writingViewerStyles } from "./WritingViewer.css";
import { Note } from "./mdxParts/Note";
import { mdxParts } from "./mdxParts/index";
import { Link, FadeIn } from "@/design-system/ui";
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
  const isOldWriting = (() => {
    // NOTE: diary の場合は古くても表示する必要はないと判断
    if (writing.meta.type === "diary") return false;

    return isBefore(new Date(writing.meta.published), addYears(new Date(), -1));
  })();

  return (
    <FadeIn>
      <article className={writingViewerStyles.root}>
        <div className={writingViewerStyles.headerWrapper}>
          <WritingHeader meta={writing.meta} />
        </div>
        <div className={writingViewerStyles.contentWrapper}>
          {isOldWriting ? (
            <Note variant="warn">
              この記事は古い内容である可能性があります。
            </Note>
          ) : null}
          <MDXComponent components={components} />
        </div>
        <aside className={writingViewerStyles.asideWrapper}>
          <div className={writingViewerStyles.stickyContainer}>
            <TOC />
          </div>
        </aside>
      </article>
    </FadeIn>
  );
};
