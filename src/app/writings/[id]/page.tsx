import { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { readWritingContents } from "@/contents/writings/reader";
import { Container, Spacer } from "@/design-system/layout";
import { serializeMDX } from "@/features/mdx/serializeMDX";
import { RelatedWritingsNav } from "@/features/writings/RelatedWritingsNav";
import { findRelatedWritingMetas } from "@/features/writings/RelatedWritingsNav/findRelatedWritingMetas";
import { WritingDetail } from "@/features/writings/WritingDetail";
import { Writing } from "@/features/writings/types";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";

export const generateStaticParams = async () => {
  const writingContents = await readWritingContents();

  return [
    ...writingContents.map(({ frontMatter }) => ({
      id: frontMatter.id,
    })),
  ];
};

type Props = {
  params: { id: string };
};
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === params.id,
  )!;

  return {
    title: formatPageTitle(writingContent.frontMatter.title),
    robots: {
      index: !writingContent.frontMatter.noindex,
    },
  };
};

const WritingsContentPage = async ({ params }: Props) => {
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === params.id,
  )!;

  const writing: Writing = {
    meta: resolveWritingMeta({ frontMatter: writingContent.frontMatter }),
    serializedBody: await serializeMDX(writingContent.body),
  };

  const relatedWritingMetas = await findRelatedWritingMetas(writing.meta.tags);

  return (
    <HeaderFooterTemplate>
      <main>
        <WritingDetail writing={writing} />
      </main>
      {relatedWritingMetas.length > 0 && (
        <>
          <Spacer y="500" />
          <Container center paddingX="200">
            <RelatedWritingsNav metas={relatedWritingMetas} />
          </Container>
        </>
      )}
      <Spacer y="400" />
    </HeaderFooterTemplate>
  );
};

export default WritingsContentPage;
