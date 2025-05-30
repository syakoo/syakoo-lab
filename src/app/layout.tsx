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
  openGraph: {
    type: "website",
    images: "/logo.png",
    url: "/",
  },
  twitter: {
    card: "summary",
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
