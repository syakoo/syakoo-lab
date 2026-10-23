import { Suspense } from "react";

import "../shared/global-settings/global-settings";
import { siteConfig } from "../shared/config/site";
import { GoogleAnalytics } from "../shared/google-analytics/google-analytics";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link href="/icon.svg" rel="icon" type="image/svg+xml" />
        <link href={siteConfig.logo.url} rel="apple-touch-icon" />
        <link
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          rel="stylesheet"
        />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
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
