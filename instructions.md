# Primal

> [!IMPORTANT]
> This package serves Primal's web app as static files from your StartOS. The Nostr relays and Primal's caching / media services your browser talks to are **not** self-hosted — they remain Primal's hosted infrastructure, baked in at build time. If you wanted a self-hosted Primal stack, this isn't it.

## Documentation

- [Primal web app on GitHub](https://github.com/PrimalHQ/primal-web-app/blob/main/README.md) — the upstream README.

## What you get on StartOS

- A single **Web UI** interface serving the Primal Nostr client.
- No server-side state: keys, follows, settings, and direct messages all live in your browser. The volume on this package is reserved and stays effectively empty.

## Getting set up

1. Open the **Web UI** interface.
2. Sign in with one of the standard Nostr options the app offers:
   - **Create a new Nostr account** — Primal generates a keypair in your browser and walks you through onboarding.
   - **Import an existing `nsec`** — paste your private key (browser-side only; nothing is sent to your StartOS).
   - **NIP-07 browser extension** — connect with Alby, nos2x, or another NIP-07 signer you already have installed.

That's it — Primal handles the rest the same way as primal.net.

## Using Primal

Day-to-day use is identical to the hosted Primal app at primal.net, since this is the same single-page app. Browse feeds, post notes, message contacts, and use Primal's advanced search exactly as upstream documents.

Because all state is browser-side, switching browsers or clearing site data signs you out — keep your `nsec` (or NIP-07 extension) backed up the same way you would for any Nostr client.
