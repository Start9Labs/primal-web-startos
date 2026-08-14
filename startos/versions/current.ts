import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.0.122:0',
  releaseNotes: {
    en_US: `Updated Primal to 3.0.122.

- Notes and replies are now published optimistically, so they show up right away while the relays confirm them.
- Reworked zap handling, reply counting and the event queue.
- Fixes for notification clicks, short-note display, Markdown image rendering, broken images and reloading in incognito mode.
- Updated the DOMPurify sanitizer.

Upstream cuts no release notes; the full commit list is at https://github.com/PrimalHQ/primal-web-app/compare/415952ea...c96ee211`,
    es_ES: `Primal actualizado a 3.0.122.

- Las notas y respuestas ahora se publican de forma optimista, por lo que aparecen de inmediato mientras los relays las confirman.
- Se rediseñó el manejo de zaps, el recuento de respuestas y la cola de eventos.
- Correcciones en los clics de notificaciones, la visualización de notas cortas, el renderizado de imágenes en Markdown, las imágenes rotas y la recarga en modo incógnito.
- Se actualizó el sanitizador DOMPurify.

El proyecto original no publica notas de versión; la lista completa de commits está en https://github.com/PrimalHQ/primal-web-app/compare/415952ea...c96ee211`,
    de_DE: `Primal auf 3.0.122 aktualisiert.

- Notizen und Antworten werden jetzt optimistisch veröffentlicht und erscheinen sofort, während die Relays sie bestätigen.
- Überarbeitete Zap-Verarbeitung, Antwortzählung und Ereigniswarteschlange.
- Korrekturen bei Benachrichtigungsklicks, der Anzeige kurzer Notizen, dem Rendern von Markdown-Bildern, defekten Bildern und dem Neuladen im Inkognito-Modus.
- DOMPurify-Sanitizer aktualisiert.

Upstream veröffentlicht keine Release Notes; die vollständige Commit-Liste steht unter https://github.com/PrimalHQ/primal-web-app/compare/415952ea...c96ee211`,
    pl_PL: `Zaktualizowano Primal do wersji 3.0.122.

- Notatki i odpowiedzi są teraz publikowane optymistycznie, więc pojawiają się od razu, gdy przekaźniki je potwierdzają.
- Przebudowana obsługa zapów, liczenie odpowiedzi i kolejka zdarzeń.
- Poprawki klikania powiadomień, wyświetlania krótkich notatek, renderowania obrazów w Markdown, uszkodzonych obrazów i przeładowania w trybie incognito.
- Zaktualizowano sanitizer DOMPurify.

Projekt źródłowy nie publikuje informacji o wydaniu; pełna lista commitów znajduje się pod adresem https://github.com/PrimalHQ/primal-web-app/compare/415952ea...c96ee211`,
    fr_FR: `Primal mis à jour vers 3.0.122.

- Les notes et les réponses sont désormais publiées de manière optimiste : elles apparaissent immédiatement pendant que les relais les confirment.
- Gestion des zaps, comptage des réponses et file d'attente des événements retravaillés.
- Corrections des clics sur les notifications, de l'affichage des notes courtes, du rendu des images Markdown, des images cassées et du rechargement en navigation privée.
- Assainisseur DOMPurify mis à jour.

Le projet amont ne publie pas de notes de version ; la liste complète des commits est disponible sur https://github.com/PrimalHQ/primal-web-app/compare/415952ea...c96ee211`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
