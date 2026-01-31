import {
  ImageLightboxRoot,
  ImageLightboxTrigger,
} from "../../../../../shared/design-system/ui/image-lightbox/image-lightbox";

type ImageProps = {
  caption?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ caption, ...imageProps }) => {
  const altText = caption || "";
  const src = imageProps.src || "";

  return (
    <figure className="mx-auto my-200 flex flex-col items-center gap-100">
      <ImageLightboxRoot alt={altText} src={src}>
        <ImageLightboxTrigger>
          <img
            alt={altText}
            className="h-auto w-auto max-w-full rounded-50 bg-palette-gray-100"
            {...imageProps}
          />
        </ImageLightboxTrigger>
      </ImageLightboxRoot>
      {caption ? (
        <figcaption className="text-center text-text-secondary">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
