import { readdirSync, readFileSync, existsSync } from "node:fs";

const pages = readdirSync(".").filter((f) => f.endsWith(".html"));
const problems = [];

for (const page of pages) {
  const html = readFileSync(page, "utf8");

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
    const file = url.split("#")[0].split("?")[0];
    if (!file) continue;
    if (!existsSync(file)) problems.push(`${page} -> missing ${url}`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dupes.length) problems.push(`${page} -> duplicate ids: ${dupes.join(", ")}`);

  if (!html.includes("<title>")) problems.push(`${page} -> missing title`);
  if (!html.includes('name="description"')) problems.push(`${page} -> missing meta description`);
  if (!html.includes('lang="vi"')) problems.push(`${page} -> missing lang=vi`);
  if (!html.includes('name="viewport"')) problems.push(`${page} -> missing viewport`);
}

console.log(`Checked ${pages.length} pages.`);
const audioFiles = ["audio/track-1.mp3", "audio/track-2.mp3", "audio/track-3.mp3", "audio/track-4.mp3"];
for (const file of audioFiles) {
  if (!existsSync(file)) problems.push(`missing audio file: ${file}`);
}
if (problems.length) {
  console.log(problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log("All local links, images, IDs and meta tags OK.");
}
