import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // AI クローラーには画像・アセットのみブロック
      {
        userAgent: [
          "GPTBot", // OpenAI
          "ChatGPT-User", // OpenAI (ChatGPT browsing)
          "Google-Extended", // Google AI
          "CCBot", // Common Crawl
          "anthropic-ai", // Anthropic
          "Claude-Web", // Anthropic
          "Bytespider", // ByteDance
          "cohere-ai", // Cohere
        ],
        disallow: ["/img/", "/assets/"],
      },
    ],
    sitemap: "https://syakoo-lab.com/sitemap.xml",
  };
};

// biome-ignore lint/style/noDefaultExport: デフォルトエクスポートを使用する
export default robots;
