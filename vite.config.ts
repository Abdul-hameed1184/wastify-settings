import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import Checker from 'vite-plugin-checker';
// https://vite.dev/config/
export default defineConfig({

    build: {
      outDir: 'build',
    },
    esbuild: {
      logLevel: "silent", // Suppress certain error logs
    },
    plugins: [react(),
      Checker({
        typescript: false, // Disable type checking during build
      }),
    ],
})