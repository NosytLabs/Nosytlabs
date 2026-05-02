import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Vite (dev + preview) does not serve a directory's `index.html` for paths
// like `/services/` or `/services/web-apps/` — by default, those URLs fall
// through to the SPA fallback and the React homepage takes over. That breaks
// the canonical, sitemap-listed, crawler-facing service pages, which are
// hand-rolled static HTML living under `public/services/*/index.html`.
//
// This plugin intercepts requests under `/services/` (with or without a
// trailing slash) and, if a matching `public/services/<...>/index.html`
// exists on disk, serves it as real HTML before Vite's transform middleware
// or SPA fallback ever sees the request. Production builds copy `public/`
// verbatim into `dist/public/`, so the same paths resolve naturally there;
// this plugin is only needed for the dev and preview servers.
function staticServicePages(): Plugin {
  const publicDir = path.resolve(import.meta.dirname, "public");

  // Match `/services` exactly or `/services/...` — but NOT `/services-foo`,
  // which would otherwise be caught by a naive `startsWith` check.
  const SERVICES_PATH = /^\/services(?:\/|$)/;

  const tryResolveServiceHtml = (urlPath: string): string | null => {
    // Strip query/hash; only the path matters here.
    const cleanPath = urlPath.split("?")[0].split("#")[0];
    if (!SERVICES_PATH.test(cleanPath)) return null;
    // Only directory-style requests — anything ending in a real extension
    // (.html, .json, .xml, an asset) is left to Vite to handle normally.
    if (/\.[a-z0-9]+$/i.test(cleanPath)) return null;
    const withSlash = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
    const candidate = path.join(publicDir, withSlash, "index.html");
    // Guard against path traversal: candidate must stay inside publicDir.
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
    // Only intercept safe, idempotent reads — never POST/PUT/DELETE/etc.
    const method = (req.method ?? "GET").toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      next();
      return;
    }
    const url = req.url ?? "/";
    const filePath = tryResolveServiceHtml(url);
    if (!filePath) {
      next();
      return;
    }
    try {
      const html = fs.readFileSync(filePath, "utf8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.end(html);
    } catch {
      next();
    }
  };

  return {
    name: "nosytlabs:static-service-pages",
    configureServer(server) {
      // Register middleware directly (not inside a returned post-hook). Per
      // Vite docs, middleware added in the synchronous body of configureServer
      // runs BEFORE Vite's internal middlewares — including the SPA fallback
      // (`indexHtmlMiddleware`) that would otherwise capture `/services/` and
      // `/services/<slug>/` and serve the React homepage instead of the real
      // static service pages.
      server.middlewares.use((req, res, next) => serveIfMatch(req, res, next));
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => serveIfMatch(req, res, next));
    },
  };
}

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    staticServicePages(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
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
    // Split bundles so no single chunk exceeds the 250 KB SEO/perf threshold
    // (squirrelscan rule perf/js-file-size). The libraries below all change
    // at very different cadences from app code, so splitting also gives
    // returning visitors a much higher cache hit rate.
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("react-icons") || id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("react-dom") || id.match(/[\\/]react[\\/]/)) return "vendor-react";
          return undefined;
        },
      },
    },
  },
  // Strip /*! ... */ legal-comment banners from the production JS so
  // squirrelscan's perf/unminified-js heuristic doesn't trip on them.
  esbuild: {
    legalComments: "none",
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
