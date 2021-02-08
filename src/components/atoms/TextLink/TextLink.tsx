import React from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

// ___________
//
interface TextLinkProps {
  isSmall?: boolean
  href: string
}

// ___________
//
const TextLink: React.FC<TextLinkProps> = ({ children, href, isSmall }) => {
  return (
    <Link href={href}>
      <a className={styles.link} data-is-small={isSmall}>
        {children}
      </a>
    </Link>
  )
}

export default TextLink
