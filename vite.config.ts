import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { checker } from "vite-plugin-checker";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (!env.VITE_API_URL) {
    throw new Error("VITE_API_URL is missing in your .env file");
  }

  return {
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      checker({ typescript: false }),
    ],
  };
});