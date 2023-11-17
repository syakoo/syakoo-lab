import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { PageNotFound } from "@/components/PageNotFound";
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
