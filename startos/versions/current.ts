import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.0.101:1',
  releaseNotes: {
    en_US: `**Internal**

- Bump \`@start9labs/start-sdk\` to 1.5.0.`,
    es_ES: `**Interno**

- Actualización de \`@start9labs/start-sdk\` a 1.5.0.`,
    de_DE: `**Intern**

- \`@start9labs/start-sdk\` auf 1.5.0 aktualisiert.`,
    pl_PL: `**Wewnętrzne**

- Aktualizacja \`@start9labs/start-sdk\` do 1.5.0.`,
    fr_FR: `**Interne**

- Mise à jour de \`@start9labs/start-sdk\` vers 1.5.0.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
