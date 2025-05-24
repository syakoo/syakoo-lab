import { loadEnvConfig } from "@next/env";

export const loadEnv = () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
