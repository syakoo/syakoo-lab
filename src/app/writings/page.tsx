import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import { Suspense } from "react";

import { readWritingContents } from "@/contents/writings/reader";
import { formatPageTitle } from "@/entities/page-title/formatter";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
import { resolveWritingHead } from "@/features/writings/_models/head-resolver";
import { writingPaths } from "@/features/writings/config/paths";
import { WritingList } from "@/features/writings/writing-list";
import { Container } from "@/shared/design-system/layout";

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
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <Suspense>
          <WritingList heads={metas} />
        </Suspense>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
