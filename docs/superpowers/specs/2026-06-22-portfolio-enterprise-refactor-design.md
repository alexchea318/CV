# Портфолио CV — рефакторинг до Enterprise-уровня

**Дата:** 2026-06-22
**Статус:** утверждён, готов к планированию
**Ветка:** `feat/portfolio-ai-redesign`

## Контекст

Сайт-резюме на Next.js 15 (App Router, `output: "export"` — статический SSG),
React 19, Tailwind v4. Двуязычный (RU `/`, EN `/en/`). После редизайна код
требует приведения к Enterprise-стандарту.

Чистые слои (не требуют переработки, только переезд в `src/`):
- `lib/` — `i18n.ts`, `config.ts`, `tenure.ts` — чистые утилиты, хорошо
  спроектированы.
- `content/site.ts` — слой данных, I18n-разделение уже корректное.

Проблемные зоны (всё в `components/`):
- Сотни inline-`style={{}}` объектов вместо CSS-классов.
- Дубликаты констант: `ink`, `inkMuted()`, `EASE`, повторяющиеся
  `cubic-bezier(.16,1,.3,1)` строки в каждом файле.
- Логика не отделена от представления: `About` содержит `useEffect` с
  matchMedia; `Interactions.tsx` — один императивный `useEffect` на 180 строк;
  `RagDemo.tsx` строит DOM через `createElement` + `cssText`-строки.
- Раздутые файлы: `About` 217, `Interactions` 199, `Nav` 194, `Achievements`
  164, `Experience` 148 строк.
- Плоская структура `components/` + `sections/`.

## Решения (утверждены)

1. **Стилизация:** SCSS Modules + BEM-нейминг внутри. Tailwind допустим только
   для тривиального — ≤3 утилитарных класса на элемент. Сложнее → `.module.scss`.
2. **Структура:** `src/` как корень кода, feature-folder («папка-на-компонент»):
   в корне любой папки — либо компонент, либо вложенная папка.
3. **Миграция:** сначала пишется весь код (фундамент → хуки → все компоненты),
   затем — единая финальная сверка: `next build` + скриншот-сверка. Промежуточных
   билдов/сверок после каждого компонента нет.

## Целевая структура

```
src/
  app/                      # переезд из корня; @/* → ./src/*
    layout.tsx  page.tsx  en/page.tsx  not-found.tsx
    globals.css             # остаётся CSS (Tailwind import + @theme + reset + keyframes)
    robots.ts  sitemap.ts
  styles/
    _tokens.scss            # SCSS-зеркало токенов для map/calc (цвета берём из var(--*))
    _mixins.scss            # mono, display, gutter, grad-text, focus-ring
    _breakpoints.scss       # @media миксины (desktop ≥821 / mobile ≤820 свопы)
  lib/                      # i18n, config, tenure — без изменений (переезд)
  content/                  # site.ts — без изменений (переезд)
  hooks/
    useMediaQuery.ts  useReveal.ts  useCountUp.ts  useMobileMenu.ts  useRagDemo.ts
    interactions/
      useCursor.ts  useMagnetic.ts  useParallax.ts  useHoverAffordance.ts
      index.ts              # useInteractions() — оркестратор
  components/
    Portfolio/              Portfolio.tsx  index.ts
    Cursor/                 Cursor.tsx  cursor.module.scss  index.ts
    primitives/
      Reveal/   Reveal.tsx   index.ts
      CountUp/  CountUp.tsx  index.ts
      T/        T.tsx        index.ts          # + LangProvider/useLang/useT
    sections/
      Nav/          Nav.tsx  nav.module.scss  index.ts
                    parts/{LangToggle,Burger,MobileMenu,DesktopLinks}.tsx
      Hero/         Hero.tsx  hero.module.scss  index.ts
                    parts/RagDemo.tsx  rag-demo.module.scss
      About/        About.tsx  about.module.scss  index.ts
                    parts/{StatHint,CapabilityList,StatList}.tsx
      Achievements/ Achievements.tsx  achievements.module.scss  index.ts  parts/…
      Work/         Work.tsx  work.module.scss  index.ts  parts/…
      Marquee/      Marquee.tsx  marquee.module.scss  index.ts
      Experience/   Experience.tsx  experience.module.scss  index.ts  parts/…
      Skills/       Skills.tsx  skills.module.scss  index.ts
      Contact/      Contact.tsx  contact.module.scss  index.ts
      Footer/       Footer.tsx  footer.module.scss  index.ts
```

**Правило папки:** в корне папки только `Name.tsx` + `name.module.scss` +
`index.ts` (реэкспорт), либо вложенные папки (`parts/`, дочерние компоненты).
Никаких свободных вспомогательных файлов вперемешку.

## Стилизация

- **Глобальный вход `app/globals.css` остаётся CSS** — Sass не обрабатывает
  `@import "tailwindcss"` и `@theme`. В нём: Tailwind import, `@theme` токены,
  `:root` переменные, reset, `@keyframes`, `prefers-reduced-motion`.
- Компонентные стили — `name.module.scss`, BEM внутри:
  `.about`, `.about__stat`, `.about__stat--active`.
- Динамические состояния (active/open/hover) → **модификатор-класс**,
  переключаемый пропом через хелпер `cx()` (тонкий clsx-аналог в `lib/cx.ts`),
  не inline-`style`.
