import "./_shared/env";

if (process.env.ENABLE_BUILD_CONTENTS) {
  console.log("[start] build contents");
  const { buildArtContents } = await import(
    "@/features/arts/artContentBuilder"
  );
  await buildArtContents();
  console.log("[end] build contents");
}
