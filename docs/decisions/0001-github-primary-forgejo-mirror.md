# 0001: GitHub is the primary repository, Forgejo keeps a read-only mirror

- **Status:** accepted
- **Date:** 2026-09-30
- **Decided by:** Benoît H. Dicaire

## Context

Most of Benoît's repositories start on a self-hosted Forgejo instance, and those that need to be public are pushed to GitHub. This repository is different on three counts:

- It is public and accepts issues and pull requests from people outside the organization
- Sites install it with `npm install github:dicaire/cspell-dict-fr-ca`, so Cloudflare builds, Dependabot and outside users fetch it from GitHub. None of them can reach the Forgejo instance
- The Forgejo-to-GitHub push mirror depends on deploy keys that are not enabled yet

## Decision

GitHub (`dicaire/cspell-dict-fr-ca`) is the primary repository. All commits, issues, pull requests and releases happen there.

Forgejo keeps a pull mirror of the GitHub repository as a backup. The mirror is read-only: nothing is committed to it, and it is not used to install the package.

## Consequences

- Contributions land where they are reviewed and merged; no change is carried by hand from a mirror back to the primary
- Installs never depend on a sync having run
- Forgejo needs no credentials to mirror a public repository, so the backup does not wait on the deploy-key work
- If GitHub is unavailable, the Forgejo mirror holds the full history and can become the primary

## When this does not apply

Private repositories, infrastructure and anything that holds secrets stay Forgejo-first.
