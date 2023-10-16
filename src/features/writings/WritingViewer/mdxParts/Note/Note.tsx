import type { RecipeVariants } from "@vanilla-extract/recipes";
import { noteStyles } from "./Note.css";
import { Icon } from "@/features/icons";

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
