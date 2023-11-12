import { Metadata } from "next";

import { readArtContents } from "@/contents/arts/reader";
import { HeaderFooterTemplate } from "@/features/_common/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/features/_common/logics/pageTitle";
import { ArtSection } from "@/features/arts/ArtSection";
import { resolveArtMeta } from "@/features/arts/artContentResolver";
import type { Art } from "@/features/arts/types";
import { serializeMDX } from "@/features/mdx/serializeMDX";

export const generateStaticParams = async () => {
  const artContents = await readArtContents();

  return [
    ...artContents.map(({ frontMatter }) => ({
      id: frontMatter.id,
    })),
  ];
};

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const artContent = (await readArtContents()).find(
    ({ frontMatter }) => frontMatter.id === params.id,
  )!;

  return {
    title: formatPageTitle(artContent.frontMatter.title),
    robots: {
      index: false,
    },
  };
};

const ArtsContentPage = async ({ params }: Props) => {
  const artContent = (await readArtContents()).find(
    ({ frontMatter }) => frontMatter.id === params.id,
  )!;

  const art: Art = {
    meta: resolveArtMeta({ frontMatter: artContent.frontMatter }),
    serializedBody: await serializeMDX(artContent.body),
  };

  return (
    <HeaderFooterTemplate>
      <main>
        <ArtSection art={art} />
      </main>
    </HeaderFooterTemplate>
  );
};

export default ArtsContentPage;
