module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:astro/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "import"],
  rules: {
    "react/prop-types": "off",
    "react/jsx-sort-props": ["error", { reservedFirst: true }],
    "react/forbid-component-props": ["error"],
    "react/jsx-curly-brace-presence": ["error", { props: "never" }],
    "react/jsx-handler-names": [
      "error",
      { checkLocalVariables: true, checkInlineFunction: true },
    ],
    "react/jsx-no-leaked-render": ["error"],
    "react/jsx-no-useless-fragment": ["error"],
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "parent", "sibling", "index", "object"],
        pathGroups: [
          {
            pattern: "{react,react-dom,vite}",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom", "vite"],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "never",
      },
    ],
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
  settings: {
    react: {
      version: "detect",
    },
  },
};
