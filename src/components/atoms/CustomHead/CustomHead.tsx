import React from 'react'
import Head from 'next/head'

// ___________
//
interface CustomHeadProps {
  url: string
  title: string
  card?: 'summary_large_image' | 'summary'
  imgUrl?: string
  noIndex?: boolean
}

// ___________
//
const CustomHead: React.VFC<CustomHeadProps> = ({
  url,
  title,
  card,
  imgUrl,
  noIndex,
}) => {
  const toFullPath = (path: string) => `https://syakoo-lab.com${path}`
  return (
    <Head>
      <title>{`${title} - Syakoo's Lab`}</title>
      <meta charSet="utf-8" />
      <meta name="author" content="syakoo" />
      <meta name="description" content="syakooの個人ブログ" />
      <link rel="shortcut icon" href="/logo.ico" />
      <meta property="og:url" content={toFullPath(url)} />
      <meta
        property="og:image"
        content={imgUrl ? toFullPath(imgUrl) : toFullPath('/logo.png')}
      />
      <meta name="twitter:card" content={card || 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:image"
        content={imgUrl ? toFullPath(imgUrl) : toFullPath('/logo.png')}
      />
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  )
}

export default CustomHead
