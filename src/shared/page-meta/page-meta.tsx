import { siteConfig } from "../config/site";

type PageMetaProps = {
  title?: string;
  /** サイトルートからの絶対パス */
  path?: string;
  /** サイトルートからの絶対パス */
  image?: string;
  noindex?: boolean;
};

const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

/**
 * ページごとの `<head>` メタデータ
 *
 * React 19 が `<title>` / `<meta>` を `<head>` へ巻き上げる。
 */
export const PageMeta: React.FC<PageMetaProps> = ({
  title = siteConfig.name,
  path = "/",
  image = siteConfig.logo.url,
  noindex = false,
}) => {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <>
      <title>{title}</title>
      <meta content={siteConfig.description} name="description" />
      {noindex ? <meta content="noindex" name="robots" /> : null}
      <meta content="website" property="og:type" />
      <meta content={title} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={url} property="og:url" />
      <meta content={siteConfig.name} property="og:site_name" />
      <meta content={imageUrl} property="og:image" />
      <meta content="ja_JP" property="og:locale" />
      <meta content="summary" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={siteConfig.description} name="twitter:description" />
      <meta content={imageUrl} name="twitter:image" />
    </>
  );
};
