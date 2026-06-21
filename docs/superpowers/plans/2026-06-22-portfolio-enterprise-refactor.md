# Portfolio Enterprise Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Привести код сайта-резюме к Enterprise-уровню без изменения визуала: SCSS Modules + BEM, структура `src/` (папка-на-компонент), вынос всей behavior-логики в хуки, устранение дубликатов, лимит ≤100 строк/компонент.

**Architecture:** Next.js 15 App Router, `output: "export"` (статический SSG), React 19. Глобальный `globals.css` остаётся CSS (Tailwind `@import` + `@theme`). Компонентные стили — `*.module.scss` с BEM. Цвета/ease — runtime `var(--*)`; общие воксы — SCSS-миксины. Поведение — хуки в `src/hooks/`.

**Tech Stack:** Next.js 15.5, React 19, TypeScript, Tailwind v4 (только тривиальное, ≤3 утилиты), Sass (dart-sass), puppeteer (финальная сверка).

## Global Constraints

- **Сборки/сверки — только в финальной задаче** (Task 17). Промежуточных `build`/`lint` нет. Каждая задача завершается коммитом.
- **Стили:** SCSS Modules + BEM (`block__element--modifier`). Tailwind допустим только ≤3 тривиальных утилиты на элемент. Запрещён inline-`style` КРОМЕ проброса CSS-переменной для truly-dynamic числовых значений.
- **Логика:** вся behavior-логика — в `src/hooks/`. Запрещён императивный DOM (`createElement`/`innerHTML`/`cssText`) в компонентах.
- **Размер:** каждый компонент ≤100 строк.
- **DRY:** ноль дубликат-констант (`ink`, `inkMuted`, `EASE`, инлайн `cubic-bezier`) — только токены `var(--ink)`, `var(--ease)`, `var(--color-*)`.
- **Структура:** в корне любой папки — либо компонент (`Name.tsx` + `name.module.scss` + `index.ts`), либо вложенная папка.
- **Алиас:** `@/*` → `./src/*`.
- **Визуал не меняется**: контент, цвета, размеры, анимации идентичны исходнику.
- Коммиты заканчиваются строкой: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## File Structure

**Net-new (полный код в плане):**
- `src/styles/_tokens.scss`, `_mixins.scss`, `_breakpoints.scss`
- `src/lib/cx.ts`
- `src/hooks/useMediaQuery.ts`, `useReveal.ts`, `useCountUp.ts`, `useMobileMenu.ts`, `useRagDemo.ts`
- `src/hooks/interactions/{useParallax,useHoverAffordance,useCursor,useMagnetic,index}.ts`
- `src/components/Cursor/{Cursor.tsx,cursor.module.scss,index.ts}`

**Перенос без изменений логики:** `src/lib/{i18n,config,tenure}.ts`, `src/content/site.ts`, `src/app/*`.

**Рефактор (вёрстка из старых файлов → BEM + module.scss):** все секции в `src/components/sections/*` + `src/components/primitives/*` + `src/components/Portfolio/*`.

**Конфиг:** `tsconfig.json`, `next.config.ts`, `package.json`, `CLAUDE.md`.

---

## Task 0: Baseline-скриншоты

**Files:** none (артефакты во временной папке вне репо).

- [ ] **Step 1:** Запустить dev-сервер в фоне: `npm run dev` (порт 3000).
- [ ] **Step 2:** Через puppeteer MCP снять эталоны в scratchpad: для каждого из URL `http://localhost:3000/` и `http://localhost:3000/en/` — два скриншота (viewport 1440×900 desktop и 390×844 mobile), полностраничные. Имена: `baseline-ru-desktop.png`, `baseline-ru-mobile.png`, `baseline-en-desktop.png`, `baseline-en-mobile.png`.
- [ ] **Step 3:** Остановить dev-сервер. Скриншоты не коммитятся — это эталон для финальной сверки (Task 17). Зафиксировать пути в заметке.

Коммита нет (нет файлов в репо).

---

## Task 1: Фундамент — sass, переезд в src/, конфиги

**Files:**
- Modify: `package.json` (devDependency `sass`)
- Move: `app/` → `src/app/`, `lib/` → `src/lib/`, `content/` → `src/content/`, `components/` → `src/components/` (последнее — для последующего рефактора на месте)
- Modify: `tsconfig.json`, `next.config.ts`
- Delete: `global.d.ts` (если пустой/неактуальный — проверить)

**Interfaces:**
- Produces: алиас `@/*` → `src/*`; SCSS `includePaths: ['src/styles']` (модули смогут `@use 'mixins' as m;`).

- [ ] **Step 1:** Установить sass: `npm i -D sass`.

- [ ] **Step 2:** Перенести папки в `src/` через `git mv` (сохраняет историю):

```bash
mkdir -p src
git mv app src/app
git mv lib src/lib
git mv content src/content
git mv components src/components
```

- [ ] **Step 3:** Обновить `tsconfig.json` — заменить путь и include:

```jsonc
// compilerOptions.paths:
"paths": { "@/*": ["./src/*"] }
// include:
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
```

- [ ] **Step 4:** Обновить `next.config.ts` — добавить sassOptions:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  sassOptions: { includePaths: ["src/styles"] },
};

export default nextConfig;
```

- [ ] **Step 5:** Проверить `global.d.ts` — если содержит только устаревшее, удалить; иначе оставить. (Next сам генерит `next-env.d.ts`.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: move code into src/, add sass, update paths"
```

---

## Task 2: SCSS-фундамент (tokens, mixins, breakpoints) + cx

**Files:**
- Create: `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/styles/_breakpoints.scss`
- Create: `src/lib/cx.ts`

