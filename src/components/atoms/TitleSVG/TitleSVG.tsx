import React from 'react'

import styles from './styles.module.scss'

// ___________
//
const TitleSVG: React.VFC = () => {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 330 65"
      style={{
        fontFamily:
          "Segoe UI, SegoeUI, 'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <g transform="translate(0, 50)">
        <text fontSize="50" transform="translate(0, 0)" fill="#454545">
          Syakoo&apos;
        </text>
        <text
          fontSize="50"
          transform="translate(195, 0) rotate(-20)"
          fill="#aaaaaa"
        >
          s
        </text>
        <text fontSize="50" transform="translate(240, 0)" fill="#294e80">
          Lab
        </text>
      </g>
    </svg>
  )
}

export default TitleSVG
