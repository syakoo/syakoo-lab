"use client";
/* eslint-disable react/no-array-index-key */
import { useState } from "react";

import { choiceStyle, choicesStyle } from "./choices.css";

type ChoiceProps = {
  variant?: "CORRECT" | "INCORRECT" | "UNSELECTED";
} & React.ComponentPropsWithoutRef<"button">;
type ChoicesProps = {
  children: readonly React.ReactElement<ChoiceProps>[];
  correct: number;
};

export const Choice: React.FC<ChoiceProps> = ({ variant, ...otherProps }) => {
  return <button className={choiceStyle({ variant })} {...otherProps} />;
};

export const Choices: React.FC<ChoicesProps> = ({ children, correct }) => {
  const [selected, setSelected] = useState<null | number>(null);

  const handleClickButton = (index: number) => {
    setSelected(index);
  };

  return (
    <div className={choicesStyle}>
      {children.map((Child, i) => {
        if (selected === null) {
          return (
            <Choice
              // biome-ignore lint/suspicious/noArrayIndexKey: 抽象であり、頻繁に描画するものでもないため
              key={i}
              {...Child.props}
              onClick={() => handleClickButton(i)}
            />
          );
        }
        switch (i) {
          case correct:
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: 抽象であり、頻繁に描画するものでもないため
              <Choice key={i} {...Child.props} disabled variant="CORRECT" />
            );
          case selected:
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: 抽象であり、頻繁に描画するものでもないため
              <Choice key={i} {...Child.props} disabled variant="INCORRECT" />
            );
          default:
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: 抽象であり、頻繁に描画するものでもないため
              <Choice key={i} {...Child.props} disabled variant="UNSELECTED" />
            );
        }
      })}
    </div>
  );
};
