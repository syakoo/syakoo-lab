import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import { Suspense } from "react";

import { HeaderFooterTemplate } from "@/components/header-footer-template";
import { formatPageTitle } from "@/config/page-title";
import { readWritingContents } from "@/contents/writings/reader";
import { Container } from "@/design-system/layout";
import { resolveWritingHead } from "@/features/writings/_models/head-resolver";
import { writingPaths } from "@/features/writings/config/paths";
import { WritingList } from "@/features/writings/writing-list";

export const metadata: Metadata = {
  title: formatPageTitle("Writings"),
  robots: {
    index: false,
  },
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: writingPaths.list(),
  },
};

const WritingsPage = async () => {
  const metas = (await readWritingContents())
    .map(({ frontMatter }) => resolveWritingHead(frontMatter))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );

  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingBottom="400" paddingX="200" size="100">
        <Suspense>
          <WritingList heads={metas} />
        </Suspense>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
