import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);
const basePath = process.env.PAGES_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

test("exports Prompt Atelier as a complete static site", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<title>Prompt Atelier/);
  assert.match(html, /AI 網頁 UI\/UX Prompt 圖鑑/);
  assert.match(html, /id="styles"/);
  assert.match(html, /id="compare"/);
  assert.match(html, /id="builder"/);
  assert.ok(html.includes(`${basePath}/_next/static/`));
  if (siteUrl) assert.ok(html.includes(`${siteUrl}/og.png`));
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|_vinext/i);
});

test("includes client assets and the social preview", async () => {
  await access(new URL("og.png", outputRoot));
  const staticEntries = await readdir(new URL("_next/static/", outputRoot));
  assert.ok(staticEntries.length > 0);
});
