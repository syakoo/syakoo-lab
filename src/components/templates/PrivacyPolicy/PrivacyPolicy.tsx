import React from 'react'

import { Card } from '@/components/atoms/Card'

// import styles from './styles.module.scss'

// ___________
//
const PrivacyPolicy: React.VFC = () => {
  return (
    <>
      <Card title="免責事項">
        <p>
          当ブログからのリンクやバナーなどで移動したサイトで提供される情報、
          サービス等について一切の責任を負いません。
        </p>
        <p>
          また当ブログのコンテンツ・情報について、
          できる限り正確な情報を提供するように努めておりますが、
          正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
        </p>
        <p>
          当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>
      </Card>
    </>
  )
}

export default PrivacyPolicy
