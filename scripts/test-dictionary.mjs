// Runs cspell against the fixtures through presets/hugo.json and checks that
// accepted words pass, flagged words fail, and code, URLs and English stay out of scope.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const cspell = join("node_modules", ".bin", "cspell");
let failed = false;

function run(files, config = "test/cspell.json") {
  const result = spawnSync(
    cspell,
    [
      "--no-progress",
      "--no-summary",
      "--no-must-find-files",
      "--config",
      config,
      ...files,
    ],
    {
      encoding: "utf8",
    },
  );
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

function expect(condition, message, output = "") {
  if (condition) {
    console.log(`ok   ${message}`);
  } else {
    failed = true;
    console.error(`FAIL ${message}\n${output}`);
  }
}

// Every dictionary word, used in a French sentence, must pass.
const words = readFileSync("fr-ca.txt", "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));
const dir = mkdtempSync(join(tmpdir(), "cspell-dict-fr-ca-"));
const allWords = join(dir, "mots.fr.md");
writeFileSync(
  allWords,
  `# Mots\n\n${words.map((word) => `Le mot ${word} est accepté.`).join("\n")}\n`,
);
let result = run(["--root", dir, allWords]);
expect(
  result.status === 0,
  `all ${words.length} dictionary words pass`,
  result.output,
);

// A word that is in neither dictionary must still fail, or the check above proves nothing.
const unknown = join(dir, "inconnu.fr.md");
writeFileSync(unknown, "# Inconnu\n\nUn élément focalisable.\n");
result = run(["--root", dir, unknown]);
expect(
  result.status !== 0 && result.output.includes("(focalisable)"),
  "a word outside the dictionary still fails",
  result.output,
);

result = run(["test/fixtures/accepted.fr.md"]);
expect(
  result.status === 0,
  "French prose, code blocks, front matter and anchors pass",
  result.output,
);

result = run(["test/fixtures/code.en.md"], "test/cspell-flag-color.json");
expect(
  result.status === 0,
  "code, slugs and anchors are skipped in English files too",
  result.output,
);

result = run(["test/fixtures/english.en.md"]);
expect(
  result.status === 0,
  "flagged French words are not flagged in English files",
  result.output,
);

const flagged = JSON.parse(
  readFileSync("cspell-ext.json", "utf8"),
).languageSettings.flatMap((s) => s.flagWords ?? []);
result = run(["test/fixtures/flagged.fr.md"]);
expect(
  result.status !== 0,
  "flagged words fail in French files",
  result.output,
);
for (const word of flagged) {
  expect(
    result.output.includes(`(${word})`),
    `"${word}" is reported`,
    result.output,
  );
}

process.exit(failed ? 1 : 0);
