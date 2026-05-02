#!/usr/bin/env node
/**
 * Sync live GitHub repo data into src/lib/github-data.json so the
 * Projects section renders accurate stars / language / pushed_at
 * without ever shipping a runtime fetch. Runs at prebuild.
 *
 * Failure modes:
 *  - Network/rate-limit: keeps the existing JSON file unchanged so the
 *    build still succeeds with the last-known-good snapshot.
 *  - Repo 404: logs a warning and skips that entry.
 *
 * Auth: optional GITHUB_TOKEN env var. Without it the unauthenticated
 * limit (60 req/h/IP) is plenty for 4 repos at build time.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "src", "lib", "github-data.json");

const REPOS = [
  "NosytLabs/openclaw-droid",
  "NosytLabs/openclaw-free-mcp-servers",
  "NosytLabs/presearch-search-skill",
  "NosytLabs/tidefall-phaser",
];

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "nosytlabs-build-script",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function fetchRepo(slug) {
  const res = await fetch(`https://api.github.com/repos/${slug}`, { headers });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const j = await res.json();
  return {
    slug,
    stars: j.stargazers_count ?? 0,
    forks: j.forks_count ?? 0,
    language: j.language ?? null,
    pushedAt: j.pushed_at ?? null,
    archived: Boolean(j.archived),
  };
}

function loadExisting() {
  try {
    return JSON.parse(readFileSync(OUT, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  const existing = loadExisting();
  try {
    const settled = await Promise.all(REPOS.map((s) => fetchRepo(s).catch((e) => ({ error: String(e), slug: s }))));
    const ok = settled.filter((r) => !r.error);
    const errors = settled.filter((r) => r.error);
    if (ok.length === 0) throw new Error("all GitHub fetches failed");
    const data = {
      fetchedAt: new Date().toISOString(),
      repos: Object.fromEntries(ok.map((r) => [r.slug, r])),
    };
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
    console.log(`[sync-github-data] wrote ${ok.length}/${REPOS.length} repos -> ${OUT}`);
    for (const e of errors) console.warn(`[sync-github-data] skip ${e.slug}: ${e.error}`);
  } catch (err) {
    if (existing) {
      console.warn(`[sync-github-data] fetch failed (${err.message}); keeping existing snapshot from ${existing.fetchedAt}`);
      return;
    }
    console.warn(`[sync-github-data] fetch failed and no existing snapshot; writing empty fallback`);
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(OUT, JSON.stringify({ fetchedAt: null, repos: {} }, null, 2) + "\n");
  }
}

main();
