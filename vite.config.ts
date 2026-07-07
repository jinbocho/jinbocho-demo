import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/jinbocho-demo/",
  // Fixed, dedicated port so this never collides with jinbocho-fe's dev
  // server (both default to 5173) — see the `jinbocho-dev` shell alias,
  // which starts the real backend + jinbocho-fe together.
  server: { port: 5180, strictPort: true },
  preview: { port: 5180, strictPort: true },
});
