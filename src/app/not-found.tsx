import { Container } from "@/shared/design-system/layout";

import { HeaderFooterTemplate } from "@/components/header-footer-template";
import { PageNotFound } from "@/components/page-not-found";

const NotFoundPage = () => {
  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingX="200" paddingY="500">
        <PageNotFound />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default NotFoundPage;
