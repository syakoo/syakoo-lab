import Image from "next/image";

import { cn } from "@/shared/utils/cn/cn";
import fuyu1 from "./assets/fuyu1.png";
import fuyu2 from "./assets/fuyu2.png";
import fuyu3 from "./assets/fuyu3.png";
import fuyu4 from "./assets/fuyu4.png";
import haru1 from "./assets/haru1.png";
import haru2 from "./assets/haru2.png";
import haru3 from "./assets/haru3.png";
import haru4 from "./assets/haru4.png";
import haru5 from "./assets/haru5.png";
import styles from "./chat.module.css";

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
  right?: boolean;
};

type ChatMessageProps = {
  children: React.ReactNode;
};

export const Chat: React.FC<ChatProps> = ({ children, image, right }) => {
  return (
    <div
      className={cn(
        "my-200 flex max-w-[calc(90%-46px)] gap-100",
        right && "ml-auto flex-row-reverse",
      )}
    >
      <Image alt="" className="size-[42px] rounded-1000" src={images[image]} />
      <div
        className={cn(
          "flex flex-col items-start gap-100",
          right && "items-end",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ children }) => {
  return (
    <div
      className={`${styles.message} rounded-200 bg-background-secondary p-100`}
    >
      {children}
    </div>
  );
};
