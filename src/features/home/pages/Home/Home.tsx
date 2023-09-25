import "@/features/common/logics/globalSettings";
import { Center, Container } from "@/design-system/layout";
import { H2, Text } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { SyakooLabLogoWithAnimation } from "@/features/common/components/SyakooLabLogoWithAnimation";

export const Home: React.FC = () => {
  return (
    <HeaderFooterTemplate>
      <Center>
        <Container as="main" paddingTop="200" paddingX="200" size="100">
          <Center>
            <SyakooLabLogoWithAnimation height="140px" />
          </Center>
          <Text>このサイトは現在作成中です。</Text>
        </Container>
        <Container paddingTop="200" paddingX="200" size="100">
          <H2>About Me</H2>
          <Text>hi</Text>
        </Container>
      </Center>
    </HeaderFooterTemplate>
  );
};
