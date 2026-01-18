"use client";

import { useState } from "react";

import { cn } from "@/shared/utils/cn/cn";

import styles from "./choices.module.css";

type ChoiceProps = {
  variant?: "CORRECT" | "INCORRECT" | "UNSELECTED";
} & React.ComponentPropsWithoutRef<"button">;
type ChoicesProps = {
  children: readonly React.ReactElement<ChoiceProps>[];
  correct: number;
};

export const Choice: React.FC<ChoiceProps> = ({ variant, ...otherProps }) => {
  return (
    <button
      className={cn(
        styles.button,
        "block min-h-icon-sm w-full rounded-300 border border-background-secondary bg-background-primary px-100 py-50 text-current",
        "hover:not-disabled:cursor-pointer hover:not-disabled:border-brand-primary hover:not-disabled:bg-background-secondary",
        variant === "CORRECT" &&
          "border-accent-success-foreground bg-accent-success-background",
        variant === "INCORRECT" &&
          "border-accent-error-foreground bg-accent-error-background",
        variant === "UNSELECTED" && "border-background-secondary",
      )}
      {...otherProps}
    />
  );
};

export const Choices: React.FC<ChoicesProps> = ({ children, correct }) => {
  const [selected, setSelected] = useState<null | number>(null);

  const handleClickButton = (index: number) => {
    setSelected(index);
  };

  return (
    <div className="my-200 flex flex-col gap-200">
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
