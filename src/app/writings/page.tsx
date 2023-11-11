import { compareDesc } from "date-fns";
import { Metadata } from "next";

import { readWritingContents } from "@/contents/writings/reader";
import { Container } from "@/design-system/layout";
import { HeaderFooterTemplate } from "@/features/_common/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/features/_common/logics/pageTitle";
import { WritingList } from "@/features/writings/WritingList";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";

export const metadata: Metadata = {
  title: formatPageTitle("Writings"),
  robots: {
    index: false,
  },
};

const WritingsPage = async () => {
  const metas = (await readWritingContents())
    .map(({ frontMatter }) => resolveWritingMeta({ frontMatter }))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );

  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingBottom="400" paddingX="200" size="100">
        <WritingList metas={metas} />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
