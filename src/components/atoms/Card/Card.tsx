import React from 'react'

import styles from './styles.module.scss'

// ___________
//
interface CardProps {
  title?: string
}

// ___________
//
const Card: React.FC<CardProps> = ({ children, title }) => (
  <section className={styles.Card}>
    {title && <h2>{title}</h2>}
    <div>{children}</div>
  </section>
)

export default Card
