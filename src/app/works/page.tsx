import type { Metadata } from "next";

import { formatPageTitle } from "@/config/page-title";
import { workPaths } from "@/features/works/config/paths";
import { WorkList } from "@/features/works/work-list";
import { Container } from "@/shared/design-system/layout";

import { HeaderFooterTemplate } from "@/components/header-footer-template";

export const metadata: Metadata = {
  title: formatPageTitle("Works"),
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: workPaths.list(),
  },
};

const WorksPage = () => {
  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <WorkList />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WorksPage;
