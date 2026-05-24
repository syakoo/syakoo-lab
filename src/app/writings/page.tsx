import type { Metadata } from "next";
import { Suspense } from "react";

import { formatPageTitle } from "../../entities/page-title";
import { writingPaths } from "../../entities/writing";
import { Container } from "../../shared/design-system/layout/container/container";
import { HeaderFooterTemplate } from "../../widgets/header-footer-template";
import { WritingList } from "../../widgets/writing-list";

export const metadata: Metadata = {
  title: formatPageTitle("Writings"),
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: writingPaths.list(),
  },
};

const WritingsPage = () => {
  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <Suspense>
          <WritingList />
        </Suspense>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
