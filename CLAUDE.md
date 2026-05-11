## What this package wraps

[Primal](https://github.com/PrimalHQ/primal-web-app) is a Vite/Solid.js single-page web client for the Nostr protocol. There is no backend container — Primal is a static SPA. All Nostr traffic is initiated by the user's browser against the relays, cache, and upload services configured in the build-time `.env` shipped in the upstream submodule (defaults point at Primal's hosted infrastructure). Sign-in (nsec import, NIP-07 extension, "create account" onboarding) is entirely client-side and needs no StartOS-side env var or setting.

## How the upstream is pulled in

- `primal-web-app/` is a git submodule of `https://github.com/PrimalHQ/primal-web-app`, **pinned to a commit on `main`** — not a tag. Upstream stopped cutting git tags after `v0.77.19` (mid-2023, an ancient pre-redesign build with no in-app login); everything since then ships as untagged commits on `main`, version-bumped via the `version` field in `package.json` (currently `3.0.101`). Don't pin to the `v0.77.19` tag.
- `Dockerfile` is a multi-stage image: `node:20-bookworm-slim` runs `npm ci && npm run build` against the submodule, then deletes the `*.map` sourcemaps and the Vite `manifest.json` from `dist/` (upstream's vite config emits them; ~18 MB, useless for serving — don't re-add them), and the trimmed `dist/` is copied into `nginx:1.27-alpine`.
- `manifest.images.main.source` is `dockerBuild: {}` — `start-cli` builds the local Dockerfile per arch.
- The custom `nginx.conf` handles SPA fallback (`try_files $uri /index.html`), gzip (incl. `gzip_proxied any` — requests arrive via StartOS's reverse proxy, so without it nginx skips compression), and split caching (`immutable` for content-hashed `/assets/`, `no-cache` for the HTML shell). nginx listens on plain HTTP port 80 — StartOS's reverse proxy always terminates TLS in front, so the browser sees an HTTPS (secure-context) origin; the PWA service worker the build emits registers normally, no special handling needed.

## Bumping the upstream version

1. `cd primal-web-app && git fetch origin main && git checkout origin/main && cd ..` (or check out a specific recent `main` commit).
2. Read the new `primal-web-app/package.json` `version` (e.g. `3.0.102`). That's the StartOS version base; the package revision is the `:N` suffix.
3. Rename the existing `startos/versions/v*.ts` file to the new version, update its `version` string and exported const name, and write `releaseNotes`. Update the import + `current` in `startos/versions/index.ts`. No new version file and no migration unless there's actual migration logic (there isn't — the SPA is server-side stateless) or you want to preserve the prior release notes in git.
4. `git add primal-web-app startos/versions` and commit; PR.
