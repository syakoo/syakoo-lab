import { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { Container } from "@/design-system/layout";
import { WorkList } from "@/features/works/WorkList";
import { workPaths } from "@/features/works/config/paths";

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
