import { compareDesc } from "date-fns";
import { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { readArtContents } from "@/contents/arts/reader";
import { ArtList } from "@/features/arts/ArtList";
import { resolveArtMeta } from "@/features/arts/artContentResolver";
import { ArtMeta } from "@/features/arts/types";

export const metadata: Metadata = {
  title: formatPageTitle("Arts"),
  robots: {
    index: false,
  },
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: `/arts`,
  },
};

const ArtsPage = async () => {
  const artMetas: ArtMeta[] = (await readArtContents())
    .map(({ frontMatter }) => resolveArtMeta({ frontMatter }))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );

  return (
    <HeaderFooterTemplate>
      <main>
        <ArtList metas={artMetas} />
      </main>
    </HeaderFooterTemplate>
  );
};

export default ArtsPage;
