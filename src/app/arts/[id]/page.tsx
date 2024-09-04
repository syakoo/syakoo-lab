import type { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/header-footer-template";
import { formatPageTitle } from "@/config/page-title";
import { readArtContents } from "@/contents/arts/reader";
import { ArtDetail } from "@/features/arts/art-detail";
import { findArt } from "@/features/arts/art-detail/find-art";
import { artPaths } from "@/features/arts/config/paths";

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
    openGraph: {
      type: "website",
      images: "/logo.png",
      url: artPaths.detail(artContent.frontMatter.id),
    },
  };
};

const ArtsContentPage = async ({ params }: Props) => {
  const art = await findArt(params.id);

  return (
    <HeaderFooterTemplate>
      <main>
        <ArtDetail art={art} />
      </main>
    </HeaderFooterTemplate>
  );
};

export default ArtsContentPage;
