import type { RecipeVariants } from "@vanilla-extract/recipes";

import { Icon } from "@/shared/design-system/icons/icon";

import { noteStyles } from "./note.css";

type NoteProps = {
  children: React.ReactNode;
} & Partial<RecipeVariants<typeof noteStyles.root>>;

export const Note: React.FC<NoteProps> = ({ children, variant = "note" }) => {
  return (
    <aside className={noteStyles.root({ variant })}>
      <div className={noteStyles.iconWrapper({ variant })}>
        <Icon name={variant === "note" ? "note" : "warn"} />
      </div>
      <div>{children}</div>
    </aside>
  );
};
