import { handleAPIGetReaction } from "@/api/reaction-system/get-reaction.mocks";
import { handleAPIPostReactionIncrement } from "@/api/reaction-system/post-reaction-increment.mocks";

export const defaultHandlers = [
  handleAPIGetReaction,
  handleAPIPostReactionIncrement,
];
