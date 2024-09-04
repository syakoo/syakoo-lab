import { useMount } from "@/utils/mount/use-mount";

export const useTwitter = () => {
  useMount(() => {
    const s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(s);
  });
};
