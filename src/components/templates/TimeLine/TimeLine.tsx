import React from 'react'

import { Card } from '@/components/atoms/Card'
import type { AboutMeInfo } from '@/types'

// import styles from './styles.module.scss'

// ___________
//
interface TimeLineProps {
  timeline: AboutMeInfo['timeline']
}

// ___________
//
const TimeLine: React.VFC<TimeLineProps> = ({ timeline }) => {
  return (
    <Card title="TimeLine">
      {Object.keys(timeline).map((key) => (
        <div key={key}>
          <h3>{key}</h3>
          <ul>
            {timeline[key].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </Card>
  )
}

export default TimeLine
