<p align="center">
  <img src="icon.svg" alt="Primal Logo" width="21%">
</p>

# Primal on StartOS

> **Upstream repo:** <https://github.com/PrimalHQ/primal-web-app>

[Primal](https://primal.net) is a fast, polished web client for the [Nostr](https://nostr.com) protocol with a focus on easy onboarding, snappy UX, advanced search, and customizable feeds. This package serves the official Primal web app as a self-hosted static site on StartOS.

> [!NOTE]
> The Primal web app is a pure single-page application. The StartOS package only hosts the built static assets behind nginx — your browser still talks directly to Nostr relays and the cache / upload services configured in Primal's `.env` at build time (Primal's hosted infrastructure by default). Self-hosting the Primal cache backend (`primal-caching-service`) is a separate undertaking and is **not** part of this package.

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions](#actions)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                                             |
| ------------- | ----------------------------------------------------------------- |
| Image         | Locally built from `Dockerfile` (multi-stage: node build → nginx) |
| Architectures | x86_64, aarch64                                                   |
| Command       | `nginx -g 'daemon off;'`                                          |

The build stage uses `node:20-bookworm-slim` to compile the SPA from the `primal-web-app/` submodule. The runtime stage is `nginx:1.27-alpine` serving the static `dist/` over HTTP on port 80.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose                                             |
| ------ | ----------- | --------------------------------------------------- |
| `main` | `/data`     | Reserved; the SPA is fully stateless on the server. |

The web app holds all user state (keys, follows, settings) inside the browser. Nothing is persisted server-side by this package.

---

## Installation and First-Run Flow

No special setup. Install and start — open the Web UI and either create a new Nostr account, import an existing `nsec`, or connect a NIP-07 browser extension. Sign-in happens entirely in your browser; nothing is stored server-side.

---

## Configuration Management

No user-facing configuration is exposed by StartOS. The Primal cache, upload, and relay endpoints are baked into the JavaScript at build time from `primal-web-app/.env` (Primal's hosted services by default).

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose        |
| --------- | ---- | -------- | -------------- |
| Web UI    | 80   | HTTP     | Primal web app |

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions

None.

---

## Backups and Restore

**Included in backup:**

- `main` volume (currently empty — see above)

**Restore behavior:** Volume is fully restored before the service starts.

---

## Health Checks

| Check         | Method              | Messages                                                                        |
| ------------- | ------------------- | ------------------------------------------------------------------------------- |
| Web Interface | Port listening (80) | Success: "The web interface is ready" / Error: "The web interface is not ready" |

---

## Dependencies

None.

---

## Limitations and Differences

1. **Static frontend only.** This package does not run the Primal caching backend (`primal-caching-service`). The hosted SPA continues to call Primal's public cache and upload endpoints from the user's browser.
2. **No server-side state.** All Primal data lives in the browser; backups of the `main` volume are effectively empty.
3. **Build-time endpoints.** Cache / upload / relay URLs are not user-configurable from StartOS; changing them requires editing `primal-web-app/.env` and rebuilding the package.

---

## What Is Unchanged from Upstream

The web app source is an unmodified commit of `PrimalHQ/primal-web-app`'s `main` branch (upstream stopped publishing git tags after `v0.77.19`). Only the build / serve plumbing (Dockerfile, nginx config) is added by this package.

---

## Contributing

Build and development workflow follow the StartOS packaging guide: <https://docs.start9.com/packaging>. Keep `README.md`, `instructions.md`, and `AGENTS.md` in sync with any change to user-visible behavior or package structure.

---

## Quick Reference for AI Consumers

```yaml
package_id: primal-web
image: locally built (multi-stage node + nginx)
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  ui: 80
dependencies: none
startos_managed_env_vars: none
actions: none
upstream_submodule: primal-web-app/ @ main
```
