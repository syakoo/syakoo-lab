import { readArtContents } from "@/contents/arts/reader";
import { ArtSection } from "@/features/arts/ArtSection";
import { resolveArtMeta } from "@/features/arts/artContentResolver";
import type { Art } from "@/features/arts/types";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { serializeMDX } from "@/features/mdx/serializeMDX";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const artContents = await readArtContents();

  return [
    ...artContents.map(({ frontMatter }) => ({
      id: frontMatter.id,
    })),
  ];
};

const ArtsContentPage = async ({ params }: { params: { id: string } }) => {
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
