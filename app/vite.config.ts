import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  assetsInclude: ['**/*.pdf', '**/*.docx', '**/*.pptx', '**/*.xlsx', '**/*.xls'],
  build: {
    // 主包含 xlsx 等依赖，体积会超过默认 500kB；仅抑制提示，非错误
    chunkSizeWarningLimit: 1200,
  },
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
