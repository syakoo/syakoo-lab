import type { StaticImageData } from "next/image";

export type Work = {
  id: string;
  name: string;
  imageSrc: StaticImageData;
  releasedAt: string;
  siteUrl: string;
  repositoryUrl: string;
  description: React.ReactNode;
};
