# Contributing

Thanks for helping. This project accepts two kinds of change: adding or removing a word, and fixing the configuration or tests.

Please read the [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.

## Propose a word

Open a [new term issue](../../../issues/new/choose), or a pull request that does all of the following:

1. Add the word to [`fr-ca.txt`](../fr-ca.txt) in French alphabetical order, or to `flagWords` in [`cspell-ext.json`](../cspell-ext.json) for a word to flag
2. Add a row to the matching table in [`SOURCES.md`](../SOURCES.md) with a link to the record and its status
3. Run `npm test`

The source must be one of:

- the OQLF [Grand dictionnaire terminologique](https://vitrinelinguistique.oqlf.gouv.qc.ca/) (GDT)
- the OQLF Banque de dépannage linguistique (BDL)
- [TERMIUM Plus](https://www.btb.termiumplus.gc.ca/)

Link the record itself, not a search page, unless the source only offers search URLs (TERMIUM). Add plural and feminine forms only when the text you are checking uses them.

### What is accepted

- **Accepted words:** a term the record marks as preferred (_terme privilégié_), accepted or correct
- **Flagged words:** a term the record marks as not recommended (_terme déconseillé_) or a needless borrowing; give the recommended term

A word that only appears in a non-OQLF record of the GDT is accepted when the record covers the same meaning; say so in the status column.

### What is not accepted

- Words with no record in these sources, even if they are common
- Proper names of people, products or companies; keep those in your own `cspell.json`
- Text copied from a record; link it instead

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/), for example `feat: add courriel` or `fix: correct the source for télécom`.

By submitting a pull request, you agree that your contribution is licensed under the project's [license](../LICENSE.md).
