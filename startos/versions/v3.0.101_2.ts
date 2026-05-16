import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_3_0_101_2 = VersionInfo.of({
  version: '3.0.101:2',
  releaseNotes: {
    en_US: 'Bumps `@start9labs/start-sdk` to 1.5.2.',
    es_ES: 'Actualiza `@start9labs/start-sdk` a 1.5.2.',
    de_DE: 'Aktualisiert `@start9labs/start-sdk` auf 1.5.2.',
    pl_PL: 'Aktualizuje `@start9labs/start-sdk` do 1.5.2.',
    fr_FR: 'Met à jour `@start9labs/start-sdk` vers 1.5.2.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
