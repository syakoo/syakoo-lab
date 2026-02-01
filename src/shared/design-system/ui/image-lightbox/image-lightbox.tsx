"use client";

import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../../utils/cn/cn";

import styles from "./image-lightbox.module.css";

// =============================================================================
// Context
// =============================================================================

type ImageLightboxContextValue = {
  triggerRef: React.RefObject<HTMLButtonElement>;
  dialogRef: React.RefObject<HTMLDialogElement>;
  open: () => void;
  src: string;
  alt: string;
};

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(
  null,
);

const useImageLightboxContext = () => {
  const ctx = useContext(ImageLightboxContext);
  if (!ctx) {
    throw new Error(
      "ImageLightbox components must be used within ImageLightbox.Root",
    );
  }
  return ctx;
};

// =============================================================================
// CSS変数を含むスタイル用の型
// =============================================================================

type LightboxCSSProperties = React.CSSProperties & {
  "--initial-x"?: string;
  "--initial-y"?: string;
  "--initial-scale"?: string;
};

// =============================================================================
// Root
// =============================================================================

type RootProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

export const ImageLightboxRoot: FC<RootProps> = ({ src, alt, children }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const open = useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
    }
    dialogRef.current?.showModal();
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      dialogRef.current?.close();
      setIsClosing(false);
    }
  }, [isClosing]);

  // ESC キーでの閉じるをキャンセルしてアニメーション付きで閉じる
  const handleCancel = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleClose();
    },
    [handleClose],
  );

  // 背景クリックで閉じる
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  // トリガー要素からの相対位置を計算（アニメーション用）
  const getInitialTransform = useCallback((): LightboxCSSProperties => {
    if (!triggerRect) return {};

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;

    return {
      "--initial-x": `${triggerCenterX - centerX}px`,
      "--initial-y": `${triggerCenterY - centerY}px`,
      "--initial-scale": `${
        triggerRect.width / Math.min(window.innerWidth * 0.9, 1200)
      }`,
    };
  }, [triggerRect]);

  const contextValue = useMemo(
    () => ({ triggerRef, dialogRef, open, src, alt }),
    [open, src, alt],
  );

  return (
    <ImageLightboxContext.Provider value={contextValue}>
      {children}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: ESCキーは onCancel で処理 */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        data-closing={isClosing}
        onCancel={handleCancel}
        onClick={handleBackdropClick}
      >
        <img
          alt={alt}
          className={styles.image}
          data-state={isClosing ? "closing" : "opening"}
          onAnimationEnd={handleAnimationEnd}
          src={src}
          style={getInitialTransform()}
        />
      </dialog>
    </ImageLightboxContext.Provider>
  );
};

// =============================================================================
// Trigger
// =============================================================================

type TriggerProps = {
  children: ReactNode;
  className?: string;
};

export const ImageLightboxTrigger: FC<TriggerProps> = ({
  children,
  className,
}) => {
  const { triggerRef, open } = useImageLightboxContext();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );

  useEffect(() => {
    // viewport 変更を検知して isMobile を更新
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // モバイルではライトボックス無効
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <button
      className={cn("cursor-zoom-in border-none bg-transparent p-0", className)}
      onClick={open}
      ref={triggerRef}
      type="button"
    >
      {children}
    </button>
  );
};
