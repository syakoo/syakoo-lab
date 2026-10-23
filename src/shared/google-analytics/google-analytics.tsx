"use client";

import { useEffect } from "react";

import { usePathname, useSearchParams } from "../router/router";
import { ga, gtagId, isGAValid } from "./core";

export const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGAValid) return;

    const url = pathname + searchParams.toString();
    ga.pageViewEvent(url);
  }, [pathname, searchParams]);

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
      />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: gtag の初期化スクリプト
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}', {
            page_path: window.location.pathname,
          });
        `,
        }}
        id="gtag-init"
      />
    </>
  );
};
