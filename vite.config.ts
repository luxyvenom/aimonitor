import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vercel 빌드 캐시 클리어를 위한 설정
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
