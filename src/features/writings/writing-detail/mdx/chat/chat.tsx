import type { RecipeVariants } from "@vanilla-extract/recipes";
import Image from "next/image";

import fuyu1 from "./assets/fuyu1.png";
import fuyu2 from "./assets/fuyu2.png";
import fuyu3 from "./assets/fuyu3.png";
import fuyu4 from "./assets/fuyu4.png";
import haru1 from "./assets/haru1.png";
import haru2 from "./assets/haru2.png";
import haru3 from "./assets/haru3.png";
import haru4 from "./assets/haru4.png";
import haru5 from "./assets/haru5.png";
import { chatStyles } from "./chat.css";

const images = {
  fuyu1,
  fuyu2,
  fuyu3,
  fuyu4,
  haru1,
  haru2,
  haru3,
  haru4,
  haru5,
};

type ChatProps = {
  children: React.ReactNode;
  image: keyof typeof images;
} & RecipeVariants<typeof chatStyles.container>;

type ChatMessageProps = {
  children: React.ReactNode;
};

export const Chat: React.FC<ChatProps> = ({ children, image, right }) => {
  return (
    <div className={chatStyles.container({ right })}>
      <Image alt="" className={chatStyles.avatarImage} src={images[image]} />
      <div className={chatStyles.messageContainer({ right })}>{children}</div>
    </div>
  );
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ children }) => {
  return <div className={chatStyles.message}>{children}</div>;
};
