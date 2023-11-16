import type { Metadata } from "next";
import "ress";
import "@/globalStyle.css";
import { Roboto, Fira_Code, Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";

import { GoogleAnalytics } from "@/features/_common/components/GoogleAnalytics";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });
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
  openGraph: {
    title: "Syakoo Lab",
    type: "website",
    images: "/icon.svg",
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
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body>{children}</body>
    </html>
  );
}
