# Validation

Written on: mac · codex · November 11, 2026

## Completed checks

- Dependency-free verification script passes: JavaScript syntax, complete scenario records, stable IDs, glossary references, local asset paths, no network APIs in application scripts, and no HTML-string injection.
- All eight Appendix B quotations match the supplied concept exactly. The original concept is preserved byte for byte.
- Both theme palettes meet at least 5.10:1 for the normal-text combinations tested.
- Browser: both comparison eras, glossary open/close and Escape, all nine scenarios through three sequential reveals and a room choice, each room-choice type, and scenario reset.
- Browser: source view contains five caveats and ten source records. Glossary search filters correctly and has a no-results state.
- Browser: focus follows belief selection, scenario selection, revealed answers, navigation and room choices. Reveal controls were exercised with keyboard activation. This was not an exhaustive keyboard-only or screen-reader audit.
- Browser: all five views fit a 375px viewport without horizontal overflow, including the large-text setting. The start view also fits a 320px viewport.
- Browser: large-text preference survives reload. Scenario choices are session-only and reset on reload.
- Browser: a temporary test page that makes local storage throw still supports theme/text controls, reveals and room choices, without console errors. The fixture is excluded from the repository and deployment.
- Browser console checks during local interaction showed no application warnings or errors.

## Limits

The testing browser blocks `file://` navigation. Direct local-file opening could not be exercised, and no alternate browser or workaround was used to bypass that restriction. The implementation uses ordinary relative script and stylesheet paths, has no fetch-based data loading and requires no server APIs. The downloadable offline folder remains suitable for a manual local-file check.

Podcast audio and the historical full texts listed as unread in the source record remain unchecked. The UI states those limits. Browser and palette checks are not a certification of WCAG conformance; a full assistive-technology audit and physical projector check remain useful.

## Reproduce the content checks

```sh
node scripts/check.mjs
```

The page itself requires no Node.js installation, dependencies or build command. Open `index.html`, or serve the repository folder with a static web server.
