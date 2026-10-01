// Checks that fr-ca.txt and the flagged words in cspell-ext.json match the
// tables in SOURCES.md, with no duplicates and in French alphabetical order.
import { readFileSync } from "node:fs";

const collator = new Intl.Collator("fr", { sensitivity: "base" });
const errors = [];

const dictionary = readFileSync("fr-ca.txt", "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));

const flagged = JSON.parse(
  readFileSync("cspell-ext.json", "utf8"),
).languageSettings.flatMap((setting) => setting.flagWords ?? []);

const sources = readFileSync("SOURCES.md", "utf8");

function tableWords(heading) {
  const section = sources
    .split(/^## /m)
    .find((part) => part.startsWith(heading));
  if (!section) {
    errors.push(`SOURCES.md has no "## ${heading}" section`);
    return [];
  }
  return section
    .split("\n")
    .filter(
      (line) =>
        line.startsWith("| ") &&
        !line.startsWith("| Word") &&
        !line.startsWith("| :"),
    )
    .flatMap((line) => line.split("|")[1].split(","))
    .map((word) => word.trim());
}

function compare(label, listed, documented) {
  const seen = new Set();
  for (const word of listed) {
    if (seen.has(word)) errors.push(`${label}: duplicate "${word}"`);
    seen.add(word);
    if (!documented.includes(word))
      errors.push(`${label}: "${word}" has no row in SOURCES.md`);
  }
  for (const word of documented) {
    if (!listed.includes(word))
      errors.push(
        `${label}: SOURCES.md lists "${word}" but the word list does not`,
      );
  }
  const sorted = [...listed].sort(collator.compare);
  if (sorted.join("\n") !== listed.join("\n")) {
    errors.push(
      `${label}: not in French alphabetical order; expected:\n  ${sorted.join("\n  ")}`,
    );
  }
}

compare("fr-ca.txt", dictionary, tableWords("Accepted words"));
compare("flagWords", flagged, tableWords("Flagged words"));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `SOURCES.md covers ${dictionary.length} words and ${flagged.length} flagged words`,
);
