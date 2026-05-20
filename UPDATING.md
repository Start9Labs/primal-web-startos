# Updating the upstream version

Primal Web is built from the `primal-web-app/` git submodule (`https://github.com/PrimalHQ/primal-web-app.git`, branch `main`); the root `Dockerfile` runs `npm ci && npm run build` against the checked-out submodule. There is no `dockerTag` in the manifest — the image is built fresh from whatever commit the submodule points at.

Upstream does **not** cut GitHub Releases, and the git tags lag far behind `main` (latest tag `v0.77.19` is ancient; current `main` is in the 3.x series). The de-facto version is the **commit-message subject** on `main` (e.g. `3.0.101`), which is what we mirror into the package's StartOS version.

## Determining the upstream version

- **Primal Web app** ([PrimalHQ/primal-web-app](https://github.com/PrimalHQ/primal-web-app)) — read the latest commit subject on `main`:

  ```bash
  gh api repos/PrimalHQ/primal-web-app/branches/main \
    --jq '.commit.commit.message' | head -1
  ```

  Pin lives in the `primal-web-app/` git submodule (the recorded commit SHA in the superproject tree).

## Applying the bump

- **Primal Web app** — fast-forward the submodule to upstream `main` HEAD and stage the new pointer:

  ```bash
  cd primal-web-app && git fetch origin && git checkout origin/main
  cd .. && git add primal-web-app
  ```
