import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    minify: "esbuild",
    outDir: resolve(fileURLToPath(new URL(".", import.meta.url)), "../waku/ops/static/react"),
    emptyOutDir: true,
    lib: {
      entry: resolve(fileURLToPath(new URL(".", import.meta.url)), "src/curriculum.tsx"),
      formats: ["es"],
      fileName: () => "curriculum.js",
      cssFileName: "curriculum",
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
      },
    },
  },
});
