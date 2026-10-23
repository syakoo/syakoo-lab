import { Suspense } from "react";

import { formatPageTitle } from "../../entities/page-title";
import { writingPaths } from "../../entities/writing";
import { Container } from "../../shared/design-system/layout/container/container";
import { PageMeta } from "../../shared/page-meta/page-meta";
import { HeaderFooterTemplate } from "../../widgets/header-footer-template";
import { WritingList } from "../../widgets/writing-list";

const WritingsPage = () => {
  return (
    <HeaderFooterTemplate>
      <PageMeta
        image="/logo.png"
        path={writingPaths.list()}
        title={formatPageTitle("Writings")}
      />
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <Suspense>
          <WritingList />
        </Suspense>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default WritingsPage;
