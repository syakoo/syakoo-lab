import { env } from "../../env";

export const gtagId = env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const isGAValid = () => {
  if (!gtagId) return false;
  return gtagId.startsWith("G-");
};

const pageViewEvent = (path: string) => {
  if (!isGAValid) return;

  window.gtag("config", gtagId, {
    page_path: path,
  });
};

export const ga = {
  pageViewEvent,
};
