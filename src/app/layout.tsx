import type { Metadata } from "next";
import { Roboto, Fira_Code, Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";

import "@/shared/global-settings/global-settings";
import { GoogleAnalytics } from "@/shared/google-analytics";

const notoSansJP = Noto_Sans_JP({ weight: ["100", "700"], subsets: ["latin"] });
const roboto = Roboto({
  weight: "100",
  subsets: ["latin"],
});
const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syakoo Lab",
  metadataBase: new URL("https://syakoo-lab.com"),
  authors: {
    name: "syakoo",
  },
  description: "syakoo の個人ブログ",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    title: "Syakoo Lab",
    description: "syakoo の個人ブログ",
    url: "https://syakoo-lab.com",
    siteName: "Syakoo Lab",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Syakoo Lab Logo",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "Syakoo Lab",
    description: "syakoo の個人ブログ",
    images: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      // NOTE: あんま意味はないが良い方法も思いつかないので
      className={[
        notoSansJP.className,
        roboto.className,
        firaCode.className,
      ].join(" ")}
      lang="ja"
    >
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://syakoo-lab.com/#person",
                  name: "syakoo",
                  url: "https://syakoo-lab.com",
                  image: {
                    "@type": "ImageObject",
                    url: "https://github.com/syakoo.png",
                    width: 460,
                    height: 460,
                  },
                  sameAs: ["https://github.com/syakoo"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://syakoo-lab.com/#website",
                  url: "https://syakoo-lab.com",
                  name: "Syakoo Lab",
                  description: "syakoo の個人ブログ",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://syakoo-lab.com/logo.png",
                    width: 1200,
                    height: 1200,
                  },
                  publisher: {
                    "@id": "https://syakoo-lab.com/#person",
                  },
                  inLanguage: "ja",
                },
              ],
            }),
          }}
          type="application/ld+json"
        />
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body>{children}</body>
    </html>
  );
}
