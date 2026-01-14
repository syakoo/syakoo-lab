import { Chat as ChatComponent, ChatMessage } from "./chat";

type Chat = typeof ChatComponent & {
  Message: typeof ChatMessage;
};

export const Chat = ChatComponent as Chat;
Chat.Message = ChatMessage;
Chat.Message.displayName = "Chat.Message";
