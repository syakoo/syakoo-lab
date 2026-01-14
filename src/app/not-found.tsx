import { PageNotFound } from "@/entities/error-page/page-not-found/page-not-found";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template/header-footer-template";
import { Container } from "@/shared/design-system/layout/container/container";

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
