import { env } from "env";

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}

export const gtagId = env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const isGAValid = () => {
  if (!gtagId) return false;
  return gtagId.startsWith("G-");
};

const pageViewEvent = (path: string) => {
  if (!isGAValid) return;

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", gtagId, {
      page_path: path,
    });
  }
};

export const ga = {
  pageViewEvent,
};
