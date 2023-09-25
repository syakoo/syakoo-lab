/**
 * 環境による画像のロード解決を行う関数
 *
 * NOTE: 開発環境では astro のロード解決が行われ ImageMetadata になるが、Storybook では astro のロード解決が行われないために I/F が異なりエラーが出るため一時的に入れる。
 */
export const resolveImageProps = (
  value: ImageMetadata | string,
): ImageMetadata | { src: string } => {
  if (Object.prototype.hasOwnProperty.call(value, "src")) {
    return value as ImageMetadata;
  }

  return {
    src: value as string,
  };
};
