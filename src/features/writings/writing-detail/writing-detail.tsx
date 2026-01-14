import { differenceInYears } from "date-fns";
import { notFound } from "next/navigation";

import { readWritingById } from "@/features/writings/writing-reader/read-writing";
import { Spacer } from "@/shared/design-system/layout/spacer/spacer";
import { FadeIn } from "@/shared/design-system/ui/fade-in/fade-in";

import { Note } from "./mdx/note/note";
import { TOC } from "./toc/toc";
import { writingDetailStyles } from "./writing-detail.css";
import { WritingHeader } from "./writing-header/writing-header";
import { WritingMdxContent } from "./writing-mdx-content";
import { WritingTypeDescription } from "./writing-type-description/writing-type-description";

type WritingDetailProps = {
  id: string;
};

export const WritingDetail = async ({ id }: WritingDetailProps) => {
  const writing = await readWritingById(id);
  if (!writing) return notFound();

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
          <WritingMdxContent body={writing.body} />
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
