import type { Metadata } from "next";
import { Suspense } from "react";

import { formatPageTitle } from "@/entities/page-title/formatter";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
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
