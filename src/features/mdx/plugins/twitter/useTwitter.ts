import { useEffect, useRef } from "react";

export const useTwitter = () => {
  const isLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isLoadedRef.current) {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      document.body.appendChild(s);
      isLoadedRef.current = true;
    }
  }, []);
};
