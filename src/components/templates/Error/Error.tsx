import React from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

// ___________
//
interface ErrorProps {
  errorCode: number
}

const errorData = [
  {
    code: 404,
    name: 'Not Found',
    message:
      'ページが見つかりませんでした。正しいURLかもう一度お確かめください。',
  },
  { code: 500, name: 'Internal Server Error' },
]

// ___________
//
const Error: React.VFC<ErrorProps> = ({ errorCode }) => {
  const errorInfo = errorData.find((e) => e.code === errorCode)

  return (
    <>
      <div className={styles.error}>
        <div className={styles.error_title}>
          <span className={styles.error_code}>{errorCode}</span>
          <div className={styles.error_name}>
            <span>{errorInfo ? errorInfo.name : ''}</span>
          </div>
        </div>
        <span className={styles.message}>
          {errorInfo ? errorInfo.message : ''}
        </span>
        <Link href="/">
          <a>Homeに戻る</a>
        </Link>
      </div>
    </>
  )
}

export default Error
