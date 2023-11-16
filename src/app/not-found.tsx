import { Container } from "@/design-system/layout";
import { HeaderFooterTemplate } from "@/features/_common/components/HeaderFooterTemplate";
import { PageNotFound } from "@/features/_common/components/PageNotFound";

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
