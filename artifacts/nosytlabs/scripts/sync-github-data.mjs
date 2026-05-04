#!/usr/bin/env node
/**
 * Sync live GitHub repo data into src/lib/github-data.json AND regenerate
 * the SoftwareSourceCode JSON-LD block in index.html so the Projects
 * section renders accurate stars / language / pushed_at and search
 * engines see fresh dateModified — without ever shipping a runtime fetch.
 *
 * Run manually via `pnpm --filter @workspace/nosytlabs run sync:github`.
 * Intentionally NOT wired into prebuild so production builds stay
 * reproducible and offline-safe; the JSON snapshot and rewritten
 * index.html are committed to the repo.
 *
 * Failure modes:
 *  - Network/rate-limit: keeps the existing JSON snapshot AND the
 *    existing index.html JSON-LD untouched so the next build still
 *    succeeds with last-known-good data.
 *  - Repo 404: logs a warning, skips that entry, continues.
 *  - Missing index.html markers: logs a warning, skips schema rewrite,
 *    JSON snapshot still writes.
 *
 * Auth: optional GITHUB_TOKEN env var. Without it the unauthenticated
 * limit (60 req/h/IP) is plenty for 4 repos.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "src", "lib", "github-data.json");
const INDEX_HTML = resolve(__dirname, "..", "index.html");

// The featured-projects list. Order here = order in the JSON-LD @graph.
// `name` and `description` are author-controlled (BRAND.md voice); everything
// else (programmingLanguage, dateModified) comes from the live API.
const REPO_ENTRIES = [
  {
    slug: "NosytLabs/openclaw-droid",
    name: "OpenClaw Droid",
    description: "Optimized OpenClaw AI Gateway for Android via Termux. Agentic workflows on a phone.",
  },
  {
    slug: "NosytLabs/openclaw-free-mcp-servers",
    name: "OpenClaw Free MCP Servers",
    description: "Free Image Generation and Text-to-Speech MCP servers for OpenClaw. No API keys required.",
  },
  {
    slug: "NosytLabs/presearch-search-skill",
    name: "Presearch Search Skill",
    description: "Clean SKILL.md for the Presearch Search API — privacy-first, decentralized search for AI agents.",
  },
  {
    slug: "NosytLabs/employee-md",
    name: "Employee.md",
    description: "Open specification for hiring AI employees in an internet-native economy: roles, capabilities, evaluations, and contracts.",
  },
];
const REPOS = REPO_ENTRIES.map((r) => r.slug);

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

/**
 * Deep-equal comparison for the per-repo metadata maps. Used to decide
 * whether a sync produced any substantive change and therefore whether we
 * should rewrite the on-disk files (and ultimately produce a git commit
 * from the scheduled GitHub Action). Compares only the fields that we
 * actually persist — slug + the live fields populated by `fetchRepo` —
 * which is exactly what `JSON.stringify` over each entry expresses.
 * Returns false on key-set mismatch or any field difference.
 */
function repoMapsEqual(a, b) {
  if (!a || !b) return false;
  const ka = Object.keys(a).sort();
  const kb = Object.keys(b).sort();
  if (ka.length !== kb.length || ka.some((k, i) => k !== kb[i])) return false;
  for (const k of ka) {
    if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) return false;
  }
  return true;
}

/**
 * Regenerate the SoftwareSourceCode JSON-LD block in index.html between the
 * BEGIN:github-projects-schema / END:github-projects-schema markers, using
 * live `dateModified` and `programmingLanguage` per repo. Also injects a
 * `<!-- last-synced: <ISO timestamp> -->` comment immediately after the BEGIN
 * marker so reviewers can tell at a glance when the schema was last refreshed
 * (this is the same timestamp written into github-data.json#fetchedAt).
 */
