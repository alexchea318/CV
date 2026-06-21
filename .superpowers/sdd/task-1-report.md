# Task 1 Report: Scaffold Next.js static-export project & retire legacy site

## Status: DONE

## What Was Implemented

Followed all 9 steps of the brief in order:

1. **package.json + deps**: `npm init -y` then installed `next@15.5.19`, `react@19.2.7`, `react-dom@19.2.7` and all dev deps with stable Tailwind v4 (`tailwindcss@4.3.1`, `@tailwindcss/postcss@4.3.1`) instead of `@next` tags per ambiguity resolution #1. Added `"type": "module"` to fix vitest ESM loading issue.

2. **Scripts**: Replaced default test script with the five scripts: `dev`, `build`, `start`, `lint`, `test`.

3. **next.config.ts**: Created with `output: "export"`, `images: { unoptimized: true }`, `trailingSlash: true`.

4. **tsconfig.json + .nvmrc**: Exact content from brief. `.nvmrc` contains `22`.

5. **Image migration + legacy removal**: Copied all `img/*.{jpg,png,svg}` to `public/img/`, `img/favicon.png` to `public/favicon.png`. Ran `git rm -r` on `index.html`, `js/`, `styles/`, `json/`, `img/`. Git tracked renames cleanly (R flags).

6. **App skeleton**: Created `app/layout.tsx` (returns children), `app/[lang]/layout.tsx` (with `generateStaticParams` for `ru`/`en`, async `params`), `app/[lang]/page.tsx` (renders "FullStack AI Engineer").

7. **Vitest**: `vitest.config.ts` with react plugin and jsdom default. `tests/build-output.test.ts` with `// @vitest-environment node` override (needed because jsdom environment's CSS deps have ESM/CJS conflicts that cause startup failure).

8. **postcss.config.mjs**: Added per ambiguity resolution #4 with `@tailwindcss/postcss` plugin.

9. **Updated .gitignore**: Added `node_modules/`, `.next/`, `out/`, `*.tsbuildinfo`.

## Test Results

Command: `npm run build && npm test`

```
> cv@1.0.0 build
> next build

   ▲ Next.js 15.5.19
 ✓ Compiled successfully in 1013ms
 ✓ Generating static pages (5/5)
 ✓ Exporting (2/2)

Route (app)                     Size  First Load JS
├ ○ /_not-found                994 B        103 kB
└ ● /[lang]                    131 B        103 kB
    ├ /ru
    └ /en

> cv@1.0.0 test
> vitest run

 RUN  v4.1.9 /Users/apple/Documents/Work/me/CV

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  16:07:29
   Duration  136ms
```

`out/ru/index.html` and `out/en/index.html` both exist. `out/ru/index.html` contains "FullStack AI Engineer". ✓

## Files Changed

**Created:**
- `package.json`, `package-lock.json`
- `next.config.ts`, `tsconfig.json`, `.nvmrc`, `next-env.d.ts`
- `postcss.config.mjs`
- `vitest.config.ts`
- `app/layout.tsx`, `app/[lang]/layout.tsx`, `app/[lang]/page.tsx`
- `tests/build-output.test.ts`
- `public/favicon.png`, `public/img/*` (15 image files migrated)

**Modified:**
- `.gitignore` (added Node/Next.js ignores)

**Deleted (legacy site):**
- `index.html`, `js/script.js`
- `json/experience.json`, `json/mouse.json`, `json/posts.json`, `json/prog.json`
- `styles/content.css`, `styles/default.css`, `styles/mobile.css`, `styles/fonts/*.ttf`
- `img/` directory (all files renamed/moved to `public/img/`)

## Self-Review Findings

- No overbuild: no extra pages, no extra config beyond what was specified.
- The brief's npm command used `@next` tags; per ambiguity resolution #1, stable versions were used instead (Tailwind 4.3.1, not `@next`). This is correct.
- `"type": "module"` was added to `package.json` — not in the brief, but required for vitest to load ESM deps. This is an additive change that doesn't affect Next.js behavior.
- The `// @vitest-environment node` comment was added to `tests/build-output.test.ts` (not in the brief verbatim) to avoid a CJS/ESM startup crash in the jsdom pool caused by `@asamuzakjp/css-color` → `@csstools/css-calc`. The test still tests exactly what was specified.
- `public/img/favicon.png` appears as both a rename (`img/favicon.png → public/img/favicon.png`) and a new addition (`public/img/favicon.png`) in git status because `public/favicon.png` was also created separately. Both files exist correctly.
- No root `/` page — as expected per the brief's note and ambiguity resolution #3. `out/` contains `_not-found/` for the 404 route but no `out/index.html`. Root redirect is deferred to Task 3.

## Concerns

- **No root `/` page**: `out/index.html` is not emitted. Visiting the root URL serves nothing until Task 3 adds the redirect. This is by design per the brief.
- **`public/img/favicon.png` duplication**: `favicon.png` exists in both `public/favicon.png` (correct location for browser tab icon) and `public/img/favicon.png` (migrated from `img/`). The `public/img/` copy is benign but technically redundant.
- **TypeScript 6.0.3**: Installed (latest stable). Brief didn't specify a TS version, so this is fine.

---

## Fix Round 1

### What was changed

1. **Pinned `jsdom` to `^26`** (`npm install -D jsdom@^26`): downgraded from `^27.0.1` to `^26.1.0`. This removes the problematic `@asamuzakjp/css-color` / `@csstools/css-calc` transitive deps that caused a jsdom startup crash in the default pool. `npm install` updated `package-lock.json` accordingly (removed 10 packages, changed 18 packages).

2. **Removed `// @vitest-environment node` override** from `tests/build-output.test.ts`: the file now matches the brief's verbatim content. `vitest.config.ts` keeps `test.environment: "jsdom"` as the global default (unchanged).

3. **Deleted `public/img/favicon.png`**: the redundant copy of favicon that had been migrated from the legacy `img/` folder. The canonical `public/favicon.png` remains.

4. **Removed `"main": "index.js"` and `"directories": { "doc": "docs" }`** from `package.json`: leftover `npm init -y` artifacts, not applicable to a Next.js app.

### jsdom smoke-test command and output

```
$ npx vitest run tests/_jsdom-smoke.test.tsx

 RUN  v4.1.9 /Users/apple/Documents/Work/me/CV

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  16:12:22
   Duration  438ms (transform 20ms, setup 0ms, import 86ms, tests 16ms, environment 216ms)
```

Smoke test (`tests/_jsdom-smoke.test.tsx`) rendered `<div>hi</div>` with `@testing-library/react` and asserted `toBeInTheDocument()` — PASSED. File deleted after confirming pass.

Note: `@testing-library/jest-dom` must be imported explicitly in each test file (or via a `setupFiles` entry) for jest-dom matchers to be available; future component tests (tasks 6–8) should add a `setupFiles: ["@testing-library/jest-dom"]` entry to `vitest.config.ts`.

### Final `npm run build && npm test` output

```
> cv@1.0.0 build
> next build

   ▲ Next.js 15.5.19
 ✓ Compiled successfully in 1069ms
 ✓ Generating static pages (5/5)
 ✓ Exporting (2/2)

Route (app)                                 Size  First Load JS
┌ ○ /_not-found                            994 B         103 kB
└ ● /[lang]                                131 B         103 kB
    ├ /ru
    └ /en

> cv@1.0.0 test
> vitest run

 RUN  v4.1.9 /Users/apple/Documents/Work/me/CV

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  16:12:40
   Duration  343ms
```
