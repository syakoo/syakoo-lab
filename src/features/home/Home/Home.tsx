import { Center, Col } from "@/design-system/layout";
import { Text } from "@/design-system/ui";
import { SyakooLabLogoWithAnimation } from "@/features/_common/components/SyakooLabLogoWithAnimation";

export const Home: React.FC = () => {
  return (
    <Col gap="200">
      <Center>
        <SyakooLabLogoWithAnimation height="140px" />
      </Center>
      <Center>
        <Text>
          このサイトは syakoo 個人のサイトです。
          作成したアプリやイラスト、記事を公開しています。
        </Text>
      </Center>
    </Col>
  );
};
