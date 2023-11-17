import { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { WorksSection } from "@/features/works/WorksSection";

export const metadata: Metadata = {
  title: formatPageTitle("Works"),
};

const WorksPage = () => {
  return (
    <HeaderFooterTemplate>
      <main>
        <WorksSection />
      </main>
    </HeaderFooterTemplate>
  );
};

export default WorksPage;
