import type { Metadata } from "next";

import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/config/pageTitle";
import { Col, Container, Spacer } from "@/design-system/layout";
import { H2, H3, Link, P } from "@/design-system/ui";

export const metadata: Metadata = {
  title: formatPageTitle("Privacy Policy"),
  robots: {
    index: false,
  },
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: `/privacy-policy`,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <H2>Privacy Policy</H2>
        <P color="secondary" size="50">
          Last Updated: 2024/08/31
        </P>
        <Spacer y="300" />

        <Col gap="300">
          <section>
            <H3>1. アクセス解析ツールについて</H3>
            <Spacer y="100" />
            <P>
              当サイトでは、Google によるアクセス解析ツール「Google
              アナリティクス」を使用しています。この Google
              アナリティクスはデータの収集のために Cookie
              を使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
              この機能は Cookie
              を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
              <Link
                colored
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              >
                Google アナリティクスサービス利用規約
              </Link>
              のページや
              <Link
                colored
                href="https://policies.google.com/technologies/ads?hl=ja"
              >
                Google ポリシーと規約ページ
              </Link>
              をご覧ください。
            </P>
          </section>
          <section>
            <H3>2. 本プライバシーポリシーの変更</H3>
            <Spacer y="100" />
            <P>
              当サイトは、本プライバシーポリシーの内容を適宜見直し、その改善に努めます。
              本プライバシーポリシーは、事前の予告なく変更することがあります。
              本プライバシーポリシーの変更は、当サイトに掲載された時点で有効になるものとします。
            </P>
          </section>
        </Col>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default PrivacyPolicyPage;
