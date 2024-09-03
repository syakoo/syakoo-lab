import type { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/header-footer-template";
import { formatPageTitle } from "@/config/page-title";
import { Container } from "@/design-system/layout";
import { workPaths } from "@/features/works/config/paths";
import { WorkList } from "@/features/works/work-list";

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
      <Container as="main" center paddingBottom="400" paddingX="200" size="100">
        <WorkList />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WorksPage;
