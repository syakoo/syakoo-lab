import React, { useCallback, useState } from 'react'

import { HeartSVG } from '@/components/atoms/HeartSVG'

import styles from './styles.module.scss'

// ___________
//
interface HeartBtnProps {
  activeEvent: () => void
}

// ___________
//
const HeartBtn: React.VFC<HeartBtnProps> = ({ activeEvent }) => {
  const [isActived, setIsActived] = useState(false)
  const onClick = useCallback(() => {
    if (isActived) return
    activeEvent()
    setIsActived(true)
  }, [activeEvent, isActived, setIsActived])

  return (
    <button
      type="button"
      className={styles.HeartBtn}
      onClick={onClick}
      data-is-actived={isActived || undefined}
    >
      <HeartSVG />
    </button>
  )
}

export default React.memo(HeartBtn)
