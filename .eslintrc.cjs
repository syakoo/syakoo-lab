module.exports = {
  extends: ["plugin:astro/recommended"],
  parserOptions: {
    files: ["astro.config.mjs"],
    sourceType: "module",
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
