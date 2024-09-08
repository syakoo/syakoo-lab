import { handleAPIFetchArtLikes } from "@/api/supabase/arts/fetch-art-likes.mocks";
import { handleAPIIncrementArtLikes } from "@/api/supabase/arts/increment-art-likes.mocks";

export const defaultHandlers = [
  handleAPIFetchArtLikes,
  handleAPIIncrementArtLikes,
];
