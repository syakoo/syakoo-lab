import { PolymorphicComponent } from "@/shared/utils/polymorphic-component/polymorphic-component";

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
      className="animate-fade-in opacity-0"
      style={{
        animationDuration: `${durationSec}s`,
        animationDelay: `${delaySec}s`,
      }}
    >
      {children}
    </PolymorphicComponent>
  );
};
