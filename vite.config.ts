import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isCI = process.env.CI === "true";
const rawPort = process.env.PORT;
const basePath = process.env.BASE_PATH ?? "/";

const port = rawPort ? Number(rawPort) : 3000;

const extraPlugins: any[] = [];

if (!isCI && process.env.REPL_ID !== undefined) {
  const [cartographer, devBanner, runtimeError] = await Promise.all([
    import("@replit/vite-plugin-cartographer").catch(() => null),
    import("@replit/vite-plugin-dev-banner").catch(() => null),
    import("@replit/vite-plugin-runtime-error-modal").catch(() => null),
  ]);
  if (cartographer) extraPlugins.push(cartographer.cartographer({ root: path.resolve(import.meta.dirname, "..") }));
  if (devBanner) extraPlugins.push(devBanner.devBanner());
  if (runtimeError) extraPlugins.push(runtimeError.default());
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    ...extraPlugins,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
