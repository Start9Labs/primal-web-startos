<p align="center">
  <img src="icon.svg" alt="Primal Logo" width="21%">
</p>

# Primal on StartOS

> Everything not listed in this document should behave the same as upstream
> Primal. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Primal](https://github.com/PrimalHQ/primal-web-app) is a web client for Nostr. This package builds the official app from source and serves it as a static site — so the code reaching your browser is yours, even though the network it talks to is not.

- **Upstream repo:** <https://github.com/PrimalHQ/primal-web-app>
- **Wrapper repo:** <https://github.com/Start9Labs/primal-web-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Built from source in two stages: a Node builder that compiles the app from an upstream git submodule, and an nginx image that serves the result.

| Property      | Value                                                 |
| ------------- | ----------------------------------------------------- |
| Image         | Built from `Dockerfile` — Node builder, nginx runtime |
| Architectures | x86_64, aarch64                                       |
| Command       | `nginx -g 'daemon off;'`                              |

| Subcontainer     | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `primal-web-sub` | The `primary` daemon — the one to `attach` to |

**The build patches out Stripe.** Primal's Premium page imports `@stripe/stripe-js`, whose default entry point injects the `js.stripe.com` loader as an import side effect — before any payment flow is invoked. That is hosted card-payment infrastructure with no meaning on a self-hosted instance, and it would have every page load reach out to Stripe. The build switches to the side-effect-free entry and gates the initializer behind a flag set to off, mirroring an upstream change. The patch is applied with `sed` because the slim builder image ships neither `git` nor `patch`, and a `grep` guard **fails the build loudly** if upstream moves the lines rather than silently shipping an unpatched app.

The build also drops the sourcemaps and Vite manifest upstream emits — about 18 MB that is not needed to serve the app.

**nginx is configured for being behind StartOS's proxy.** Requests arrive carrying a `Via` header, which makes nginx skip gzip entirely unless told otherwise, so compression is explicitly enabled for proxied requests. Content-hashed asset paths are cached for a year; everything else for a week with revalidation.

## Volume and Data Layout

One volume, and effectively nothing in it.

| Volume | Mount Point | Purpose                             |
| ------ | ----------- | ----------------------------------- |
| `main` | `/data`     | Mounted, but the app writes nothing |

**Primal stores nothing on this server.** It is a single-page app: your keys live in your browser or your signer extension, and everything you post or read travels between your browser and the Nostr network directly. The volume exists because a package has one, not because there is state to keep.

## File Models

None. There is no configuration file, no store, and nothing for the package to write — every setting Primal has is either baked in at build time or kept in your browser.

## Dependencies

None. Primal talks to Nostr relays and Primal's caching and media services from your browser, not from this server.

## Network Access and Interfaces

One interface, serving the static app.

| Interface | Id   | Type | Port | Description                 |
| --------- | ---- | ---- | ---- | --------------------------- |
| Web UI    | `ui` | ui   | 80   | The web interface of Primal |

The port is bound on the `ui-multi` MultiHost and is not masked.

**Publishing this address publishes the app, not your data.** Anyone reaching it gets the Primal client with no account attached; they would have to bring their own Nostr key to do anything with it.

## Installation and First-Run Flow

Nothing to configure and nothing to reveal. Install it, start it, open it, and sign in with your Nostr key or a browser signer extension — exactly as you would on any Primal instance. There is no task, no account on this server, and no credential.

## Actions

None. Primal has no server-side configuration to expose, so the package adds no action.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

One check, on the only daemon.

| Check     | Displayed       | Method               |
| --------- | --------------- | -------------------- |
| `primary` | "Web Interface" | Port 80 is listening |

nginx serving static files either starts or does not, so a failure is a configuration or filesystem problem and the service logs name it. Everything else that can go wrong with Primal — feeds not loading, media not appearing — happens in your browser against remote services, and this check cannot see any of it.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. In practice **the backup is empty**, because the app writes nothing.

There is nothing to lose here and nothing a restore brings back. Your Nostr identity is your key, and it is not on this server.

## Limitations and Differences

1. **This hosts the client, not the network.** Your browser still talks directly to Nostr relays and to Primal's caching and media services; self-hosting Primal's caching backend is a separate undertaking and is not part of this package.
2. **The default relay and cache endpoints are Primal's hosted ones**, baked in at build time.
3. **Stripe is patched out**, so the Premium card-payment flow does not function here.
4. **The build fails rather than shipping unpatched** if upstream moves the lines the patch targets.
5. **No server-side state, no accounts, no actions.** Everything is your browser's.
6. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: primal-web
image: ./Dockerfile # Node builder over an upstream git submodule, nginx runtime
architectures:
  - x86_64
  - aarch64
subcontainers:
  - primal-web-sub # the only container
volumes:
  main: /data # mounted but unused
file_models: []
startos_managed_env_vars: []
dependencies: []
interfaces:
  ui: { type: ui, port: 80 }
actions: []
tasks: []
health_checks:
  - primary # displayed "Web Interface"
```
