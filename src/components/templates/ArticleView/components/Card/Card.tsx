import React from 'react'

import styles from './styles.module.scss'

// ___________
//
interface CardProps {
  type?: 'primary' | 'secondary' | 'caution' | 'problem' | 'note'
  children: string
}

// ___________
//
const Card: React.VFC<CardProps> = ({ type, children }) => {
  return (
    <div className={styles.card} data-type={type || 'primary'}>
      {children}
    </div>
  )
}

export default Card
