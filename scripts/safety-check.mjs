// Pre-publication check (PLAN.md, "Safety checks"): search the built site and the repository's text files
// for things that must not go public. Run after `npm run build`. Exits 1 on any hit.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SKIP_DIRS = new Set(["node_modules", ".git", ".next"]);
const TEXT = new Set([".html", ".js", ".css", ".txt", ".json", ".md", ".ts", ".tsx", ".mjs", ".py", ".xml", ".webmanifest"]);
const ALLOWED_EMAIL = /@(anthropic\.com|example\.com)$/i;

const CHECKS = [
  ["email address", /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g],
  ["Google Drive link", /drive\.google\.com|docs\.google\.com/gi],
  ["Discord link", /discord(app)?\.(gg|com)/gi],
  ["invite or join link", /\/join\/[A-Za-z0-9_-]{8,}|invite[_-]?token/gi],
  ["API key", /\bsk-[A-Za-z0-9_-]{16,}|\bAIza[0-9A-Za-z_-]{30,}|\bghp_[A-Za-z0-9]{30,}/g],
  ["form element", /<form[\s>]/gi],
  ["cookie write", /document\.cookie\s*=|set-cookie/gi],
];

// This file and the plan name the patterns themselves.
const SELF = new Set(["scripts/safety-check.mjs", "PLAN.md"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (TEXT.has(extname(name).toLowerCase())) yield p;
  }
}

let hits = 0;
let files = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  if (SELF.has(rel)) continue;
  files++;
  const text = readFileSync(file, "utf8");
  for (const [label, re] of CHECKS) {
    for (const m of text.matchAll(re)) {
      if (label === "email address" && (ALLOWED_EMAIL.test(m[0]) || /\.(png|jpe?g|webp|svg|js|css)$/i.test(m[0]))) continue;
      hits++;
      console.log(`${label}: ${rel}: ${m[0].slice(0, 80)}`);
    }
  }
}

const built = (() => {
  try {
    return statSync(join(ROOT, "out")).isDirectory();
  } catch {
    return false;
  }
})();
console.log(`${files} text files checked${built ? " (including out/)" : " (no out/ folder: run npm run build first)"}; ${hits} hit(s).`);
process.exit(hits || !built ? 1 : 0);
