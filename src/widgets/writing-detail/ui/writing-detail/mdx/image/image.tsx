import {
  ImageLightboxRoot,
  ImageLightboxTrigger,
} from "../../../../../../shared/design-system/ui/image-lightbox/image-lightbox";

type ImageProps = {
  caption?: string;
  src?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">;

export const Image: React.FC<ImageProps> = ({ caption, ...imageProps }) => {
  const altText = caption || "";
  const src = imageProps.src || "";

  return (
    <figure className="mx-auto my-200 flex flex-col items-center gap-100">
      <ImageLightboxRoot alt={altText} src={src}>
        <ImageLightboxTrigger>
          <img
            alt={altText}
            className="rounded-50 bg-palette-gray-800 h-auto w-auto max-w-full"
            {...imageProps}
          />
        </ImageLightboxTrigger>
      </ImageLightboxRoot>
      {caption ? (
        <figcaption className="text-text-secondary text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
