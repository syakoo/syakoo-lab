/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

/** @type{import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    "\\.css\\.ts$": "@vanilla-extract/jest-transform",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.cjs",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.cjs",
  },
  setupFiles: ["<rootDir>/src/test/setup.ts"],
};
