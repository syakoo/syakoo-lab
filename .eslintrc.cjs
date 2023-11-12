module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:storybook/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "import",
    "unused-imports",
    "no-relative-import-paths",
  ],
  rules: {
    "react/prop-types": "off",
    "react/jsx-sort-props": ["error", { reservedFirst: true }],
    "react/forbid-component-props": [
      "error",
      {
        forbid: [
          {
            propName: "style",
            allowedFor: ["PolymorphicComponent", "Image"],
          },
          {
            propName: "className",
            allowedFor: ["PolymorphicComponent", "Image", "NextLink"],
          },
        ],
      },
    ],
    "react/jsx-curly-brace-presence": ["error", { props: "never" }],
    "react/jsx-handler-names": [
      "error",
      { checkLocalVariables: true, checkInlineFunction: true },
    ],
    "react/jsx-no-leaked-render": ["error"],
    "react/jsx-no-useless-fragment": ["error"],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "object",
        ],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: true, rootDir: "src", prefix: "@" },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
