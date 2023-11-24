import { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
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
      <main>
        <WorkList />
      </main>
    </HeaderFooterTemplate>
  );
};

export default WorksPage;
