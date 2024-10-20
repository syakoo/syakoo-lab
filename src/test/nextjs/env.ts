import { loadEnvConfig } from "@next/env";

export const loadEnv = () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
  console.log("XXXXXXXXXXXXXXX");
  console.log(process.env.NEXT_PUBLIC_REACTION_SYSTEM_URL);
};
