import { compareDesc } from "date-fns";
import type { Metadata } from "next";

import { formatPageTitle } from "@/config/page-title";
import { readArtContents } from "@/contents/arts/reader";
import { resolveArtHead } from "@/features/arts/_models/head-resolver";
import type { ArtHead } from "@/features/arts/_models/types";
import { ArtList } from "@/features/arts/art-list";
import { artPaths } from "@/features/arts/config/paths";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";

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
