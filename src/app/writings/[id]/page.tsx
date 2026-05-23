import type { Metadata } from "next";

import { readWritingContents } from "../../../contents/writings/reader";
import { formatPageTitle } from "../../../entities/page-title";
import { writingPaths } from "../../../entities/writing";
import { HeaderFooterTemplate } from "../../../widgets/layout";
import { RelatedWritingsNav } from "../../../widgets/writings";
import { WritingDetail } from "../../../widgets/writings";
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
  params: Promise<{ id: string }>;
};
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );

  if (!writingContent) {
    throw new Error(`Writing not found: ${id}`);
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
  const { id } = await params;
  const relatedWritingNav = await RelatedWritingsNav({ id });

  return (
    <HeaderFooterTemplate>
      <main>
        <WritingDetail id={id} />
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
