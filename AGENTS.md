# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `primal-web`.** Serves the official Primal Nostr web app as a self-hosted static site behind nginx. Single `ui` interface (`Web UI`) on the `ui-multi` host, bound to port 80; no dependencies, no actions. All Nostr traffic flows browser-to-relay, not through this container.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach primal-web -n primal-web-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `primal-web-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
