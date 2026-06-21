# CLAUDE.md — правила кодовой базы

Сайт-резюме. Next.js 15 (App Router, `output: "export"` — статический SSG), React 19, TypeScript, Tailwind v4, Sass.

## Структура
- Весь код — в `src/`. Алиас `@/*` → `src/*`.
- **Папка-на-компонент:** в корне любой папки — либо компонент (`Name.tsx` + `name.module.scss` + `index.ts`), либо вложенная папка (`parts/`, дочерние). Никаких свободных файлов вперемешку.
- Слои: `src/app` (роуты), `src/components` (UI), `src/hooks` (поведение), `src/lib` (утилиты), `src/content` (данные), `src/styles` (scss-фундамент).

## Стили
- SCSS Modules + **BEM**: `block`, `block__element`, `block__element--modifier`.
- Глобальный `src/app/globals.css` остаётся CSS (Tailwind `@import` + `@theme` + reset + keyframes + глобальный `.reveal`). НЕ переводить в scss.
- В модулях: `@use 'mixins' as m;` / `@use 'breakpoints' as bp;` (резолв через `next.config` → `sassOptions.includePaths: ['src/styles']`).
- Цвета/ease — runtime `var(--color-*)`, `var(--ink)`, `var(--ease)`. SCSS-переменные (`src/styles/_tokens.scss`) — только для compile-time (map/calc).
- **Tailwind** — только тривиальное, ≤3 утилиты на элемент. Сложнее → module.
- **Запрещён inline `style`** КРОМЕ проброса CSS-переменной для динамических чисел: `style={{ "--p": y } as CSSProperties}`.
- Никаких дубликат-констант (`ink`, `EASE`, инлайн `cubic-bezier`) — только токены/миксины.
- Динамические состояния (active/open/hover) — модификатор-класс через `cx()` (`src/lib/cx.ts`), не inline-стиль.

## Логика
- Вся behavior-логика — в `src/hooks/`. Компонент = разметка + классы + вызов хука.
- **Запрещён императивный DOM** в компонентах (`createElement`/`innerHTML`/`cssText`). Анимации — декларативно (CSS/state) или внутри хуков.

## Размер
- Каждый компонент ≤100 строк. Больше — разбивать в `parts/`.

## Команды
- `npm run dev` — разработка
- `npm run build` — статический экспорт в `out/`
- `npm run lint`
