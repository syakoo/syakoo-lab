import { compareDesc } from "date-fns";
import { Metadata } from "next";
import { Suspense } from "react";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { readWritingContents } from "@/contents/writings/reader";
import { Container } from "@/design-system/layout";
import { WritingList } from "@/features/writings/WritingList";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";

export const metadata: Metadata = {
  title: formatPageTitle("Writings"),
  robots: {
    index: false,
  },
  openGraph: {
    url: "/writings",
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
        <Suspense>
          <WritingList metas={metas} />
        </Suspense>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
