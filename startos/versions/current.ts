import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.0.101:2',
  releaseNotes: {
    en_US: `**Improvements**

- The Premium page no longer loads Stripe's third-party payment script (\`js.stripe.com\`), which isn't used on a self-hosted instance.`,
    es_ES: `**Mejoras**

- La página Premium ya no carga el script de pago de terceros de Stripe (\`js.stripe.com\`), que no se utiliza en una instancia autoalojada.`,
    de_DE: `**Verbesserungen**

- Die Premium-Seite lädt nicht mehr das Zahlungsskript von Stripe (\`js.stripe.com\`), das auf einer selbst gehosteten Instanz nicht verwendet wird.`,
    pl_PL: `**Ulepszenia**

- Strona Premium nie ładuje już zewnętrznego skryptu płatności Stripe (\`js.stripe.com\`), który nie jest używany w instancji hostowanej samodzielnie.`,
    fr_FR: `**Améliorations**

- La page Premium ne charge plus le script de paiement tiers de Stripe (\`js.stripe.com\`), qui n'est pas utilisé sur une instance auto-hébergée.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
