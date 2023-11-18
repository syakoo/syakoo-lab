/* eslint-disable @next/next/no-img-element */
import { imageStyles } from "./Image.css";

type ImageProps = {
  caption?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ caption, ...imageProps }) => {
  return (
    <figure className={imageStyles.figure}>
      <img alt={caption || ""} className={imageStyles.image} {...imageProps} />
      {caption ? (
        <figcaption className={imageStyles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
};
