import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import {checker} from 'vite-plugin-checker';
// https://vite.dev/config/
export default defineConfig({

    build: {
      outDir: 'build',
    },
    esbuild: {
      logLevel: "silent", // Suppress certain error logs
    },
    plugins: [react(),
      checker({
        typescript: false, // Disable type checking during build
      }),
    ],
})