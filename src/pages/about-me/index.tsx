import { NextPage, GetStaticProps } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { AboutMe } from '@/components/templates/AboutMe'
import { Certificates } from '@/components/templates/Certificates'
import { TimeLine } from '@/components/templates/TimeLine'
import { getAboutMeInfo, getAboutMeSource } from '@/logics/aboutme'
import type { AboutMeInfo, Source } from '@/types'

// ___________
//
type AboutMePageProps = {
  aboutmeInfo: AboutMeInfo
  descriptionSource: Source
}

// ___________
//
const AboutMePage: NextPage<AboutMePageProps> = ({
  aboutmeInfo,
  descriptionSource,
}) => (
  <SingleLayout>
    <CustomHead url="/about-me" title="About Me" />
    <AboutMe
      name={aboutmeInfo.name}
      imgUrl={aboutmeInfo.imgUrl}
      descriptionSource={descriptionSource}
      links={aboutmeInfo.links}
    />
    <Certificates certificates={aboutmeInfo.certificates} />
    <TimeLine timeline={aboutmeInfo.timeline} />
  </SingleLayout>
)

// ___________
//
export const getStaticProps: GetStaticProps<AboutMePageProps> = async () => {
  const info = await getAboutMeInfo()
  const source = await getAboutMeSource()

  return {
    props: {
      aboutmeInfo: info,
      descriptionSource: source,
    },
  }
}

export default AboutMePage
