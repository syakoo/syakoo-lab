"use client";

import { addYears, isBefore } from "date-fns";

import { Spacer } from "@/design-system/layout";
import { Link, FadeIn } from "@/design-system/ui";
import { useMermaid } from "@/features/mdx/plugins/mermaid/use-mermaid";
import { useTwitter } from "@/features/mdx/plugins/twitter/use-twitter";
import { resolveMDXContent } from "@/features/mdx/resolver";
import type { SerializedWriting } from "@/features/writings/_models/types";

import { mdxComponents } from "./mdx";
import { Note } from "./mdx/note";
import { TOC } from "./toc";
import { writingDetailStyles } from "./writing-detail.css";
import { WritingHeader } from "./writing-header";
import { WritingTypeDescription } from "./writing-type-description";

type WritingDetailProps = {
  writing: SerializedWriting;
};

const components = {
  ...mdxComponents,
  a: (props: Parameters<typeof Link>[0]) => <Link colored {...props} />,
};

export const WritingDetail: React.FC<WritingDetailProps> = ({ writing }) => {
  useMermaid();
  useTwitter();
  const MDXComponent = resolveMDXContent(writing.body).data;
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
          <Spacer y="400" />
          <hr />
          <Spacer y="100" />
          <aside>
            <WritingTypeDescription type={writing.head.type} />
          </aside>
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
