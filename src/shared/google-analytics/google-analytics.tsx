"use client";

import { useEffect, useRef } from "react";

import { usePathname, useSearchParams } from "../router/router";
import { buildPageUrl, ga, gtagId, isGAValid } from "./core";

export const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFirstRender = useRef(true);

  useEffect(() => {
    // The init script's config call already sends the first page_view.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isGAValid()) return;

    ga.pageViewEvent(buildPageUrl(pathname, searchParams.toString()));
  }, [pathname, searchParams]);

  if (!isGAValid()) return null;

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
            page_path: window.location.pathname + window.location.search,
          });
        `,
        }}
        id="gtag-init"
      />
    </>
  );
};
