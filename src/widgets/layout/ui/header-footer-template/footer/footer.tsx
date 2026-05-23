import { Center } from "../../../../shared";
import { Container } from "../../../../shared";
import { Row } from "../../../../shared";
import { Link } from "../../../../shared";
import { Text } from "../../../../shared";

export const Footer: React.FC = () => {
  return (
    <Center>
      <Container
        as="footer"
        paddingBottom="200"
        paddingTop="300"
        paddingX="200"
        size="200"
      >
        <Row align="center" justify="spaceBetween" wrap>
          <Text as="span" color="secondary">
            © 2021 syakoo
          </Text>
          <nav aria-label="フッターナビゲーション">
            <Row gap="200">
              <Link href="/">
                <Text as="span" color="secondary">
                  Home
                </Text>
              </Link>
              <Link href="/privacy-policy">
                <Text as="span" color="secondary">
                  Privacy Policy
                </Text>
              </Link>
              <Link href="/terms">
                <Text as="span" color="secondary">
                  Terms
                </Text>
              </Link>
            </Row>
          </nav>
        </Row>
      </Container>
    </Center>
  );
};
