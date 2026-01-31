import { Center } from "../../../../shared/design-system/layout/center/center";
import { Container } from "../../../../shared/design-system/layout/container/container";
import { Row } from "../../../../shared/design-system/layout/flex/flex";
import { Link } from "../../../../shared/design-system/ui/link/link";
import { Text } from "../../../../shared/design-system/ui/text/text";

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
          <nav>
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
