import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'primal-web',
  title: 'Primal',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/primal-web-startos',
  upstreamRepo: 'https://github.com/PrimalHQ/primal-web-app',
  marketingUrl: 'https://primal.net/',
  donationUrl: 'https://primal.net/',
  docsUrls: [
    'https://github.com/PrimalHQ/primal-web-app/blob/main/README.md',
  ],
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerBuild: {},
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
