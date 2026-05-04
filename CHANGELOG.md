### 10.0.0

- BREAKING: bumped `i18next-locize-backend` to v10 and `i18nextify` to v5. Both dropped their `cross-fetch` dependency, so locizify no longer ships the `cross-fetch` / `node-fetch` fallback in its bundle. Native `fetch` is now required (Node ≥ 18, modern browsers, Deno, Bun — all of which ship it). For runtimes without native `fetch`, supply a ponyfill yourself before loading this script, or stay on v9.
- BREAKING: minimum Node version is now 18 (`engines.node = ">=18"`), inherited from the upstream bumps.
- BREAKING: dropped the AMD output format. The `build:amd` script had been silently emitting UMD anyway (typo: `--format umd --uglify` instead of `--format amd --uglify`), so no real consumers existed. Major bump covers the formal removal.
- build: replaced babel + rollup 1 + terser with [`tsdown`](https://tsdown.dev) (rolldown + oxc). One config produces ESM, CJS, and IIFE bundles. Output layout collapsed from `dist/{commonjs,es,umd,amd}/` to `dist/{cjs,esm}/`. The root `locizify.js` / `locizify.min.js` are emitted directly by tsdown, no `cp` step needed. `package.json#exports` map added.
- build: minified browser bundle: 245 KB → 219 KB (−11%); unminified 495 KB → 402 KB (−19%).
- chore: declared `"type": "module"` and `"sideEffects": false`.
- chore: dropped 13 dev dependencies (`@babel/*` × 10 including the deprecated `@babel/polyfill`, `rollup-plugin-*` × 5, `mkdirp`, `rimraf`, `yargs`). Net devDeps: 17 → 4. Vulnerabilities: down to 0.
- chore: ESLint config converted from CommonJS (`eslint.config.js` with `require`) to ESM (`eslint.config.mjs` with `import`) since the package is now `"type": "module"`. neostandard rules unchanged.
- chore: tightened `.npmignore` — `example/` (with all its built assets / fonts / images) was leaking into the published tarball; added `example`, `.vscode`, plus the new `tsdown.config.ts`. Tarball: 4.7 MB → 175 KB (−96%); files: 567 → 8.
- chore: added `.github/workflows/node.yml` — first CI workflow for this repo. Runs lint + build on Node 20 / 22 / 24.
- docs: bumped CDN script-tag pins in README from `@^9.0.3` to `@^10`. Added v10 migration callout.

### 9.0.11

- update locize dep

### 9.0.10

Security release — includes upstream fixes from `i18next-locize-backend`, `i18nextify`, and `locize`.

- security: emit a one-time `console.warn` when `?apikey=` or `?projectid=` is read from the URL query string on a non-local host (anything other than `localhost`, `127.0.0.1`, `::1`, `*.localhost`, `*.local`). The feature itself is preserved — an attacker-crafted link on a production host could otherwise silently redirect translations (and `saveMissing` writes) to an attacker-chosen locize project (CWE-522); the warning is there so maintainers notice when it happens and can decide to disable the URL-credential path in their deployment. Prefer configuring credentials via the `<script id="locizify" apikey="…" projectid="…">` attributes, which are not attacker-controllable.
- chore: bump pinned deps (security releases): `i18next-locize-backend` 9.0.1 → **9.0.2** ([GHSA-mgcp-mfp8-3q45](https://github.com/locize/i18next-locize-backend/security/advisories/GHSA-mgcp-mfp8-3q45)), `i18nextify` 4.0.7 → **4.0.8** ([GHSA-6457-mxpq-4fqq](https://github.com/i18next/i18nextify/security/advisories/GHSA-6457-mxpq-4fqq)), `locize` 4.0.16 → **4.0.21** ([GHSA-w937-fg2h-xhq2](https://github.com/locize/locize/security/advisories/GHSA-w937-fg2h-xhq2)).
- chore: ignore `.env*` and `*.pem`/`*.key` files in `.gitignore`.

### 9.0.9

- update i18nextify

### 9.0.8

- update i18nextify

### 9.0.7

- update i18nextify

### 9.0.6

- update i18nextify

### 9.0.5

- update i18nextify

### 9.0.4

- update i18next and locize deps

### 9.0.3

- update locize dep

### 9.0.2

- update i18next-locize-backend

### 9.0.1

- update i18nextify

### 9.0.0

- update i18next-locize-backend
- changed default cdnType to "standard" instead of "prod"

### 8.0.2

- update i18next-locize-backend

### 8.0.1

- update i18next-locize-backend

### 8.0.0

- update i18next-locize-backend
- log/error is shown if cdnType is not defined, because of changing default to 'standard' instead of 'pro'

### 7.0.4

- update i18next-locize-backend

### 7.0.3

- update i18next-locize-backend

### 7.0.2

- update i18next-locize-backend

### 7.0.1

- update i18next-locize-backend

### 7.0.0

- update i18next and locize dependencies to the current major versions
  - for more information read:
    - https://github.com/i18next/i18nextify/blob/master/CHANGELOG.md#400
    - https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2400
    - https://github.com/i18next/i18next-http-backend/blob/master/CHANGELOG.md#300
    - https://github.com/i18next/i18next-browser-languageDetector/blob/master/CHANGELOG.md#800
    - https://github.com/locize/i18next-locize-backend/blob/master/CHANGELOG.md#700

### 6.1.5

- update locize script for incontext editor (improvement for firefox)

### 6.1.4

- update locize script for incontext editor (start i18next-subliminal only if popup or in iframe)

### 6.1.3

- update locize script for incontext editor (added classes and zindex for better modal support)

### 6.1.2

- update locize script for incontext editor

### 6.1.1

- update locize script for incontext editor

### 6.0.12

- update i18next-locize-backend and i18nextify dep (before next major versions)

### 6.0.11

- update i18next-locize-backend dep

### 6.0.10

- update i18next and locize deps

### 6.0.9

- update locize plugin

### 6.0.8

- update locize plugin

### 6.0.7

- update locize plugin

### 6.0.6

- update locize plugin

### 6.0.5

- update locize plugin

### 6.0.4

- update locize plugin

### 6.0.3

- update locize plugin

### 6.0.2

- update locize plugin

### 6.0.1

- update locize plugin

### 6.0.0

- major update of locize plugin
- showLocizeLink has been removed, since conflicting with new incontext editor

### 5.5.1

- update deps

### 5.5.0

- update deps

### 5.4.0

- optional data-\* attributes for script tag usage

### 5.3.3

- ignoreTags support for SVG

### 5.3.2

- get apikey from query param as fallback

### 5.3.1

- optimize autopilot handling

### 5.3.0

- add possibility to read locize options also from url if option not defined

### 5.2.11

- update i18nextify dependency

### 5.2.10

- update dependencies

### 5.2.9

- update locize dependency

### 5.2.8

- update locize dependency

### 5.2.7

- on languageChanged, update document language

### 5.2.6

- export setEditorLng
- update locize dependency

### 5.2.5

- update locize dependency

### 5.2.4

- update locize dependency

### 5.2.3

- update i18next dependencies

### 5.2.2

- update i18next dependencies

### 5.2.1

- update i18next dependencies

### 5.2.0

- update i18next dependencies

### 5.1.0

- update locize dependecy and expose editor functions turnOn/Off

### 5.0.6

- update locize dependencies

### 5.0.5

- update locize dependencies

### 5.0.4

- update i18next dependencies

### 5.0.3

- update i18next dependencies
- remove old locize-editor

### 5.0.2

- update i18nextify dependency

### 5.0.1

- update i18nextify dependency

### 5.0.0

- update to major i18next version

### 4.2.0

- update i18next dependencies

### 4.1.4

- update locize-editor dependency

### 4.1.3

- update locize dependency

### 4.1.2

- update locize dependency

### 4.1.1

- update locize dependency

### 4.1.0

- should now work for new and for old client

### 4.0.11

- lookup load option in html element

### 4.0.10

- update dependencies

### 4.0.9

- update dependencies

### 4.0.8

- update dependencies

### 4.0.7

- update i18nextify

### 4.0.6

- update dependencies

### 4.0.5

- update dependencies

### 4.0.4

- update dependencies

### 4.0.3

- update dependencies

### 4.0.2

- update dependencies

### 4.0.1

- update dependencies

### 4.0.0

- update major dependencies

### 3.1.3

- update dependencies

### 3.1.2

- update dependencies and introduce allowedAddOrUpdateHost option

### 3.1.1

- update dependencies

### 3.1.0

- update dependencies

### 3.0.1

- update dependencies

### 3.0.0

- update deps using `locize.app` instead of `locize.io`
- remove bower

### 2.15.1

- update deps

### 2.15.0

- use the forceRerender on i18nextify to make the DX nicer

### 2.14.2

- append editor reloadOnSave also if having editor options set already

### 2.14.1

- update editor

### 2.14.0

- update locize-editor, i18next-locize-backend
- adds option bindSavedMissing (default true)

### 2.13.2

- update locize-editor version

### 2.13.1

- update locize-editor version

### 2.13.0

- editor now by default opens the project instead of dashboard

### 2.12.0

- update editor and backend

### 2.11.0

- update i18nextify to allow key usage `keyAttr: 'i18next-key'`, `ignoreWithoutKey: false`

### 2.10.0

- update dependencies (adds host check for add, update)

### 2.9.1

- just republish on unpkg

### 2.9.0

- make all options configurable via script attributes

### 2.8.0

- support for reloadOnSave

### 2.7.0

- update dependencies

### 2.6.0

- update dependencies
- introduce autoPilot option

### 2.5.0

- update to locize-editor enabling passthrough of keypress from iframe to editor for toggling on/off

### 2.4.0

- update dependencies

### 2.3.0

- update editor with new non follow link behaviour

### 2.2.0

- update editor with new default mode iframe

### 2.1.1

- fix in cimode lng for editor

### 2.1.0

- adds editor linking module

### 2.0.1

- browser entrypoint

### 2.0.0

- update dependencies
- breaking new defaults enabling cleaning per default

### 1.6.1

- take both properties and atrributes on properties for translating

### 1.6.0

- update i18next dependencies
- allow setting translateAttributes in init options (incl. conditions)

### 1.5.0

- improve merge
- fix issue with walk over merge on next dom change

### 1.4.0

- better merge, more options

### 1.3.0

- introduces merge, clean feature in backward compatible way...expect a breaking major version in future enabling this as default

### 1.2.2

- fixes issue in safari using the fragment replacement for src and href
- update all dependencies

### 1.2.1

- updates i18nextify fixing not translating virtualtext nodes already translated

### 1.2.0

- adds module entry point for webpack 2
- updates dependencies
- updates build chain
