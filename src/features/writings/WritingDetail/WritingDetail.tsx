"use client";

import { addYears, isBefore } from "date-fns";

import { Link, FadeIn } from "@/design-system/ui";
import { useMermaid } from "@/features/mdx/plugins/mermaid/useMermaid";
import { useTwitter } from "@/features/mdx/useTwitter";
import { resolveWritingBody } from "@/features/writings/_models/bodyResolver";
import { SerializedWriting } from "@/features/writings/_models/types";

import { TOC } from "./TOC";
import { writingDetailStyles } from "./WritingDetail.css";
import { WritingHeader } from "./WritingHeader";
import { Note } from "./mdxParts/Note";
import { mdxParts } from "./mdxParts/index";

type WritingDetailProps = {
  writing: SerializedWriting;
};

const components = {
  ...mdxParts,
  a: (props: Parameters<typeof Link>[0]) => <Link colored {...props} />,
};

export const WritingDetail: React.FC<WritingDetailProps> = ({ writing }) => {
  useMermaid();
  useTwitter();
  const MDXComponent = resolveWritingBody(writing.body).data;
  const isOldWriting = (() => {
    // NOTE: diary の場合は古くても表示する必要はないと判断
    if (writing.head.type === "diary") return false;

    return isBefore(new Date(writing.head.published), addYears(new Date(), -1));
  })();

  return (
    <FadeIn>
      <article className={writingDetailStyles.root}>
        <div className={writingDetailStyles.headerWrapper}>
          <WritingHeader head={writing.head} />
        </div>
        <div className={writingDetailStyles.contentWrapper}>
          {isOldWriting ? (
            <Note variant="warn">
              この記事は古い内容である可能性があります。
            </Note>
          ) : null}
          <MDXComponent components={components} />
        </div>
        <aside className={writingDetailStyles.asideWrapper}>
          <div className={writingDetailStyles.stickyContainer}>
            <TOC />
          </div>
        </aside>
      </article>
    </FadeIn>
  );
};
