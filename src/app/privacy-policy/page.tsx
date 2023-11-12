import type { Metadata } from "next";

import { Col, Container, Spacer } from "@/design-system/layout";
import { H2, H3, Link, P } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/_common/components/HeaderFooterTemplate";
import { formatPageTitle } from "@/features/_common/logics/pageTitle";

export const metadata: Metadata = {
  title: formatPageTitle("Privacy Policy"),
  robots: {
    index: false,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <H2>Privacy Policy</H2>
        <P color="secondary" size="50">
          Effective as of February 19, 2023
        </P>
        <Spacer y="300" />

        <Col gap="300">
          <section>
            <H3>アクセス解析ツールについて</H3>
            <Spacer y="100" />
            <P>
              当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
              このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
              トラフィックデータは匿名で収集されており、個人を特定するものではありません。
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
              <Link
                colored
                href="https://policies.google.com/technologies/partner-sites"
              >
                こちら
              </Link>
              をクリックしてください。
            </P>
          </section>
          <section>
            <H3>免責事項</H3>
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
            <H3>著作権・肖像権</H3>
            <Spacer y="100" />
            <P>
              当サイトの記事について、著作権は放棄しておりません。当サイトに存在する、文章・画像・動画等の著作物の情報を無断転載することを禁止します。
            </P>
            <P>
              また、当サイトは著作権の侵害を目的とするものではありません。使用している版権物の知的所有権はそれぞれの著作者・団体に帰属しております。著作権や肖像権に関して問題がありましたら御連絡下さい。著作権所有者様からの警告及び修正・撤去のご連絡があった場合は迅速に対処または削除致します。
            </P>
          </section>
          <section>
            <H3>本プライバシーポリシーの変更</H3>
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
