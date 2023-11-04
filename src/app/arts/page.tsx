import { compareDesc } from "date-fns";
import { Metadata } from "next";
import { readArtContents } from "@/contents/arts/reader";
import { ArtsSection } from "@/features/arts/ArtsSection";
import { resolveArtMeta } from "@/features/arts/artContentResolver";
import { ArtMeta } from "@/features/arts/types";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/features/common/logics/pageTitle";

export const metadata: Metadata = {
  title: formatPageTitle("Arts"),
  robots: {
    index: false,
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
        <ArtsSection metas={artMetas} />
      </main>
    </HeaderFooterTemplate>
  );
};

export default ArtsPage;
