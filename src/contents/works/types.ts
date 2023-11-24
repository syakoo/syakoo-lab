import { StaticImageData } from "next/image";

export type Work = {
  name: string;
  imageSrc: StaticImageData;
  releasedAt: string;
  siteUrl: string;
  repositoryUrl: string;
  description: React.ReactNode;
};