function rewriteIndexHtmlSchema(repoMap, fetchedAt) {
  let html;
  try {
    html = readFileSync(INDEX_HTML, "utf8");
  } catch {
    console.warn(`[sync-github-data] index.html not found; skipping schema rewrite`);
    return;
  }
  const begin = "<!-- BEGIN:github-projects-schema -->";
  const end = "<!-- END:github-projects-schema -->";
  const i = html.indexOf(begin);
  const j = html.indexOf(end);
  if (i === -1 || j === -1 || j < i) {
    console.warn(`[sync-github-data] markers not found in index.html; skipping schema rewrite`);
    return;
  }
  const graph = REPO_ENTRIES.map((entry) => {
    const live = repoMap[entry.slug];
    const node = {
      "@type": "SoftwareSourceCode",
      name: entry.name,
      description: entry.description,
      codeRepository: `https://github.com/${entry.slug}`,
      programmingLanguage: live?.language ?? "Unknown",
      author: { "@id": "https://nosytlabs.com/#org" },
    };
    if (live?.pushedAt) node.dateModified = live.pushedAt;
    return node;
  });
  const blob = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 6);
  const indented = blob.replace(/\n/g, "\n    ");
  const stamp = `<!-- last-synced: ${fetchedAt} -->`;
  const replacement = `${begin}\n    ${stamp}\n    <script type="application/ld+json">\n    ${indented}\n    </script>\n    ${end}`;
  const next = html.slice(0, i) + replacement + html.slice(j + end.length);
  writeFileSync(INDEX_HTML, next);
  console.log(`[sync-github-data] refreshed JSON-LD in ${INDEX_HTML} (last-synced ${fetchedAt})`);
}

async function main() {
  const existing = loadExisting();
  try {
    const settled = await Promise.all(REPOS.map((s) => fetchRepo(s).catch((e) => ({ error: String(e), slug: s }))));
    const ok = settled.filter((r) => !r.error);
    const errors = settled.filter((r) => r.error);
    if (ok.length === 0) throw new Error("all GitHub fetches failed");
    const repoMap = Object.fromEntries(ok.map((r) => [r.slug, r]));

    // Per-repo fetch can fail transiently (rate limit, repo briefly 404
    // during a rename, network blip). Because this runs unattended on a
    // schedule and auto-commits, dropping a previously-good entry would
    // ship degraded JSON-LD ("programmingLanguage": "Unknown", missing
    // dateModified) until the next successful run. Instead, when we already
    // have a snapshot entry for a failed slug, fall back to it so the
    // commit only ever moves data forward.
    const reused = [];
    for (const e of errors) {
      const prev = existing?.repos?.[e.slug];
      if (prev) {
        repoMap[e.slug] = prev;
        reused.push(e.slug);
        console.warn(`[sync-github-data] reuse last-known-good for ${e.slug}: ${e.error}`);
      } else {
        console.warn(`[sync-github-data] skip ${e.slug} (no prior snapshot): ${e.error}`);
      }
    }

    // Skip writing both files when nothing substantive changed (same set of
    // repos, identical stars/forks/language/pushedAt/archived). Without this
    // guard the daily scheduled run would always produce a diff because of
    // the fresh fetchedAt stamp, creating commit noise in the default branch.
    // We compare on the canonical JSON of the repo map only — fetchedAt is
    // explicitly excluded so timestamp-only deltas do not count as a change.
    // Reused last-known-good entries are byte-identical to existing.repos by
    // construction, so they correctly count as "no change" here too.
    if (existing && repoMapsEqual(existing.repos, repoMap)) {
      const detail = reused.length ? ` (${reused.length} reused: ${reused.join(", ")})` : "";
      console.log(
        `[sync-github-data] no changes for ${ok.length}/${REPOS.length} repos vs snapshot from ${existing.fetchedAt}${detail}; skipping write`,
      );
      return;
    }

    const fetchedAt = new Date().toISOString();
    const data = { fetchedAt, repos: repoMap };
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
    console.log(`[sync-github-data] wrote ${ok.length}/${REPOS.length} repos -> ${OUT}`);
    rewriteIndexHtmlSchema(repoMap, fetchedAt);
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
