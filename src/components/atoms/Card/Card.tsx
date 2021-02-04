import React from 'react'

import styles from './styles.module.scss'

// ___________
//
interface CardProps {
  title?: string
  bgWhite?: boolean
}

// ___________
//
const Card: React.FC<CardProps> = ({ children, title, bgWhite }) => (
  <section className={styles.Card} data-bg-white={bgWhite}>
    {title && <h2>{title}</h2>}
    <div className={styles.body}>{children}</div>
  </section>
)

export default Card
