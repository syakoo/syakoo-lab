type MetaProps = {
  url: string;
  title: string;
  noIndex?: boolean;
};

export const Meta: React.FC<MetaProps> = ({ url, title, noIndex = false }) => {
  const toFullPath = (path: string) => `https://syakoo-lab.com${path}`;

  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta content="syakoo" name="author" />
      <meta content="syakoo の個人ブログ" name="description" />
      <link href="/logo.svg" rel="icon" type="image/svg+xml" />
      <meta content="width=device-width" name="viewport" />
      <meta content={toFullPath(url)} property="og:url" />
      <meta content={toFullPath("/logo.svg")} property="og:image" />
      <meta content="summary" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={toFullPath("/logo.svg")} name="twitter:image" />
      {noIndex ? <meta content="noindex" name="robots" /> : null}
    </>
  );
};
