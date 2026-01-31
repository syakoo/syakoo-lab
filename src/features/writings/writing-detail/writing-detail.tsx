import { differenceInYears } from "date-fns";
import { notFound } from "next/navigation";
import { Spacer } from "../../../shared/design-system/layout/spacer/spacer";
import { FadeIn } from "../../../shared/design-system/ui/fade-in/fade-in";
import { readWritingById } from "../writing-reader/read-writing";

import { Note } from "./mdx/note/note";
import { TOC } from "./toc/toc";
import styles from "./writing-detail.module.css";
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
      <article className={`${styles.root} mx-auto max-w-[1500px]`}>
        <div className={`${styles.header} px-200 py-400`}>
          <WritingHeader head={writing.head} />
        </div>
        <div className={`${styles.contentArea} p-200`}>
          {/* NOTE: Diary の記事は古くても良い */}
          {writing.head.type !== "diary" && yearsSinceLastUpdate >= 1 ? (
            <Note variant="warn">
              この記事は最終更新日から{yearsSinceLastUpdate}年経過しています。
              内容が古い可能性があります。
            </Note>
          ) : null}
          <WritingMdxContent
            body={writing.body}
            className={styles.mdxContent}
          />
          <Spacer y="400" />
          <hr />
          <Spacer y="100" />
          <aside>
            <WritingTypeDescription type={writing.head.type} />
          </aside>
        </div>
        <aside className={`${styles.aside} flex h-full flex-col gap-200 p-200`}>
          <div className="sticky top-[calc(var(--spacing-200)+var(--size-header))]">
            <TOC />
          </div>
        </aside>
      </article>
    </FadeIn>
  );
};
