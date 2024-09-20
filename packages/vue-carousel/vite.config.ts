import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [vue(), eslint()],
  build: {
    target: "es2017",
    sourcemap: true,
    emptyOutDir: false,
    outDir: path.resolve(__dirname, "dist"),
    lib: {
      entry: path.resolve(__dirname, "index.js"),
      name: "vueCarousel",
      fileName: (format) => {
        if (format === "es") {
          return "v.mjs";
        }
        if (format === "cjs") {
          return "vue-carousel.cjs";
        }
        return `vue-carousel.${format}.js`;
      },
      formats: ["es", "umd", "iife", "cjs", "system"],
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        assetFileNames: (asset) => {
          console.info(asset.name);
          return asset.name!;
        },
      },
    },
  },
});
