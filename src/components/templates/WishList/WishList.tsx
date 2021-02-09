import React from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

// ___________
//
const WishList: React.VFC = () => {
  return (
    <div className={styles.WishList}>
      <div className={styles.text}>￥餌付けされると喜びます／</div>
      <Link href="https://www.amazon.jp/hz/wishlist/ls/243ILCKUS790S?ref_=wl_share">
        <a>
          <button className={styles.btn} type="button">
            欲しいものリスト (Amazon)
          </button>
        </a>
      </Link>
    </div>
  )
}

export default WishList
