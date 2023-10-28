import type { Metadata } from "next";
import "ress";
import "@/globalStyle.css";
// TODO: next.js のフォント定義の形式に変更する
import "@fontsource-variable/noto-sans-jp";
import "@fontsource/roboto";
import "@fontsource-variable/fira-code";

export const metadata: Metadata = {
  title: "Syakoo Lab",
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
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
