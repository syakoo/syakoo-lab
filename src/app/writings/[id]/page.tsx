import type { Metadata } from "next";

import { readWritingContents } from "@/contents/writings/reader";
import { formatPageTitle } from "@/entities/page-title/formatter";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
import { writingPaths } from "@/features/writings/config/paths";
import { RelatedWritingsNav } from "@/features/writings/related-writings-nav";
import { WritingDetail } from "@/features/writings/writing-detail";
import { Container, Spacer } from "@/shared/design-system/layout";

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
    openGraph: {
      type: "website",
      images: "/logo.png",
      url: writingPaths.detail(writingContent.frontMatter.id),
    },
  };
};

const WritingsContentPage = async ({ params }: Props) => {
  const relatedWritingNav = await RelatedWritingsNav({ id: params.id });

  return (
    <HeaderFooterTemplate>
      <main>
        <WritingDetail id={params.id} />
      </main>
      {relatedWritingNav ? (
        <>
          <Spacer y="500" />
          <Container center paddingX="200">
            {relatedWritingNav}
          </Container>
        </>
      ) : null}
      <Spacer y="400" />
    </HeaderFooterTemplate>
  );
};

export default WritingsContentPage;
