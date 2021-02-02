import React from 'react'

import styles from './styles.module.scss'

import { Card } from '@/components/atoms/Card'

// ___________
//
interface AboutMeProps {}

// ___________
//
const AboutMe: React.VFC<AboutMeProps> = () => {
  return <Card title="About Me">About Me</Card>
}

export default AboutMe
