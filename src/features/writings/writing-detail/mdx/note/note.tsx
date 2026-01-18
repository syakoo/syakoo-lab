import { Icon } from "@/shared/design-system/icons/icon";
import { cn } from "@/shared/utils/cn/cn";

import styles from "./note.module.css";

type NoteProps = {
  children: React.ReactNode;
  variant?: "note" | "warn";
};

export const Note: React.FC<NoteProps> = ({ children, variant = "note" }) => {
  return (
    <aside
      className={cn(
        styles.wrapper,
        "mx-0 my-200 flex items-start gap-100 rounded-50 p-100",
        variant === "note" && "bg-accent-success-background",
        variant === "warn" && "bg-accent-warn-background",
      )}
    >
      <div
        className={cn(
          "flex w-[1.4rem] shrink-0",
          variant === "note" && "text-accent-success-foreground",
          variant === "warn" && "text-accent-warn-foreground",
        )}
      >
        <Icon name={variant === "note" ? "note" : "warn"} />
      </div>
      <div>{children}</div>
    </aside>
  );
};
