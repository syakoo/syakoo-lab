import type { MDXCustomTextPlugin } from "@/features/mdx/types";

import { markupLinkCardPlugin } from "./LinkCard/markupLinkCardPlugin";
import { markupSectionTitlePlugin } from "./SectionTitle/markupSectionTitlePlugin";

/**
 * プラグイン一覧
 *
 * NOTE: node のみで使用可能なため、コンポーネントとは別ファイルでまとめる必要があった
 */
export const mdxPlugins: MDXCustomTextPlugin[] = [
  markupLinkCardPlugin,
  markupSectionTitlePlugin,
];
