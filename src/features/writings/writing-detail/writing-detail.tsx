import { differenceInYears } from "date-fns";

import type { SerializedWriting } from "@/features/writings/_models/types";
import { Spacer } from "@/shared/design-system/layout";
import { FadeIn } from "@/shared/design-system/ui";

import { Note } from "./mdx/note";
import { TOC } from "./toc";
import { writingDetailStyles } from "./writing-detail.css";
import { WritingHeader } from "./writing-header";
import { WritingMdxContent } from "./writing-mdx-content";
import { WritingTypeDescription } from "./writing-type-description";

type WritingDetailProps = {
  writing: SerializedWriting;
};

export const WritingDetail: React.FC<WritingDetailProps> = ({ writing }) => {
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
