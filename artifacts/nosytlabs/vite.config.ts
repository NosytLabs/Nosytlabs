import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// Serve public/services/*/index.html before Vite's SPA fallback so the
// canonical /services/ and /services/<slug>/ URLs return the static
// service pages instead of the React homepage. Dev/preview only;
// production hosting (Replit Static) serves dist/public/services/*
// directly because real files win over the SPA rewrite.
function staticServicePages(): Plugin {
  const publicDir = path.resolve(import.meta.dirname, "public");
  const SERVICES_PATH = /^\/services(?:\/|$)/;

  const tryResolveServiceHtml = (urlPath: string): string | null => {
    const cleanPath = urlPath.split("?")[0].split("#")[0];
    if (!SERVICES_PATH.test(cleanPath)) return null;
    if (/\.[a-z0-9]+$/i.test(cleanPath)) return null;
    const withSlash = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
    const candidate = path.join(publicDir, withSlash, "index.html");
    const normalizedCandidate = path.normalize(candidate);
    const normalizedPublic = path.normalize(publicDir + path.sep);
    if (!normalizedCandidate.startsWith(normalizedPublic)) return null;
    return fs.existsSync(normalizedCandidate) ? normalizedCandidate : null;
  };

  const serveIfMatch = (
    req: { url?: string; method?: string },
    res: {
      statusCode: number;
      setHeader: (k: string, v: string) => void;
      end: (chunk?: string | Buffer) => void;
    },
    next: () => void,
  ) => {
    const method = (req.method ?? "GET").toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      next();
      return;
    }
    const filePath = tryResolveServiceHtml(req.url ?? "/");
    if (!filePath) {
      next();
      return;
    }
    try {
      const html = fs.readFileSync(filePath, "utf8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.end(method === "HEAD" ? undefined : html);
    } catch {
      next();
    }
  };

  return {
    name: "nosytlabs:static-service-pages",
    configureServer(server) {
      server.middlewares.use((req, res, next) => serveIfMatch(req, res, next));
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => serveIfMatch(req, res, next));
    },
  };
}

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 5173;
const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    staticServicePages(),
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-runtime-error-modal").then((m) => m.default()),
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({ root: path.resolve(import.meta.dirname, "..") })
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    cssCodeSplit: true,
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("react-icons") || id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("react-dom") || id.match(/[\/]react[\/]/)) return "vendor-react";
          return undefined;
        },
      },
    },
  },
  esbuild: { legalComments: "none" },
  server: {
    port,
    strictPort: false,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: { strict: true },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
