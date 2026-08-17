# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Clone with `--recurse-submodules`.** The app lives in the `primal-web-app/` submodule; without it the build has nothing to compile.
- **`gzip_proxied any` is load-bearing.** Requests arrive through StartOS's reverse proxy carrying a `Via` header, and nginx skips compression for proxied requests by default — without it the whole app ships uncompressed.
- **The `main` volume is mounted but unused.** Primal is a pure SPA with no server-side state; don't invent a store for it.
