import { PolymorphicComponent } from "@/shared/utils/polymorphic-component";

import { fadeInStyle } from "./fade-in.css";

type FadeInProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  durationSec?: number;
  delaySec?: number;
};

/**
 * 下からフェードインするアニメーションを提供するラッパーコンポーネント
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  as = "div",
  durationSec = 0.5,
  delaySec = 0,
}) => {
  return (
    <PolymorphicComponent
      as={as}
      className={fadeInStyle}
      style={{
        animationDuration: `${durationSec}s`,
        animationDelay: `${delaySec}s`,
      }}
    >
      {children}
    </PolymorphicComponent>
  );
};
