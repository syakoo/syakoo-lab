import { readWritingContents } from "@/contents/writings/reader";
import { Container } from "@/design-system/layout";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { WritingList } from "@/features/writings/WritingList";
import { WritingListType } from "@/features/writings/WritingList/_shared/writingListType";
import { writingTypeConfig } from "@/features/writings/_shared/writingType";
import { WritingType } from "@/features/writings/types";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";

// TODO: 今下を入れると /writings の時も 404 になるのでなんとかする
// export const dynamicParams = false;

export const generateStaticParams = () => {
  return [
    {},
    ...writingTypeConfig.map(({ type }) => ({
      types: [type],
    })),
  ];
};

const WritingsPage = async ({
  params,
}: {
  params: { types?: WritingType[] };
}) => {
  const type: WritingListType = params.types?.[0] ?? "all";
  const metas = (await readWritingContents()).map(({ frontMatter }) =>
    resolveWritingMeta({ frontMatter }),
  );

  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingBottom="400" paddingX="200" size="100">
        <WritingList metas={metas} type={type} />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
