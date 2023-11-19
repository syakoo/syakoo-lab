import { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { WorkList } from "@/features/works/WorkList";

export const metadata: Metadata = {
  title: formatPageTitle("Works"),
  openGraph: {
    url: `/works`,
  },
};

const WorksPage = () => {
  return (
    <HeaderFooterTemplate>
      <main>
        <WorkList />
      </main>
    </HeaderFooterTemplate>
  );
};

export default WorksPage;
