type ImageProps = {
  caption?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ caption, ...imageProps }) => {
  return (
    <figure className="mx-auto my-200 flex flex-col items-center gap-100">
      <img
        alt={caption || ""}
        className="h-auto w-auto max-w-full rounded-50 bg-palette-gray-100"
        {...imageProps}
      />
      {caption ? (
        <figcaption className="text-center text-text-secondary">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
