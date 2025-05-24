import { useState } from "react";

import { Icon } from "@/design-system/icons";
import { range } from "@/shared/utils/array/range";

import { heartButtonStyles } from "./heart-button.css";

type HeartButtonProps = {
  onClick: () => void;
  initialValue?: boolean;
};

export const HeartButton: React.FC<HeartButtonProps> = ({
  initialValue = false,
  onClick,
}) => {
  const [value, setValue] = useState(initialValue);
  const isAnimation = !initialValue;

  const handleClick = () => {
    if (value) return;
    onClick();
    setValue(true);
  };

  return (
    <button
      aria-label="heart button"
      className={heartButtonStyles.root}
      disabled={value}
      onClick={handleClick}
      type="button"
    >
      {isAnimation && value ? (
        <div className={heartButtonStyles.animationCircleContainer}>
          {[...range(0, 6)].map((i) => (
            <div
              key={i}
              className={heartButtonStyles.animationCircle({
                index: i,
              })}
            />
          ))}
        </div>
      ) : null}
      <div
        className={heartButtonStyles.iconWrapper({
          animationFired: isAnimation && value,
        })}
      >
        <Icon fill={value ? "currentColor" : "none"} name="heart" />
      </div>
    </button>
  );
};
