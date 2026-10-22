import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Pinned port so the preview never drifts onto another app's dev server.
// strictPort makes a collision fail loudly instead of silently moving,
// which would break every verify suite (they hardcode this port).
const PORT = 5199;

export default defineConfig({
  plugins: [react()],
  // Relative base: the build works at any mount point (root hosts, GitHub
  // Pages subpaths, CDNs). Pairs with ?page= query routing, not pathnames.
  base: "./",
  server: { port: PORT, strictPort: true, watch: { usePolling: true } },
  preview: { port: PORT, strictPort: true },
});