**Interfaces:**
- Produces:
  - `@use 'mixins' as m;` → `m.mono`, `m.display`, `m.gutter`, `m.grad-text`, `m.grad-text-static`, `m.nav-pill` (placeholder-селекторы `%`).
  - `@use 'breakpoints' as bp;` → `@include bp.desktop { }`, `@include bp.mobile { }`, `@include bp.no-hover { }`.
  - `cx(...args: Array<string | false | null | undefined>): string` — склейка классов.

- [ ] **Step 1:** Создать `src/styles/_breakpoints.scss`:

```scss
// Desktop/mobile swap point — matches the original 820/821px boundary.
@mixin desktop { @media (min-width: 821px) { @content; } }
@mixin mobile  { @media (max-width: 820px) { @content; } }
@mixin no-hover { @media (hover: none), (pointer: coarse) { @content; } }
@mixin reduced-motion { @media (prefers-reduced-motion: reduce) { @content; } }
```

- [ ] **Step 2:** Создать `src/styles/_tokens.scss` (SCSS-зеркало — только для compile-time; рантайм-значения берём из `var(--*)`):

```scss
// Compile-time mirror of the @theme tokens in globals.css.
// Prefer runtime var(--*) in modules; use these only in maps/calc.
$ink: #17150f;
$bg: #f3ebdd;
$panel: #ece2d0;
$red: #d21306;
$orange: #ff7543;
$violet: #8e4ec6;
$green: #30a46c;
$ease: cubic-bezier(0.16, 1, 0.3, 1);

@function ink-a($a) { @return rgba($ink, $a); }
```

- [ ] **Step 3:** Создать `src/styles/_mixins.scss` (placeholder-селекторы для `@extend`/`@include`):

```scss
@use 'tokens' as t;

@mixin mono {
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
}
@mixin display {
  font-family: var(--font-display);
  letter-spacing: -0.03em;
  line-height: 0.9;
}
@mixin gutter { padding-inline: var(--gutter); }

@mixin grad-text {
  background: linear-gradient(110deg, var(--color-red), var(--color-orange), var(--color-violet));
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: axc-pan 9s linear infinite;
  @media (prefers-reduced-motion: reduce) { animation: none; }
}
@mixin grad-text-static {
  background: linear-gradient(110deg, var(--color-red), var(--color-orange));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

// Frosted backdrop behind nav logo / links / menu.
@mixin nav-pill {
  background: rgba(243, 235, 221, 0.72);
  backdrop-filter: blur(12px) saturate(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.1);
  border: 1px solid rgba(23, 21, 15, 0.08);
  box-shadow: 0 6px 24px rgba(23, 21, 15, 0.07);
}
```

- [ ] **Step 4:** Создать `src/lib/cx.ts`:

```ts
/** Join truthy class names. Tiny clsx for conditional/BEM modifiers. */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}
```

- [ ] **Step 5: Commit**

```bash
git add src/styles src/lib/cx.ts
git commit -m "feat: scss tokens, mixins, breakpoints + cx helper"
```

---

## Task 3: globals.css — почистить, убрать utility-классы, оставить базу

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: глобально доступные `@keyframes` (axc-marquee/cue/pan/pulse/reveal/blink), CSS-переменные `--ease/--gutter/--ink/--bg`, reset, reduced-motion для keyframes. Утилиты `.mono/.display/.gutter/.grad-text/.nav-pill/.dt-only/.mb-only/.cap-row/.cap-stack/.reveal/.marquee-track/.blink` УДАЛЕНЫ (переехали в миксины/модули).

- [ ] **Step 1:** Переписать `src/app/globals.css` — оставить только то, что должно быть глобальным. Удалить блоки `.gutter/.mono/.display/.grad-text*/.reveal*/.marquee-track/.blink*/.nav-pill/.dt-only/.mb-only/.cap-row/.cap-stack` (они теперь в миксинах и модулях). СОХРАНИТЬ: импорт шрифтов, `@import "tailwindcss"`, `@theme`, `:root`, reset (`*`, `html`, `body`, `::selection`, `a`), все `@keyframes`, `@media (hover:none)` для курсора, `@media (prefers-reduced-motion)` (но из reduced-блока убрать правила для удалённых классов — оставить `html scroll-behavior`, и реально используемые `[data-cue]`/`[data-pulse]` если останутся; `.reveal`/`.grad-text`/`.marquee-track`/`.blink` reduced-motion теперь в модулях/миксинах).

Финальный `globals.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap");
@import "tailwindcss";

@theme {
  --color-bg: #f3ebdd;
  --color-ink: #17150f;
  --color-panel: #ece2d0;
  --color-red: #d21306;
  --color-orange: #ff7543;
  --color-violet: #8e4ec6;
  --color-violet-soft: #a78bfa;
  --color-green: #30a46c;
  --font-sans: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: "Manrope", sans-serif;
  --font-mono: "JetBrains Mono", source-code-pro, Menlo, Monaco, Consolas, monospace;
}

:root {
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --gutter: 6vw;
  --ink: #17150f;
  --bg: #f3ebdd;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
::selection { background: var(--ink); color: var(--bg); }
a { color: inherit; text-decoration: none; }

@keyframes axc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes axc-cue { 0% { transform: translateY(0); opacity: .9; } 60% { opacity: .15; } 100% { transform: translateY(16px); opacity: 0; } }
@keyframes axc-pan { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
@keyframes axc-pulse { 0%, 100% { opacity: .35; transform: scale(1); } 50% { opacity: 1; transform: scale(1.25); } }
@keyframes axc-reveal { from { opacity: 0; transform: translateY(42px); } to { opacity: 1; transform: translateY(0); } }
@keyframes axc-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

@media (hover: none), (pointer: coarse) {
  [data-cursor-ring], [data-cursor-dot] { display: none !important; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  [data-cue] { animation: none !important; }
  [data-pulse] { animation: none !important; opacity: 1 !important; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: slim globals.css to base/theme/keyframes, drop utility classes"
```

