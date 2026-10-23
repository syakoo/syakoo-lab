// NOTE: `vite-plugins/static-image.ts` が変換する画像 import の型
declare module "*.png" {
  const image: import("./static-image").StaticImage;
  export default image;
}
declare module "*.jpg" {
  const image: import("./static-image").StaticImage;
  export default image;
}
declare module "*.jpeg" {
  const image: import("./static-image").StaticImage;
  export default image;
}
declare module "*.webp" {
  const image: import("./static-image").StaticImage;
  export default image;
}
declare module "*.gif" {
  const image: import("./static-image").StaticImage;
  export default image;
}
