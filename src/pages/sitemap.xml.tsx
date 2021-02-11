import { GetServerSidePropsContext } from 'next'

import { generateSitemapXML } from '@/logics/sitemap'

// ___________
//
const Page = () => null

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const siteMap = await generateSitemapXML()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(siteMap)

  return { props: {} }
}

export default Page
