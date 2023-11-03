import { Metadata } from "next";
import { readWritingContents } from "@/contents/writings/reader";
import { Container } from "@/design-system/layout";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/features/common/logics/pageTitle";
import { WritingList } from "@/features/writings/WritingList";
import { WritingListType } from "@/features/writings/WritingList/_shared/writingListType";
import { WritingType } from "@/features/writings/types";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";

type Props = {
  searchParams: {
    type?: WritingType;
  };
};

export const metadata: Metadata = {
  title: formatPageTitle("Writings"),
  robots: {
    index: false,
  },
};

const WritingsPage = async ({ searchParams: { type } }: Props) => {
  const selectedWritingListType: WritingListType = type ?? "all";
  const metas = (await readWritingContents()).map(({ frontMatter }) =>
    resolveWritingMeta({ frontMatter }),
  );

  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingBottom="400" paddingX="200" size="100">
        <WritingList metas={metas} type={selectedWritingListType} />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
