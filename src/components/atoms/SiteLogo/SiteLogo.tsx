import React from 'react'

// import styles from './styles.module.scss'

// ___________
//
const SiteLogo: React.VFC = () => {
  return (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256" width="128">
      <rect
        x="10"
        y="10"
        width="236"
        height="236"
        fill="white"
        stroke="#294e80"
        strokeWidth="10"
        rx="5"
        ry="5"
      />
      <g transform="translate(20, 140)" style={{ fontFamily: 'sans-serif' }}>
        <text
          fontSize="200"
          transform="translate(25, 50)rotate(-20)"
          fill="#454545"
          fontWeight="bold"
          id="syakooLab-logo__S"
        >
          S
        </text>
        <text
          fontSize="140"
          transform="translate(125, 70)rotate(10)"
          fill="#294e80"
          fontWeight="bold"
        >
          b
        </text>
        <rect
          x="20"
          y="6"
          width="150"
          height="100"
          fill="#294e80"
          rx="5"
          ry="5"
        />
      </g>
    </svg>
  )
}

export default SiteLogo
