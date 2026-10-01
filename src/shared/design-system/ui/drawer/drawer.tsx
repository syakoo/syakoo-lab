"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Icon } from "../../icons/icon";
import { Row } from "../../layout/flex/flex";
import { Text } from "../text/text";
import styles from "./drawer.module.css";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
};

const DrawerCloseContext = createContext<(() => void) | null>(null);

/** Close the surrounding Drawer with its exit animation. */
export const useDrawerClose = (): (() => void) => {
  const close = useContext(DrawerCloseContext);
  if (!close) {
    throw new Error("useDrawerClose must be used within Drawer");
  }
  return close;
};

/** Prefer #storybook-root in Storybook so VRT blank-check sees portaled UI. */
export const getOverlayPortalContainer = (): HTMLElement =>
  document.getElementById("storybook-root") ?? document.body;

/**
 * Non-modal bottom sheet. Portaled so position:fixed stays viewport-relative
 * under transformed ancestors. The page behind stays interactive.
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync open → visible. Do not depend on isClosing: resetting it here while
  // open is still true would cancel requestClose from the X button.
  useEffect(() => {
    if (open) {
      setIsClosing(false);
      setVisible(true);
    } else if (visible) {
      setIsClosing(true);
    }
  }, [open, visible]);

  const finishClose = useCallback(() => {
    setVisible(false);
    setIsClosing(false);
    onClose();
  }, [onClose]);

  const requestClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  // animation: none under prefers-reduced-motion — animationend never fires.
  useEffect(() => {
    if (!isClosing) {
      return;
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    finishClose();
  }, [isClosing, finishClose]);

  useEffect(() => {
    if (!visible || isClosing) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible, isClosing, requestClose]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      if (!isClosing) {
        return;
      }
      finishClose();
    },
    [isClosing, finishClose],
  );

  if (!mounted || !visible) {
    return null;
  }

  return createPortal(
    <DrawerCloseContext.Provider value={requestClose}>
      <aside
        aria-labelledby={titleId}
        aria-modal="false"
        className={styles.sheet}
        data-closing={isClosing}
        onAnimationEnd={handleAnimationEnd}
        role="dialog"
      >
        <div className={styles.header}>
          <Row align="center" justify="spaceBetween">
            <div id={titleId}>
              {typeof title === "string" ? (
                <Text weight="bold">{title}</Text>
              ) : (
                title
              )}
            </div>
            <button
              aria-label="閉じる"
              className={styles.closeButton}
              onClick={requestClose}
              type="button"
            >
              <Icon height={20} name="x-mark" width={20} />
            </button>
          </Row>
        </div>
        {children}
      </aside>
    </DrawerCloseContext.Provider>,
    getOverlayPortalContainer(),
  );
};
