## What this package wraps

[Primal](https://github.com/PrimalHQ/primal-web-app) is a Vite/Solid.js single-page web client for the Nostr protocol. There is no backend container — Primal is a static SPA. All Nostr traffic is initiated by the user's browser against relays and cache services configured in the build-time `.env` (defaults point at Primal's hosted infrastructure).

## How the upstream is pulled in

- `primal-web-app/` is a git submodule pinned to a tag (currently `v0.77.19`) of `https://github.com/PrimalHQ/primal-web-app`.
- `Dockerfile` is a multi-stage image: `node:20-bookworm-slim` runs `npm ci && npm run build` against the submodule, then the resulting `dist/` is copied into `nginx:1.27-alpine`.
- `manifest.images.main.source` is `dockerBuild: {}` — `start-cli` builds the local Dockerfile per arch.
- The custom `nginx.conf` handles SPA fallback (`try_files $uri /index.html`) plus gzip and basic caching.

## Bumping the upstream version

1. `cd primal-web-app && git fetch --tags && git checkout vX.Y.Z && cd ..`
2. Create `startos/versions/vX.Y.Z.0.ts` modeled on `v0.77.19.0.ts`; export it and add to `versionGraph` (move the old one to `other`).
3. `git add primal-web-app startos/versions` and commit; PR.
