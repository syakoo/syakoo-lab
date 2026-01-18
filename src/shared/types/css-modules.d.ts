declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  // biome-ignore lint/style/noDefaultExport: CSS Modules のデフォルトエクスポートを使用する
  export default classes;
}
