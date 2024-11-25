/* eslint-disable @typescript-eslint/no-var-requires */
/** @type{import('next/jest').default} */
const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig.json");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type{import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-fixed-jsdom",
  setupFiles: ["<rootDir>/src/test/setup.ts"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  modulePaths: [compilerOptions.baseUrl],
};

module.exports = async () => {
  const finalJestConfig = await createJestConfig(customJestConfig)();

  // NOTE: next がデフォルトで入れる CSS のモックで vanilla-extract のファイルがモックされてしまうため無理矢理だが削除
  // - ref: https://github.com/vercel/next.js/blob/ee9a13aaa0592102e229bb3e5959cebe0a7a060c/packages/next/src/build/jest/jest.ts#L120C1-L120C1
  const moduleNameMapper = finalJestConfig.moduleNameMapper;
  delete moduleNameMapper["^.+\\.(css|sass|scss)$"];

  /** @type{import('jest').Config} */
  const result = {
    ...finalJestConfig,
    // NOTE: vanilla-extract を ts より先に読ませる必要がある
    transform: {
      "\\.css\\.ts$": "@vanilla-extract/jest-transform",
      ...finalJestConfig.transform,
    },
    moduleNameMapper,
  };
  return result;
};
