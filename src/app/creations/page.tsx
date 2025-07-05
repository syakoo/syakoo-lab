import type { Metadata } from "next";

import { creationPaths } from "@/entities/creation/paths";
import { formatPageTitle } from "@/entities/page-title/formatter";
import { CreationList } from "@/features/creation/creation-list";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
import { Container } from "@/shared/design-system/layout";

export const metadata: Metadata = {
  title: formatPageTitle("Creations"),
  robots: {
    index: false,
  },
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: creationPaths.list(),
  },
};

const CreationsPage = () => {
  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <CreationList />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default CreationsPage;
