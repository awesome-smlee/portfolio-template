const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["release/js/script.js"],
    bundle: true,
    minify: true,
    outfile: "preview/js/bundle.js",
  })
  .catch(() => process.exit(1));
