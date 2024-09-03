import { HeaderFooterTemplate } from "@/components/header-footer-template";
import { PageNotFound } from "@/components/page-not-found";
import { Container } from "@/design-system/layout";

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
