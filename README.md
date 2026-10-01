# cspell-dict-fr-ca

Canadian French terms for [cspell](https://cspell.org/), layered on the France dictionary [`@cspell/dict-fr-fr`](https://github.com/streetsidesoftware/cspell-dicts/tree/main/dictionaries/fr_FR).

`@cspell/dict-fr-fr` flags words that are standard in Quebec and Canadian French, such as _antipourriel_, _cyberincident_ or _entiercement_.
It also lets through some words the Office québécois de la langue française (OQLF) advises against: _commiter_ is in the France dictionary, and in a bilingual check the English dictionary accepts _divisive_. This package fills both gaps:

- **Accepted words.** Every word in [`fr-ca.txt`](fr-ca.txt) is attested in the OQLF [Grand dictionnaire terminologique](https://vitrinelinguistique.oqlf.gouv.qc.ca/) (GDT), the Banque de dépannage linguistique (BDL) or [TERMIUM Plus](https://www.btb.termiumplus.gc.ca/). [`SOURCES.md`](SOURCES.md) links the record for each one
- **Flagged words.** Words the GDT or BDL advises against, such as _antispam_ or _commiter_, are reported as errors in French text, even when another dictionary or a project word list accepts them, with the recommended term in [`SOURCES.md`](SOURCES.md)

The list is small on purpose: a word is added when a source supports it, not because it looks right.

## Install

```sh
npm install --save-dev github:dicaire/cspell-dict-fr-ca
```

The package is installed from GitHub; it is not published on npm.

## Use

Import the dictionary in your `cspell.json` and set French as a language for the files that need it:

```json
{
  "import": ["cspell-dict-fr-ca/cspell-ext.json"],
  "language": "en,fr"
}
```

This also imports `@cspell/dict-fr-fr`, so you do not need to add it separately.

### Bilingual Hugo sites

For sites that pair `name.en.md` with `name.fr.md`, the Hugo preset checks `*.fr.md`, `*.fr.yml` and `fr.toml` in French and English, and skips content that is not prose:

- fenced code blocks and inline code
- `slug`, `url`, `tags`, `layout`, `collection`, `project` and `implementation` front matter, and alias paths
- heading anchors, footnote labels and domain names used as link text

```json
{
  "import": ["cspell-dict-fr-ca/presets/hugo.json"]
}
```

Site-specific words, such as people, clients and products, stay in each site's own `cspell.json`.

## Contribute

Suggestions are welcome. A new word needs a link to its GDT, BDL or TERMIUM record and the status it has there; see [CONTRIBUTING.md](.github/CONTRIBUTING.md). Maintained on a best-effort basis.

## Hosting

GitHub is the primary repository: issues, pull requests and installs all happen here. A read-only mirror is kept on a self-hosted Forgejo instance as a backup. See [the decision record](docs/decisions/0001-github-primary-forgejo-mirror.md).

## License

[MIT](LICENSE.md). The repository holds word lists and links to their sources; it does not reproduce text from the GDT, BDL or TERMIUM.
