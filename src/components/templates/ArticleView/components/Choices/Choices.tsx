/* eslint-disable react/no-array-index-key */
import React, { Fragment, useState } from 'react'

import styles from './styles.module.scss'

// __________
//
type ChoicesProps = {
  children: readonly React.ReactElement<ChoiceProps>[]
  correct: number
}

type ChoiceProps = {
  mode?: 'CORRECT' | 'INCORRECT' | 'UNSELECTED'
  onClick?: () => void
}

// __________
//
export const Choices: React.VFC<ChoicesProps> = ({ children, correct }) => {
  const [selected, setSelected] = useState<null | number>(null)

  return (
    <div>
      {children.map((Child, i) => {
        if (selected === null) {
          return (
            <Fragment key={i}>
              {React.cloneElement(Child, { onClick: () => setSelected(i) })}
            </Fragment>
          )
        }
        switch (i) {
          case correct:
            return (
              <Fragment key={i}>
                {React.cloneElement(Child, { mode: 'CORRECT' })}
              </Fragment>
            )
          case selected:
            return (
              <Fragment key={i}>
                {React.cloneElement(Child, { mode: 'INCORRECT' })}
              </Fragment>
            )
          default:
            return (
              <Fragment key={i}>
                {React.cloneElement(Child, { mode: 'UNSELECTED' })}
              </Fragment>
            )
        }
      })}
    </div>
  )
}

// ___________
//
export const Choice: React.FC<ChoiceProps> = ({ children, mode, onClick }) => (
  <button
    type="button"
    className={styles.Choice}
    data-mode={mode}
    onClick={onClick}
    disabled={mode !== undefined}
  >
    {children}
  </button>
)
