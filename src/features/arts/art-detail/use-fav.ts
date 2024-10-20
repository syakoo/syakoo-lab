import { useState } from "react";

import { api } from "@/api/reaction-system";
import { convertArtIdToReactionId } from "@/features/arts/_shared/art-id-to-reaction-id";
import { useMount } from "@/utils/mount/use-mount";

type UseFavReturn = {
  fav: number | null;
  incrementFav: () => Promise<void>;
};

export const useFav = (id: string): UseFavReturn => {
  const [fav, setFav] = useState<number | null>(null);
  // 更新分の値
  const [incrementedValue, setIncrementedValue] = useState<number>(0);

  useMount(() => {
    void (async () => {
      const result = await api.getReaction(convertArtIdToReactionId(id));
      setFav(result.likes);
    })();
  });

  const incrementFav = async () => {
    setIncrementedValue(1);
    await api.postReactionIncrement(convertArtIdToReactionId(id), {
      likes: 1,
    });
  };

  const resolvedFav = (() => {
    if (fav === null) return null;
    return fav + incrementedValue;
  })();

  return { fav: resolvedFav, incrementFav };
};
