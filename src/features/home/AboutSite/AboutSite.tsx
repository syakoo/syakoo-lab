import { Center, Col } from "@/design-system/layout";
import { Text } from "@/design-system/ui";

import { SyakooLabLogoWithAnimation } from "./SyakooLabLogoWithAnimation";

export const AboutSite: React.FC = () => {
  return (
    <Col gap="200">
      <Center>
        <SyakooLabLogoWithAnimation height="140px" />
      </Center>
      <Center>
        <Text as="p">
          このサイトは syakoo が運営している個人のウェブサイトです。
        </Text>
        <Text as="p">
          <Text as="span" weight="bold">
            「興味の広がり、深まり、発見」
          </Text>
          をモットーに、作成した文書やイラストを公開しています。
        </Text>
      </Center>
    </Col>
  );
};
