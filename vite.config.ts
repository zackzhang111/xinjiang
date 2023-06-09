import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  base: "./",
  resolve: {
    // 路径别名
    alias: {
      "@": resolve(__dirname, "./src"),
      // "~": resolve(__dirname, "./packages"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
  
  // build: {
  //   target: ["edge90", "chrome90", "firefox90", "safari15"],
  // },
});
