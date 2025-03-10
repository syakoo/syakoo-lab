import { env } from "env";

if (env.ENABLE_BUILD_CONTENTS) {
  console.log("[start] build contents");
  const { buildArtContents } = await import(
    "@/features/arts/art-content-builder"
  );
  await buildArtContents();
  console.log("[end] build contents");
}
