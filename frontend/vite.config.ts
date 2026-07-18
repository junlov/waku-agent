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
