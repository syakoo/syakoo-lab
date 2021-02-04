import React from 'react'

import { Card } from '@/components/atoms/Card'
import type { AboutMeInfo } from '@/types'

// import styles from './styles.module.scss'

// ___________
//
interface CertificatesProps {
  certificates: AboutMeInfo['certificates']
}

// ___________
//
const Certificates: React.VFC<CertificatesProps> = ({ certificates }) => {
  return (
    <Card title="Certificates">
      <ul>
        {certificates.map((cert) => (
          <li key={cert}>{cert}</li>
        ))}
      </ul>
    </Card>
  )
}

export default Certificates