- Единственное разрешённое использование `style` — проброс **CSS-переменной**
  для truly-dynamic числовых значений (parallax `--p`, count-up). Документируется.
- Общие воксы (`mono`, `display`, `gutter`, `grad-text`, `grad-text-static`) →
  `_mixins.scss`; модули подключают `@use 'mixins' as m;`. Резолв через
  `next.config` → `sassOptions.includePaths: ['src/styles']`.
- Цвета/ease в модулях — через runtime `var(--color-red)`, `var(--ink)`,
  `var(--ease)` (доступны глобально из `@theme`/`:root`). SCSS-переменные только
  там, где нужны на этапе компиляции (map, calc, breakpoints).
- Кастомные utility-классы (`.dt-only`, `.mb-only`, `.nav-pill`, `.cap-row`,
  `.cap-stack`) расформировываются: десктоп/мобайл свопы → `_breakpoints.scss`
  миксины внутри модулей; `.nav-pill` → `.nav__pill` в модуле Nav.
- Удаляются дубликаты: `ink`/`inkMuted()`/`EASE`/инлайн cubic-bezier → токены.

## Логика ⊥ представление (хуки)

| Источник | Хук | Инкапсулирует |
|---|---|---|
| `About` useEffect | `useMediaQuery(query)` | реактивный matchMedia (SSR-safe) |
| `Reveal` | `useReveal()` | IntersectionObserver fade-up, reduced-motion |
| `CountUp` | `useCountUp(to)` | rAF count-up, in-view trigger, reduced-motion |
| `Nav` useEffect | `useMobileMenu()` | open-state + Esc + hashchange close |
| `RagDemo` (innerHTML) | `useRagDemo()` | **переписать как React state-машину**: список сообщений + фаза, рендер декларативный |
| `Interactions` (180 стр.) | `useCursor`, `useMagnetic`, `useParallax`, `useHoverAffordance` | по одному эффекту на хук; объединяются в `useInteractions()` |

Компоненты после этого = разметка + классы + вызов хука. Императивное создание
DOM (`createElement`/`innerHTML`/`cssText`) устраняется полностью.

## Лимит ≤100 строк

Разбиение композицией:
- `About` → `About` + `parts/CapabilityList` + `parts/StatList` + `parts/StatHint`
  + `useActiveCapability` (или локальный state + `useMediaQuery`).
- `Nav` → `Nav` + `parts/{LangToggle,Burger,MobileMenu,DesktopLinks}` +
  `useMobileMenu`.
- `Achievements`/`Experience`/`Work` → item-карточки и detail-панели в `parts/`.

## Миграция (сначала весь код, сверка в конце)

Сначала пишется весь код в порядке зависимостей, **без промежуточных билдов и
сверок**. Финальная проверка — один раз, после всего кода.

- **Шаг 0 — baseline:** до любых правок снять эталонные скриншоты текущей версии
  (RU/EN × desktop/mobile) для финальной сверки.
- **Шаг 1 — фундамент:** установить `sass`; создать `src/`, перенести
  `app/ lib/ content/`; обновить `tsconfig` (`@/*` → `./src/*`),
  `next.config` (`sassOptions.includePaths`); создать
  `_tokens/_mixins/_breakpoints.scss` и `src/lib/cx.ts`.
- **Шаг 2 — примитивы и хуки:** `useMediaQuery`, `useReveal`, `useCountUp`,
  `useMobileMenu`, `useRagDemo`, `interactions/*`; примитивы `Reveal`, `CountUp`,
  `T`/`LangProvider`, `Cursor`.
- **Шаг 3 — все секции** (порядок зависимостей, снизу вверх): `Footer` →
  `Skills` → `Contact` → `Marquee` → `Work` → `Achievements` → `Experience` →
  `About` → `Hero` (RagDemo) → `Nav` → `Portfolio`.
- **Шаг 4 — финальная сверка (один раз):** `next build` + `next lint` зелёные;
  скриншот-сверка через puppeteer (RU/EN × desktop/mobile) против baseline из
  шага 0; правка регрессий.

## CLAUDE.md (правила в корне репозитория)

Содержит: правила структуры (feature-folder, правило папки); стили (SCSS
Modules + BEM, Tailwind ≤3 утилиты, запрет inline-`style` кроме CSS-vars, запрет
дубликат-констант — только токены); логика (поведение в `src/hooks/`, запрет
императивного DOM); лимит 100 строк/компонент; DRY; команды
(`npm run dev/build/lint`); ссылку на этот спек; DOD-чеклист.

## Definition of Done

- `next build` зелёный; `next lint` без ошибок.
- Ноль inline-`style` (кроме документированного проброса CSS-переменных);
  ноль `innerHTML`/`createElement`-вёрстки.
- Каждый компонент ≤100 строк.
- Все компонентные стили — SCSS Modules + BEM; дубликат-констант нет.
- Вся behavior-логика — в `src/hooks/`.
- Визуальный паритет с текущей версией (скриншоты RU/EN × desktop/mobile).
- `CLAUDE.md` с правилами создан.

## Вне области (YAGNI)

- Не добавляем тест-фреймворк/CI (нет в текущем проекте; скриншот-сверка ручная).
- Не меняем контент, копирайтинг, дизайн, цвета, анимации — только организацию
  кода. Визуальный результат идентичен.
- Не трогаем логику `lib/` и данные `content/` (только переезд).
