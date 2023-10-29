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
  plugins: ["@typescript-eslint", "react", "import"],
  rules: {
    "react/prop-types": "off",
    "react/jsx-sort-props": ["error", { reservedFirst: true }],
    "react/forbid-component-props": [
      "error",
      {
        forbid: [
          "style",
          {
            propName: "className",
            allowedFor: ["PolymorphicComponent", "Image"],
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
  settings: {
    react: {
      version: "detect",
    },
  },
};