---

## Task 4: Хуки — useMediaQuery, useReveal, useCountUp, useMobileMenu

**Files:**
- Create: `src/hooks/useMediaQuery.ts`, `src/hooks/useReveal.ts`, `src/hooks/useCountUp.ts`, `src/hooks/useMobileMenu.ts`

**Interfaces:**
- Produces:
  - `useMediaQuery(query: string): boolean` — SSR-safe (false до маунта).
  - `useReveal<T extends HTMLElement>(delay?: number): RefObject<T | null>` — навешивает `data-reveal`, добавляет `is-visible` через IntersectionObserver.
  - `useCountUp(to: number): { ref: RefObject<HTMLSpanElement | null>; value: number }`.
  - `useMobileMenu(): { open: boolean; toggle: () => void; close: () => void }`.

- [ ] **Step 1:** `src/hooks/useMediaQuery.ts`:

```ts
"use client";
import { useEffect, useState } from "react";

/** SSR-safe reactive media query. Returns false until mounted to match hydration. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}
```

- [ ] **Step 2:** `src/hooks/useReveal.ts` (логика из `Reveal.tsx`):

```ts
"use client";
import { useEffect, useRef, type RefObject } from "react";

/** Scroll-reveal: hides element, fades it up when it enters the viewport.
 *  Degrades to visible if IntersectionObserver is unavailable. */
export function useReveal<T extends HTMLElement>(delay = 0): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-reveal", "");
    if (delay) el.style.animationDelay = `${delay}ms`;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}
```

- [ ] **Step 3:** `src/hooks/useCountUp.ts` (логика из `CountUp.tsx`):

```ts
"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

/** Animated count-up to `to`, triggered when scrolled into view.
 *  Honors reduced-motion (jumps to final value). */
export function useCountUp(to: number): {
  ref: RefObject<HTMLSpanElement | null>;
  value: number;
} {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setValue(to);
      return;
    }
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || done) continue;
          done = true;
          io.disconnect();
          const dur = 1100;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const k = 1 - Math.pow(1 - p, 3);
            setValue(Number((to * k).toFixed(1)));
            if (p < 1) requestAnimationFrame(step);
            else setValue(to);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return { ref, value };
}
```

- [ ] **Step 4:** `src/hooks/useMobileMenu.ts` (логика из `Nav.tsx`):

```ts
"use client";
import { useEffect, useState } from "react";

/** Mobile-menu open state, auto-closing on hash navigation and Escape. */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onHash = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return { open, toggle: () => setOpen((v) => !v), close: () => setOpen(false) };
}
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks
git commit -m "feat: extract useMediaQuery, useReveal, useCountUp, useMobileMenu hooks"
```

---

## Task 5: useRagDemo — переписать императивный DOM в state-машину

**Files:**
- Create: `src/hooks/useRagDemo.ts`

**Interfaces:**
- Consumes: `ragDemo` from `@/content/site`, `useLang` from `@/components/primitives/T` (создаётся в Task 7 — на момент исполнения Task 7 уже сделан; см. порядок). Для развязки: хук импортирует `useLang` из `@/components/lang` ВРЕМЕННО? Нет — Task 7 идёт раньше по факту исполнения (см. примечание). Импорт: `import { useLang } from "@/components/primitives/T";`
- Produces: `useRagDemo(): { messages: RagMessage[]; phase: "idle"|"retrieving"|"answering" }` и типы:

```ts
export type RagChip = { text: string; shown: boolean };
export type RagMessage =
  | { kind: "user"; text: string }
  | { kind: "retrieving"; label: string }
  | { kind: "sources"; chips: RagChip[] }
  | { kind: "bot"; text: string };
```

**Примечание по порядку:** Task 7 (примитив `T`/`LangProvider`) исполняется раньше Task 5 фактически НЕТ — Task 5 < Task 7 по номеру. Чтобы избежать циклической блокировки, `useRagDemo` импортирует `useLang` из `@/components/lang` (старое расположение остаётся валидным до Task 7, где `lang.tsx` переезжает в `primitives/T`). **Действие:** в Task 7 при переезде `lang.tsx` обновить импорт здесь на `@/components/primitives/T`. Зафиксировано в Task 7 Step.

- [ ] **Step 1:** Создать `src/hooks/useRagDemo.ts`. Декларативная state-машина, воспроизводящая тайминги оригинала (type 28ms/15ms, паузы 420/560/130/420/2800ms). Под reduced-motion — один статичный обмен:

