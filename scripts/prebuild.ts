import "./_shared/env";

if (process.env.ENABLE_BUILD_CONTENTS === "true") {
  console.log("[start] build contents");
  const { buildArtContents } = await import(
    "@/features/arts/art-content-builder"
  );
  await buildArtContents();
  console.log("[end] build contents");
}
