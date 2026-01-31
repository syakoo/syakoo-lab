import type { Metadata } from "next";

import { readWritingContents } from "../../../contents/writings/reader";
import { formatPageTitle } from "../../../entities/page-title/formatter";
import { writingPaths } from "../../../entities/writing/paths/writing-paths";
import { HeaderFooterTemplate } from "../../../features/layout/header-footer-template/header-footer-template";
import { RelatedWritingsNav } from "../../../features/writings/related-writings-nav/related-writings-nav";
import { WritingDetail } from "../../../features/writings/writing-detail/writing-detail";
import { Container } from "../../../shared/design-system/layout/container/container";
import { Spacer } from "../../../shared/design-system/layout/spacer/spacer";

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
  );

  if (!writingContent) {
    throw new Error(`Writing not found: ${params.id}`);
  }

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
