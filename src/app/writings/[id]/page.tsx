import { readWritingContents } from "@/contents/writings/reader";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { serializeMDX } from "@/features/mdx/serializeMDX";
import { WritingViewer } from "@/features/writings/WritingViewer";
import { Writing } from "@/features/writings/types";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const writingContents = await readWritingContents();

  return [
    ...writingContents.map(({ frontMatter }) => ({
      id: frontMatter.id,
    })),
  ];
};

const WritingsContentPage = async ({ params }: { params: { id: string } }) => {
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === params.id,
  )!;

  const writing: Writing = {
    meta: resolveWritingMeta({ frontMatter: writingContent.frontMatter }),
    serializedBody: await serializeMDX(writingContent.body),
  };

  return (
    <HeaderFooterTemplate>
      <main>
        <WritingViewer writing={writing} />
      </main>
    </HeaderFooterTemplate>
  );
};

export default WritingsContentPage;