```ts
"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/components/lang";
import { ragDemo } from "@/content/site";

export type RagChip = { text: string; shown: boolean };
export type RagMessage =
  | { kind: "user"; text: string }
  | { kind: "retrieving"; label: string }
  | { kind: "sources"; chips: RagChip[] }
  | { kind: "bot"; text: string };

export type RagState = { messages: RagMessage[] };

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(() => (signal.aborted ? reject() : resolve()), ms);
    signal.addEventListener("abort", () => { clearTimeout(id); reject(); }, { once: true });
  });

export function useRagDemo(): RagState {
  const { lang } = useLang();
  const [messages, setMessages] = useState<RagMessage[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const d = ragDemo.items[0];
      setMessages([
        { kind: "user", text: d.q[lang] },
        { kind: "sources", chips: d.src.map((s) => ({ text: s, shown: true })) },
        { kind: "bot", text: d.a[lang] },
      ]);
      return;
    }
    const ac = new AbortController();
    const { signal } = ac;
    const set = (m: RagMessage[]) => { if (!signal.aborted) setMessages(m); };

    (async function run() {
      try {
        let i = 0;
        while (!signal.aborted) {
          const d = ragDemo.items[i % ragDemo.items.length];
          // type question
          for (let c = 0; c <= d.q[lang].length; c++) {
            set([{ kind: "user", text: d.q[lang].slice(0, c) }]);
            await wait(28, signal);
          }
          await wait(420, signal);
          set([{ kind: "user", text: d.q[lang] }, { kind: "retrieving", label: ragDemo.retrieving[lang] }]);
          await wait(560, signal);
          // reveal chips one by one
          const chips: RagChip[] = d.src.map((s) => ({ text: s, shown: false }));
          for (let k = 0; k < chips.length; k++) {
            await wait(130, signal);
            chips[k] = { ...chips[k], shown: true };
            set([
              { kind: "user", text: d.q[lang] },
              { kind: "retrieving", label: ragDemo.retrieving[lang] },
              { kind: "sources", chips: [...chips] },
            ]);
          }
          await wait(420, signal);
          // type answer (retrieving row removed)
          for (let c = 0; c <= d.a[lang].length; c++) {
            set([
              { kind: "user", text: d.q[lang] },
              { kind: "sources", chips },
              { kind: "bot", text: d.a[lang].slice(0, c) },
            ]);
            await wait(15, signal);
          }
          await wait(2800, signal);
          i++;
        }
      } catch { /* aborted */ }
    })();

    return () => ac.abort();
  }, [lang]);

  return { messages };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useRagDemo.ts
git commit -m "feat: useRagDemo state machine (replaces imperative DOM building)"
```

---

## Task 6: Interactions-хуки (cursor, magnetic, parallax, hover-affordance)

**Files:**
- Create: `src/hooks/interactions/useParallax.ts`, `useHoverAffordance.ts`, `useCursor.ts`, `useMagnetic.ts`, `index.ts`

**Interfaces:**
- Produces: `useInteractions(): void` — оркестратор, навешивающий все эффекты (вызывается из `Cursor`/`Portfolio`). Каждый под-хук — `void`, гейтит сам себя (fine-pointer / reduced-motion) и чистит за собой. Логика 1:1 из `Interactions.tsx`.

- [ ] **Step 1:** `src/hooks/interactions/useParallax.ts` — перенести блок parallax watermark (строки 19-37 оригинала) в `useEffect`, гейт `!reduced`.

```ts
"use client";
import { useEffect } from "react";

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const plx = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        plx.forEach((el) => {
          const f = parseFloat(el.getAttribute("data-parallax") || "0.15") || 0.15;
          el.style.transform = `translateY(${-y * f}px)`;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
```

- [ ] **Step 2:** `src/hooks/interactions/useHoverAffordance.ts` — перенести блоки `[data-case]` hover-slide (строки 39-61) и generic link underline (строки 63-80). Использовать `var(--ease)` нельзя в JS-строке трансишена — оставить `cubic-bezier(.16,1,.3,1)` ОДИН раз как локальную const `EASE` в этом файле (единственное допустимое место — JS-анимации, не дубль по файлам):

```ts
"use client";
import { useEffect } from "react";

const EASE = "cubic-bezier(.16,1,.3,1)";

export function useHoverAffordance() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>("[data-case]").forEach((el) => {
      const h = el.querySelector("[data-case-title]") as HTMLElement | null;
      if (!h) return;
      h.style.transition = `transform .5s ${EASE}`;
      const enter = () => {
        h.style.transform = "translateX(18px)";
        h.style.textDecoration = "underline";
        h.style.textUnderlineOffset = "6px";
        h.style.textDecorationThickness = "2px";
      };
      const leave = () => { h.style.transform = "translateX(0)"; h.style.textDecoration = "none"; };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
    });

    document.querySelectorAll<HTMLAnchorElement>("a").forEach((el) => {
      if (el.hasAttribute("data-magnet") || el.closest("[data-case]")) return;
      const enter = () => {
        el.style.textDecoration = "underline";
        el.style.textUnderlineOffset = "4px";
        el.style.textDecorationThickness = "1px";
      };
      const leave = () => { el.style.textDecoration = "none"; };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
```

- [ ] **Step 3:** `src/hooks/interactions/useMagnetic.ts` — перенести magnetic-блок (строки 176-192), гейт fine+!reduced:

```ts
"use client";
import { useEffect } from "react";

const EASE = "cubic-bezier(.16,1,.3,1)";

export function useMagnetic() {
  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((el) => {
      el.style.transition = `transform .35s ${EASE}`;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.28}px, ${y * 0.32}px)`;
      };
      const onLeave = () => { el.style.transform = "translate(0,0)"; };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}
```

- [ ] **Step 4:** `src/hooks/interactions/useCursor.ts` — перенести custom-cursor блок (строки 82-174) целиком в `useEffect`, гейт fine+!reduced, селекторы `[data-cursor-ring]`/`[data-cursor-dot]`. (Код 1:1 из оригинала, тело функции — см. `Interactions.tsx:84-174`; обернуть в `useEffect(() => { const fine=...; const reduced=...; if(!fine||reduced) return; ... return cleanup; }, [])`.)

- [ ] **Step 5:** `src/hooks/interactions/index.ts`:

```ts
"use client";
import { useParallax } from "./useParallax";
import { useHoverAffordance } from "./useHoverAffordance";
import { useMagnetic } from "./useMagnetic";
import { useCursor } from "./useCursor";

