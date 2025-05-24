import type { Metadata } from "next";

import { formatPageTitle } from "@/entities/page-title-formatter/formatter";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
import { Col, Container, Spacer } from "@/shared/design-system/layout";
import { H2, H3, P } from "@/shared/design-system/ui";
import { List } from "@/shared/design-system/ui/list";

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
        <H2>Terms of Use</H2>
        <P color="secondary" size="50">
          Last Updated: 2024/08/31
        </P>
        <Spacer y="300" />

        <Col gap="300">
          <section>
            <H3>1. サービスの利用</H3>
            <Spacer y="100" />
            <P>
              本サイトを利用するにあたり、ユーザーは以下の事項に同意するものとします：
            </P>
            <List>
              <List.Item>本サイトの利用は自己責任で行うこと</List.Item>
              <List.Item>不正アクセスや不正利用を行わないこと</List.Item>
              <List.Item>他のユーザーの権利を侵害しないこと</List.Item>
            </List>
          </section>
          <section>
            <H3>2. 禁止事項</H3>
            <Spacer y="100" />
            <P>ユーザーは以下の行為を行ってはいけません：</P>
            <List>
              <List.Item>違法行為や公序良俗に反する行為</List.Item>
              <List.Item>サービスの運営を妨害する行為</List.Item>
            </List>
          </section>
          <section>
            <H3>3. 免責事項</H3>
            <Spacer y="100" />
            <P>
              当ブログからのリンクやバナーなどで移動したサイトで提供される情報、
              サービス等について一切の責任を負いません。
            </P>
            <P>
              また当ブログのコンテンツ・情報について、
              できる限り正確な情報を提供するように努めておりますが、
              正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
              当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </P>
          </section>
          <section>
            <H3>4. 著作権・肖像権</H3>
            <Spacer y="100" />
            <P>
              当サイトの記事について、著作権は放棄しておりません。当サイトに存在する、文章・画像・動画等の著作物の情報を無断転載することを禁止します。
            </P>
            <P>
              また、当サイトは著作権の侵害を目的とするものではありません。使用している版権物の知的所有権はそれぞれの著作者・団体に帰属しております。著作権や肖像権に関して問題がありましたら御連絡下さい。著作権所有者様からの警告及び修正・撤去のご連絡があった場合は迅速に対処または削除致します。
            </P>
          </section>
          <section>
            <H3>5. 利用規約の変更</H3>
            <Spacer y="100" />
            <P>
              当サイトは、本利用規約の内容を適宜見直し、その改善に努めます。本利用規約は、事前の予告なく変更することがあります。本利用規約の変更は、当サイトに掲載された時点で有効になるものとします。
            </P>
          </section>
          <section>
            <H3>6. 準拠法と管轄裁判所</H3>
            <Spacer y="100" />
            <P>本規約の解釈および適用は、日本法に準拠するものとします。</P>
          </section>
        </Col>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default PrivacyPolicyPage;
