import { readWritingContents } from "../../contents/writings/reader";
import { formatPageTitle } from "../../entities/page-title";
import { writingPaths } from "../../entities/writing";
import { Container } from "../../shared/design-system/layout/container/container";
import { Spacer } from "../../shared/design-system/layout/spacer/spacer";
import { PageMeta } from "../../shared/page-meta/page-meta";
import { notFound } from "../../shared/router/not-found";
import { HeaderFooterTemplate } from "../../widgets/header-footer-template";
import { RelatedWritingsNav } from "../../widgets/related-writings-nav";
import { WritingDetail } from "../../widgets/writing-detail";

export const getConfig = async () => {
  const writingContents = await readWritingContents();

  return {
    render: "static",
    staticPaths: writingContents.map(({ frontMatter }) => frontMatter.id),
  } as const;
};

type Props = {
  id: string;
};

const WritingsContentPage = async ({ id }: Props) => {
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );

  if (!writingContent) {
    notFound();
  }

  const relatedWritingNav = await RelatedWritingsNav({ id });

  return (
    <HeaderFooterTemplate>
      <PageMeta
        image="/logo.png"
        noindex={writingContent.frontMatter.noindex}
        path={writingPaths.detail(writingContent.frontMatter.id)}
        title={formatPageTitle(writingContent.frontMatter.title)}
      />
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
