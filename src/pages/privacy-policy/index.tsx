import { NextPage } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { PrivacyPolicy } from '@/components/templates/PrivacyPolicy'

// ___________
//
const PrivacyPolicyPage: NextPage = () => {
  return (
    <SingleLayout>
      <PrivacyPolicy />
    </SingleLayout>
  )
}

export default PrivacyPolicyPage
