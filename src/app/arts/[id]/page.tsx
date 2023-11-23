import { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { readArtContents } from "@/contents/arts/reader";
import { ArtDetail } from "@/features/arts/ArtDetail";
import { serializeArtBody } from "@/features/arts/models/bodySerializer";
import { resolveArtHead } from "@/features/arts/models/headResolver";
import { SerializedArt } from "@/features/arts/models/types";

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
      url: `/arts/${artContent.frontMatter.id}`,
    },
  };
};

const ArtsContentPage = async ({ params }: Props) => {
  const artContent = (await readArtContents()).find(
    ({ frontMatter }) => frontMatter.id === params.id,
  )!;

  const art: SerializedArt = {
    head: resolveArtHead(artContent.frontMatter),
    body: await serializeArtBody(artContent.body),
  };

  return (
    <HeaderFooterTemplate>
      <main>
        <ArtDetail art={art} />
      </main>
    </HeaderFooterTemplate>
  );
};

export default ArtsContentPage;
