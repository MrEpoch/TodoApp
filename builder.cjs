require("esbuild").buildSync({
    entryPoints: ["src/main.tsx"],
    bundle: true,
    minify: false,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    outdir: "./dist",
    exclude: ["**/*.test.tsx", "**/node_modules/**/*"],
});
