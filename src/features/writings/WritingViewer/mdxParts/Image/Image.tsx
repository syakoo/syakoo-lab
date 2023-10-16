import { figureCaptionStyle, figureStyle } from "./Image.css";

type ImageProps = {
  caption?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ caption, ...imageProps }) => {
  return (
    <figure className={figureStyle}>
      <img alt={caption || ""} {...imageProps} />
      {caption ? (
        <figcaption className={figureCaptionStyle}>{caption}</figcaption>
      ) : null}
    </figure>
  );
};
