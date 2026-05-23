import { PageNotFound } from "../entities/error-page";
import { Container } from "../shared/design-system/layout/container/container";
import { HeaderFooterTemplate } from "../widgets/layout";

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
