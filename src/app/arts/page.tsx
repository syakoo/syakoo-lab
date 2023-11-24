import { compareDesc } from "date-fns";
import type { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { readArtContents } from "@/contents/arts/reader";
import { ArtList } from "@/features/arts/ArtList";
import { resolveArtHead } from "@/features/arts/_models/headResolver";
import type { ArtHead } from "@/features/arts/_models/types";
import { artPaths } from "@/features/arts/config/paths";

export const metadata: Metadata = {
  title: formatPageTitle("Arts"),
  robots: {
    index: false,
  },
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: artPaths.list(),
  },
};

const ArtsPage = async () => {
  const artMetas: ArtHead[] = (await readArtContents())
    .map(({ frontMatter }) => resolveArtHead(frontMatter))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );

  return (
    <HeaderFooterTemplate>
      <main>
        <ArtList heads={artMetas} />
      </main>
    </HeaderFooterTemplate>
  );
};

export default ArtsPage;
