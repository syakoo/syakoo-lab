import { NextPage } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { PrivacyPolicy } from '@/components/templates/PrivacyPolicy'

// ___________
//
const PrivacyPolicyPage: NextPage = () => {
  return (
    <SingleLayout>
      <CustomHead url="/privacy-policy" title="プライバシーポリシー" noIndex />
      <PrivacyPolicy />
    </SingleLayout>
  )
}

export default PrivacyPolicyPage
