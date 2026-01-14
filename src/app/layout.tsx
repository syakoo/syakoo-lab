import type { Metadata } from "next";
import { Roboto, Fira_Code, Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";

import "@/shared/global-settings/global-settings";
import { siteConfig } from "@/shared/config/site";
import { GoogleAnalytics } from "@/shared/google-analytics/google-analytics";

const notoSansJP = Noto_Sans_JP({ weight: ["100", "700"], subsets: ["latin"] });
const roboto = Roboto({
  weight: "100",
  subsets: ["latin"],
});
const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  authors: {
    name: siteConfig.author.name,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.logo.url,
    apple: siteConfig.logo.url,
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo.url,
        width: siteConfig.logo.width,
        height: siteConfig.logo.height,
        alt: siteConfig.logo.alt,
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    images: siteConfig.logo.url,
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
                  "@id": `${siteConfig.url}/#person`,
                  name: siteConfig.author.name,
                  url: siteConfig.author.url,
                  image: {
                    "@type": "ImageObject",
                    url: siteConfig.author.image,
                    width: 460,
                    height: 460,
                  },
                  sameAs: [siteConfig.social.github],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}/#website`,
                  url: siteConfig.url,
                  name: siteConfig.name,
                  description: siteConfig.description,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteConfig.url}${siteConfig.logo.url}`,
                    width: siteConfig.logo.width,
                    height: siteConfig.logo.height,
                  },
                  publisher: {
                    "@id": `${siteConfig.url}/#person`,
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