/** All desktop kinetic flourishes. Each sub-hook self-gates and self-cleans. */
export function useInteractions(): void {
  useParallax();
  useHoverAffordance();
  useMagnetic();
  useCursor();
}
```

- [ ] **Step 6: Commit**

```bash
git add src/hooks/interactions
git commit -m "feat: split Interactions into focused hooks (cursor/magnetic/parallax/hover)"
```

---

## Task 7: Примитивы — T/LangProvider, Reveal, CountUp

**Files:**
- Move/Create: `src/components/lang.tsx` → `src/components/primitives/T/T.tsx` + `index.ts`
- Create: `src/components/primitives/Reveal/Reveal.tsx` + `index.ts`
- Create: `src/components/primitives/CountUp/CountUp.tsx` + `index.ts`
- Delete: `src/components/Reveal.tsx`, `src/components/CountUp.tsx`, `src/components/lang.tsx`
- Modify: `src/hooks/useRagDemo.ts` (импорт `useLang`)

**Interfaces:**
- Consumes: `useReveal`, `useCountUp` (Task 4), `useLang`/`useT` (from T).
- Produces: re-exports `LangProvider`, `useLang`, `useT`, `T`, `Localizable` from `@/components/primitives/T`; `Reveal` from `@/components/primitives/Reveal`; `CountUp` from `@/components/primitives/CountUp`.

- [ ] **Step 1:** Создать `src/components/primitives/T/T.tsx` — перенести содержимое `lang.tsx` (LangProvider/useLang/useT/T/Localizable) без изменений логики.

- [ ] **Step 2:** `src/components/primitives/T/index.ts`: `export * from "./T";`

- [ ] **Step 3:** `src/components/primitives/Reveal/Reveal.tsx` — тонкая обёртка над `useReveal`:

```tsx
"use client";
import { type ElementType, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

export function Reveal({
  as, children, className = "", delay = 0, ...rest
}: {
  as?: ElementType; children: ReactNode; className?: string; delay?: number;
  [key: string]: unknown;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useReveal<HTMLElement>(delay);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}
```

ВАЖНО: класс `reveal` и его `data-reveal`/`is-visible` поведение теперь должно жить в module. Создать `src/components/primitives/Reveal/reveal.module.scss`? Нет — `.reveal` навешивается строкой и используется глобально многими. Решение: добавить правила `.reveal[data-reveal]`/`is-visible` в `globals.css` (они глобальные по природе). **Действие:** в Task 3 это было удалено — вернуть их в globals.css здесь:

```css
/* append to globals.css */
.reveal[data-reveal] { opacity: 0; }
.reveal[data-reveal].is-visible { animation: axc-reveal 1s var(--ease) both; }
@media (prefers-reduced-motion: reduce) {
  .reveal[data-reveal] { opacity: 1 !important; }
  .reveal[data-reveal].is-visible { animation: none; }
}
```

- [ ] **Step 4:** `src/components/primitives/Reveal/index.ts`: `export * from "./Reveal";`

- [ ] **Step 5:** `src/components/primitives/CountUp/CountUp.tsx`:

```tsx
"use client";
import { useLang } from "@/components/primitives/T";
import { useCountUp } from "@/hooks/useCountUp";
import { TENURE, formatTenureNumber } from "@/lib/tenure";

export function CountUp({ to = TENURE }: { to?: number }) {
  const { lang } = useLang();
  const { ref, value } = useCountUp(to);
  return <span ref={ref}>{formatTenureNumber(value, lang)}</span>;
}
```

- [ ] **Step 6:** `index.ts` для CountUp; удалить старые `src/components/{Reveal,CountUp,lang}.tsx` (`git rm`).

- [ ] **Step 7:** Обновить импорт в `src/hooks/useRagDemo.ts`: `useLang` ← `@/components/primitives/T`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: primitives T/Reveal/CountUp as feature folders over hooks"
```

---

## Task 8: Cursor-компонент (DOM-маркеры курсора из Portfolio)

**Files:**
- Create: `src/components/Cursor/Cursor.tsx`, `cursor.module.scss`, `index.ts`

**Interfaces:**
- Produces: `<Cursor />` — рендерит `[data-cursor-ring]` и `[data-cursor-dot]` со стилями из module (вместо inline-`style` в Portfolio). Анимирует `useCursor` (через `useInteractions` в Portfolio).

- [ ] **Step 1:** `cursor.module.scss` — перенести inline-стили двух div из `Portfolio.tsx:22-59` в BEM-классы `.cursor__ring` / `.cursor__dot` (значения 1:1: ring 42×42, border 1.5px var(--ink), radius 50%, fixed, z 9999, transform translate(-50%,-50%), transition как в оригинале, mix-blend difference, opacity 0, display none; dot 6×6, bg var(--ink), z 10000, ...).

```scss
.cursor__ring {
  position: fixed; top: 0; left: 0; width: 42px; height: 42px;
  border: 1.5px solid var(--ink); border-radius: 50%;
  pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
  transition: width .25s var(--ease), height .25s var(--ease), border-radius .25s var(--ease),
    border-width .25s, background .25s, opacity .3s;
  mix-blend-mode: difference; opacity: 0; display: none;
}
.cursor__dot {
  position: fixed; top: 0; left: 0; width: 6px; height: 6px;
  background: var(--ink); border-radius: 50%;
  pointer-events: none; z-index: 10000; transform: translate(-50%, -50%);
  opacity: 0; display: none; mix-blend-mode: difference;
}
```

- [ ] **Step 2:** `Cursor.tsx`:

```tsx
import styles from "./cursor.module.scss";

/** Custom-cursor DOM markers. Animation is driven by useCursor (via useInteractions). */
export function Cursor() {
  return (
    <>
      <div data-cursor-ring className={styles.cursor__ring} />
      <div data-cursor-dot className={styles.cursor__dot} />
    </>
  );
}
```

ПРИМЕЧАНИЕ: `useCursor` ставит `display:block` инлайн при активации — это ок (динамика из JS, не вёрстка). CSS `@media (hover:none)` в globals прячет по `[data-cursor-*]`.

- [ ] **Step 3:** `index.ts`; **Commit**

```bash
git add src/components/Cursor
git commit -m "feat: Cursor component with module styles (was inline in Portfolio)"
```

---

## Sections — общий рецепт (Tasks 9-16)

Для каждой секции одинаковый процесс. Источник вёрстки — старый файл `src/components/sections/<Name>.tsx`. Цель — папка `src/components/sections/<Name>/`.

**Рецепт:**
1. Создать `src/components/sections/<Name>/<Name>.tsx`, `<name>.module.scss`, `index.ts`.
2. Перенести JSX 1:1, заменив каждый `style={{...}}` на `className={styles.<bemClass>}`. Значения стилей перенести в module как BEM (`block`, `block__element`, `block__element--modifier`).
3. Динамические булевы состояния → модификатор-класс через `cx(styles.x, on && styles['x--active'])`. Truly-dynamic числа → `style={{ "--var": value } as CSSProperties}` + использование `var(--var)` в scss.
4. Заменить кастом-классы: `mono`→`@include m.mono`, `display`→`@include m.display`, `gutter`→`@include m.gutter`, `grad-text`/`grad-text-static`→миксины, `nav-pill`→`@include m.nav-pill`, `dt-only`/`mb-only`→`@include bp.desktop/mobile { display: ... }` в module, `cap-row`/`cap-stack` mobile-override → `@include bp.mobile`.
5. Если файл >100 строк — вынести подкомпоненты в `parts/`.
6. Обновить импорт в `Portfolio` на `@/components/sections/<Name>`.
7. `git rm` старый `<Name>.tsx`. Commit.

Каждый `module.scss` начинается с `@use 'mixins' as m;` и/или `@use 'breakpoints' as bp;` по необходимости.

---

## Task 9: Footer

**Files:** Create `src/components/sections/Footer/{Footer.tsx,footer.module.scss,index.ts}`; rm `Footer.tsx`.

- [ ] **Step 1:** По рецепту. Источник — `Footer.tsx` (30 строк). BEM: `.footer`, `.footer__inner`, `.footer__left`, `.footer__right`. `mono`/`gutter` → миксины. **Commit** `refactor: Footer → feature folder + module scss`.

---

## Task 10: Skills

**Files:** Create `src/components/sections/Skills/{Skills.tsx,skills.module.scss,index.ts}`; rm old.

- [ ] **Step 1:** По рецепту. Источник — `Skills.tsx` (40). BEM: `.skills`, `.skills__head`, `.skills__group`, `.skills__title`, `.skills__item`. **Commit**.

---

## Task 11: Contact

**Files:** Create `src/components/sections/Contact/{Contact.tsx,contact.module.scss,index.ts}`; rm old.

- [ ] **Step 1:** По рецепту. Источник — `Contact.tsx` (72). BEM: `.contact`, `.contact__index`, `.contact__headline`, `.contact__links`, `.contact__link`, `.contact__kind`, `.contact__value`. **Commit**.

---

## Task 12: Marquee

**Files:** Create `src/components/sections/Marquee/{Marquee.tsx,marquee.module.scss,index.ts}`; rm old.

- [ ] **Step 1:** По рецепту. Источник — `Marquee.tsx` (50). Перенести `.marquee-track` (из globals, удалённый в Task 3) в module: `.marquee__track { display:flex; width:max-content; animation: axc-marquee 26s linear infinite; will-change: transform; @include bp.reduced-motion { animation:none; } }`. BEM: `.marquee`, `.marquee__track`, `.marquee__item`. **Commit**.

---

## Task 13: Work

**Files:** Create `src/components/sections/Work/{Work.tsx,work.module.scss,index.ts}` + `parts/WorkCase.tsx` если >100 строк; rm old.

- [ ] **Step 1:** Источник — `Work.tsx` (125 → разбить). Вынести карточку кейса в `parts/WorkCase.tsx`. Сохранить `data-case`/`data-case-title`/`data-magnet`/`data-cursor` атрибуты (их слушает `useHoverAffordance`/`useMagnetic`/`useCursor`). BEM: `.work`, `.work__index`, `.case`, `.case__title`, `.case__meta`, `.case__tag`, `.case__cta`. **Commit**.

---

## Task 14: Achievements

**Files:** Create `src/components/sections/Achievements/{Achievements.tsx,achievements.module.scss,index.ts}` + `parts/AchievementCard.tsx`; rm old.

- [ ] **Step 1:** Источник — `Achievements.tsx` (164 → разбить). Вынести карточку в `parts/AchievementCard.tsx`. Сохранить hover-логику: если она была на inline-state → перевести на модификатор-классы + локальный state или CSS `:hover`. `color: "violet"|"grad"` → модификаторы `.card--violet`/`.card--grad`. BEM: `.achievements`, `.achievements__index`, `.achievements__hint`, `.card`, `.card__year`, `.card__img`, `.card__kicker`, `.card__title`, `.card__text`, `.card__cta`. **Commit**.

---

## Task 15: Experience

**Files:** Create `src/components/sections/Experience/{Experience.tsx,experience.module.scss,index.ts}` + `parts/{TimelineRow,RoleDetail}.tsx`; rm old.

- [ ] **Step 1:** Источник — `Experience.tsx` (148 → разбить). Вынести строку таймлайна и detail-панель в `parts/`. Hover-выбор роли → локальный state + модификатор-классы (`--active`). BEM: `.experience`, `.experience__index`, `.experience__hint`, `.timeline`, `.timeline__row`, `.timeline__row--active`, `.detail`, `.detail__group`, `.detail__label`, `.detail__item`. **Commit**.

---

## Task 16: About + Hero (RagDemo) + Nav

**Files:**
- About: `src/components/sections/About/{About.tsx,about.module.scss,index.ts}` + `parts/{StatHint,CapabilityList,StatList}.tsx`
- Hero: `src/components/sections/Hero/{Hero.tsx,hero.module.scss,index.ts}` + `parts/RagDemo.tsx` + `rag-demo.module.scss`
- Nav: `src/components/sections/Nav/{Nav.tsx,nav.module.scss,index.ts}` + `parts/{LangToggle,Burger,MobileMenu,DesktopLinks}.tsx`
- rm old `About.tsx`, `Hero.tsx`, `Nav.tsx`, `RagDemo.tsx`

**Interfaces:**
- Consumes: `useMediaQuery` (About), `useRagDemo` (RagDemo), `useMobileMenu` (Nav), `useLang`/`useT`/`T` (all).

- [ ] **Step 1 — About:** Источник `About.tsx` (217). Заменить локальный `isDesktop` useEffect на `useMediaQuery("(min-width: 821px)")`. Вынести: `parts/StatHint.tsx` (тултип-бейдж), `parts/CapabilityList.tsx` (интерактивный список + `useState(active)`), `parts/StatList.tsx`. Удалить `inkMuted` — заменить на `rgba(var/...)` через scss или `color: var(--ink); opacity`. BEM: `.about`, `.about__statement`, `.about__accent`, `.stats`, `.stat`, `.stat__value`, `.stat__label`, `.caps`, `.caps__heading`, `.cap`, `.cap--active`, `.cap__num`, `.cap__name`, `.cap__stack`. Mobile-раскрытие `.cap`/`.cap__stack` → `@include bp.mobile`. **Commit** `refactor: About → folder, parts, useMediaQuery`.

- [ ] **Step 2 — RagDemo:** Создать `parts/RagDemo.tsx` — декларативный рендер `useRagDemo().messages`. Перенести контейнерные inline-стили (`RagDemo.tsx:110-130`) и три CSS-строки (`userCss`/`botCss`/`chipCss`/retrieving/pulse-dot) в `rag-demo.module.scss` как BEM: `.rag`, `.rag__head`, `.rag__live`, `.rag__thread`, `.msg--user`, `.msg--bot`, `.rag__retrieving`, `.rag__pulse`, `.rag__sources`, `.rag__chip`, `.rag__chip--shown`. Рендер:

```tsx
"use client";
import { useRagDemo } from "@/hooks/useRagDemo";
import { ragDemo } from "@/content/site";
import { cx } from "@/lib/cx";
import styles from "./rag-demo.module.scss";

export function RagDemo() {
  const { messages } = useRagDemo();
  return (
    <div className={styles.rag}>
      <div className={styles.rag__head}>
        <span className={styles.rag__dot} />
        <span className={styles.rag__live}>{ragDemo.liveLabel}</span>
        <span className={styles.rag__src}>just-ai</span>
      </div>
      <div className={styles.rag__thread}>
        {messages.map((m, i) => {
          if (m.kind === "user") return <div key={i} className={styles['msg--user']}>{m.text}</div>;
          if (m.kind === "bot") return <div key={i} className={styles['msg--bot']}>{m.text}</div>;
          if (m.kind === "retrieving") return (
            <div key={i} className={styles.rag__retrieving}><span className={styles.rag__pulse} />{m.label}</div>
          );
          return (
            <div key={i} className={styles.rag__sources}>
              {m.chips.map((c, j) => (
                <span key={j} className={cx(styles.rag__chip, c.shown && styles['rag__chip--shown'])}>{c.text}</span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

`.rag__pulse` использует `animation: axc-pulse 1s ease-in-out infinite`. **Commit** `refactor: RagDemo declarative render + module scss`.

- [ ] **Step 3 — Hero:** Источник `Hero.tsx` (105). По рецепту, импорт `RagDemo` из `./parts/RagDemo`. Сохранить `data-parallax`/`data-cursor`/`data-magnet`. BEM: `.hero`, `.hero__eyebrow`, `.hero__name`, `.hero__role`, `.hero__tagline`, `.hero__scroll`, `.hero__watermark`. **Commit**.

- [ ] **Step 4 — Nav:** Источник `Nav.tsx` (194). Заменить `open` useEffect на `useMobileMenu()`. Вынести `parts/LangToggle.tsx`, `parts/Burger.tsx`, `parts/MobileMenu.tsx`, `parts/DesktopLinks.tsx`. `nav-pill`→`@include m.nav-pill`; `dt-only`/`mb-only`→`@include bp.desktop/mobile`. Burger-линии: 3 `<span>` с модификаторами `--open`. BEM: `.nav`, `.nav__brand`, `.nav__pill`, `.links`, `.link`, `.burger`, `.burger__line--N`, `.menu`, `.lang`, `.lang__btn--active`. **Commit** `refactor: Nav → folder, parts, useMobileMenu`.

---

## Task 17: Portfolio + финальная сборка и сверка

**Files:**
- Modify/Create: `src/components/Portfolio/Portfolio.tsx`, `index.ts`; rm `src/components/Portfolio.tsx`, `src/components/Interactions.tsx`
- Create: `CLAUDE.md` (корень репо)

**Interfaces:**
- Consumes: все секции, `Cursor`, `useInteractions`, `LangProvider`.

- [ ] **Step 1:** `src/components/Portfolio/Portfolio.tsx` — убрать inline-курсор-дивы (теперь `<Cursor/>`), убрать `<Interactions/>` (теперь `useInteractions()`), обновить все импорты на новые пути:

```tsx
"use client";
import type { Locale } from "@/lib/i18n";
import { LangProvider } from "@/components/primitives/T";
import { Cursor } from "@/components/Cursor";
import { useInteractions } from "@/hooks/interactions";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Work } from "@/components/sections/Work";
import { Marquee } from "@/components/sections/Marquee";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import styles from "./portfolio.module.scss";

function Shell() {
  useInteractions();
  return (
    <div className={styles.portfolio}>
      <Cursor />
      <Nav />
      <main>
        <Hero /><About /><Achievements /><Work /><Marquee />
        <Experience /><Skills /><Contact />
      </main>
      <Footer />
    </div>
  );
}

export function Portfolio({ initialLang }: { initialLang: Locale }) {
  return <LangProvider initial={initialLang}><Shell /></LangProvider>;
}
```

`portfolio.module.scss`: `.portfolio { position: relative; }`. `index.ts` реэкспорт. `git rm` старые `Portfolio.tsx`, `Interactions.tsx`. Обновить импорт в `src/app/page.tsx` и `src/app/en/page.tsx` на `@/components/Portfolio`.

- [ ] **Step 2:** Проверить, не осталось ли старых файлов/импортов:

```bash
grep -rn "components/lang\|components/Reveal\"\|components/CountUp\"\|components/Interactions\|sections/[A-Z][a-z]*\"" src/app src/components | grep -v "/sections/[A-Za-z]*/"
ls src/components/*.tsx 2>/dev/null   # должно быть пусто
```

Ожидаемо: пусто / нет совпадений на старые пути.

- [ ] **Step 3:** Создать `CLAUDE.md` в корне (см. содержимое ниже в Task 18). **Commit** `refactor: Portfolio folder, Cursor+useInteractions, wire new paths`.

- [ ] **Step 4 — Сборка:** `npm run build`. Ожидаемо: успешный экспорт в `out/`, без ошибок типов/sass. Чинить ошибки до зелёного.

- [ ] **Step 5 — Lint:** `npm run lint`. Чинить до чистого.

- [ ] **Step 6 — Скриншот-сверка:** `npm run dev` (фон). Через puppeteer снять те же 4 ракурса (RU/EN × desktop 1440×900 / mobile 390×844) и сравнить с baseline из Task 0. Проверить: hero + RAG-демо, About-капабилити (hover desktop / раскрытие mobile), Achievements/Experience hover, Nav (desktop links + mobile burger/menu), курсор на desktop, marquee. Любые расхождения — чинить в соответствующем module/части, повторить.

- [ ] **Step 7 — Финальный коммит:**

```bash
git add -A
git commit -m "refactor: complete enterprise refactor — verified visual parity"
```

---

## Task 18: CLAUDE.md (содержимое)

Создаётся в Task 17 Step 3. Полный текст:

```markdown
# CLAUDE.md — правила кодовой базы

Сайт-резюме. Next.js 15 (App Router, output: "export" — статический SSG), React 19, TypeScript, Tailwind v4, Sass.

## Структура
- Весь код — в `src/`. Алиас `@/*` → `src/*`.
- **Папка-на-компонент:** в корне любой папки — либо компонент (`Name.tsx` + `name.module.scss` + `index.ts`), либо вложенная папка (`parts/`, дочерние). Никаких свободных файлов вперемешку.
- Слои: `src/app` (роуты), `src/components` (UI), `src/hooks` (поведение), `src/lib` (утилиты), `src/content` (данные), `src/styles` (scss-фундамент).

## Стили
- SCSS Modules + **BEM**: `block`, `block__element`, `block__element--modifier`.
- Глобальный `src/app/globals.css` остаётся CSS (Tailwind `@import` + `@theme` + reset + keyframes). НЕ переводить в scss.
- В модулях: `@use 'mixins' as m;` / `@use 'breakpoints' as bp;` (резолв через sassOptions.includePaths).
- Цвета/ease — runtime `var(--color-*)`, `var(--ink)`, `var(--ease)`. SCSS-переменные — только для compile-time (map/calc).
- **Tailwind** — только тривиальное, ≤3 утилиты на элемент. Сложнее → module.
- **Запрещён inline `style`** КРОМЕ проброса CSS-переменной для динамических чисел: `style={{ "--p": y } as CSSProperties}`.
- Никаких дубликат-констант (`ink`, `EASE`, инлайн cubic-bezier) — только токены.

## Логика
- Вся behavior-логика — в `src/hooks/`. Компонент = разметка + классы + вызов хука.
- **Запрещён императивный DOM** в компонентах (`createElement`/`innerHTML`/`cssText`). Анимации — декларативно или внутри хуков.

## Размер
- Каждый компонент ≤100 строк. Больше — разбивать в `parts/`.

## Команды
- `npm run dev` — разработка
- `npm run build` — статический экспорт в `out/`
- `npm run lint`

## Definition of Done
- `build` и `lint` зелёные.
- Ноль inline-`style` (кроме CSS-vars), ноль императивного DOM.
- Каждый компонент ≤100 строк.
- Стили — SCSS Modules + BEM, без дубликат-констант.
- Поведение — в `src/hooks/`.
- Визуальный паритет с предыдущей версией.

Спека рефактора: `docs/superpowers/specs/2026-06-22-portfolio-enterprise-refactor-design.md`.
```

---

## Self-Review notes

- **Spec coverage:** структура src/ (T1), SCSS modules+BEM (T2,T3,T9-16), хуки (T4-6), RagDemo state-машина (T5,T16-2), Interactions split (T6), ≤100 строк (T13-16 разбиение), DRY/токены (T2,T3, удаление ink/EASE), CLAUDE.md (T18), финальная сверка (T17) — всё покрыто.
- **Type consistency:** `useReveal(delay)→ref`, `useCountUp(to)→{ref,value}`, `useRagDemo()→{messages}`, `RagMessage` discriminated union — согласованы между T4/T5/T7/T16.
- **Порядок:** хуки (T4-6) и примитивы (T7) до секций (T9-16); `useRagDemo` импорт `useLang` чинится в T7 Step 7.
