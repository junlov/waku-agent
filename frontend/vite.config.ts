import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "strip-generated-trailing-whitespace",
      generateBundle(_options, bundle) {
        for (const output of Object.values(bundle)) {
          if (output.type === "chunk") {
            output.code = output.code.replace(/[ \t]+$/gm, "");
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL("./src", import.meta.url))),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    minify: "esbuild",
    outDir: resolve(fileURLToPath(new URL(".", import.meta.url)), "../waku/ops/static/react"),
    emptyOutDir: true,
    lib: {
      entry: resolve(fileURLToPath(new URL(".", import.meta.url)), "src/main.tsx"),
      formats: ["es"],
      fileName: () => "curriculum.js",
      cssFileName: "curriculum",
    },
    rollupOptions: {
      treeshake: {
        // main.tsx imports ./curriculum.js (and CSS files) purely for side
        // effects — whitelist them or they're treeshaken out of the bundle.
        moduleSideEffects: (id) => id.endsWith(".css") || /src[\\/]curriculum\.tsx$/.test(id),
      },
    },
  },
});
