"use client";

import { differenceInYears } from "date-fns";

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

  const yearsSinceLastUpdate = (() => {
    const writingUpdated = writing.head.updated ?? writing.head.published;
    return differenceInYears(new Date(), new Date(writingUpdated));
  })();

  return (
    <FadeIn>
      <article className={writingDetailStyles.root}>
        <div className={writingDetailStyles.headerWrapper}>
          <WritingHeader head={writing.head} />
        </div>
        <div className={writingDetailStyles.contentWrapper}>
          {/* NOTE: Diary の記事は古くても良い */}
          {writing.head.type !== "diary" && yearsSinceLastUpdate >= 1 ? (
            <Note variant="warn">
              この記事は最終更新日から{yearsSinceLastUpdate}年経過しています。
              内容が古い可能性があります。
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
