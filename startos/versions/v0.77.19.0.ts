import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_0_77_19_0 = VersionInfo.of({
  version: '0.77.19:0',
  releaseNotes: {
    en_US: 'Initial Primal Web App release for StartOS.',
    es_ES: 'Lanzamiento inicial de Primal Web App para StartOS.',
    de_DE: 'Erste Veröffentlichung der Primal-Web-App für StartOS.',
    pl_PL: 'Pierwsze wydanie Primal Web App dla StartOS.',
    fr_FR: 'Première publication de Primal Web App pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
