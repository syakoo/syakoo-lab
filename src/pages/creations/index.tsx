import { creationPaths } from "../../entities/creation";
import { formatPageTitle } from "../../entities/page-title";
import { Container } from "../../shared/design-system/layout/container/container";
import { PageMeta } from "../../shared/page-meta/page-meta";
import { CreationList } from "../../widgets/creation-list";
import { HeaderFooterTemplate } from "../../widgets/header-footer-template";

const CreationsPage = () => {
  return (
    <HeaderFooterTemplate>
      <PageMeta
        image="/logo.png"
        path={creationPaths.list()}
        title={formatPageTitle("Creations")}
      />
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <CreationList />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default CreationsPage;
