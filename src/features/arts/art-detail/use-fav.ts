import { useState } from "react";

import { api } from "@/api/supabase";
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
      const result = await api.fetchArtLikes(id);
      setFav(result.likes);
    })();
  });

  const incrementFav = async () => {
    setIncrementedValue(1);
    await api.incrementArtLikes(id);
  };

  const resolvedFav = (() => {
    if (fav === null) return null;
    return fav + incrementedValue;
  })();

  return { fav: resolvedFav, incrementFav };
};
