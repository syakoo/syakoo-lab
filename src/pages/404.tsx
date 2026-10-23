import { Container } from "../shared/design-system/layout/container/container";
import { PageMeta } from "../shared/page-meta/page-meta";
import { HeaderFooterTemplate } from "../widgets/header-footer-template";
import { PageNotFound } from "../widgets/page-not-found";

const NotFoundPage = () => {
  return (
    <HeaderFooterTemplate>
      <PageMeta noindex />
      <Container as="main" center paddingX="200" paddingY="500">
        <PageNotFound />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default NotFoundPage;
