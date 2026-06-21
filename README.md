# Портфолио — Full-Stack / AI Engineer Александр Чеченев

Статически экспортируемый двуязычный (RU/EN) сайт-резюме в editorial-кинетическом
стиле (тёплая бумага + кинетика, акцентные тёмные секции). Канонический адрес
задаётся в `src/lib/config.ts` (см. ниже).

---

## Технологии

| Слой | Инструмент |
|---|---|
| Фреймворк | Next.js 15 (App Router, SSG — страницы пререндерятся на сборке) |
| Язык | TypeScript |
| Стили | **SCSS Modules + БЭМ** (Tailwind v4 — только для тривиального, ≤3 утилиты) |
| Анимации | Чистые CSS `@keyframes` + лёгкие хуки (`useReveal`, `useCountUp`, кастомный курсор, magnetic, parallax) |
| Шрифты | Manrope + JetBrains Mono (Google Fonts, `@import` в `globals.css`) |
| Деплой | Vercel |

Правила кодовой базы — в [`CLAUDE.md`](./CLAUDE.md).

---

## Команды

```bash
npm run dev        # разработка — http://localhost:3000
npm run build      # прод-сборка в .next (включает проверку типов)
npm run start      # запуск прод-сборки локально (next start, после build)
npm run lint       # next lint (ESLint в проекте не настроен)
```

> Тестов нет; гейтом служит проверка типов внутри `npm run build`.

---

## Редактирование контента

Весь двуязычный контент — в одном файле `src/content/site.ts`. Каждое
переводимое поле — объект `{ ru: "...", en: "..." }`.

```ts
title: { ru: "Заголовок на русском", en: "English title" }
```

Разделы в `site.ts`: `nav`, `hero`, `ragDemo`, `about`, `achievements`,
`work`, `marquee`, `experience`, `skills`, `contact`, `footer`.

**Опыт считается автоматически.** Число лет в Hero и «О себе» вычисляется из
`TENURE_START` в `src/lib/tenure.ts` (с корректным склонением: `5 → «5 лет»`,
`4.5 → «4,5 года»`). Год в футере берётся из `getCurrentYear()`
(`src/lib/date.ts`). Хардкодить эти значения не нужно.

**Контакты и ссылки** (email, Telegram, GitHub, LinkedIn, VK, hh.ru) — в
`src/lib/config.ts` (`links`), порядок и подписи — в `contact.links` в `site.ts`.

---

## Канонический URL

Сборка «запекает» абсолютные URL (canonical, Open Graph, JSON-LD,
`sitemap.xml`, `robots.txt`) на этапе пререндера. На Vercel домен подхватывается
автоматически из `VERCEL_PROJECT_PRODUCTION_URL` — **руками ничего менять не
нужно**. Менять `SITE_URL` в `src/lib/config.ts` нужно только если позже
подключишь собственный домен.

---

## Деплой (Vercel)

1. Запушить репозиторий в GitHub.
2. В Vercel: **Add New → Project → Import** репозиторий → **Deploy**.

Никакого `vercel.json` и никаких ручных настроек сборки не нужно — Vercel сам
определяет Next.js, собирает и хостит (страницы пререндерятся в статику).
Канонический домен подхватывается из build-окружения Vercel. Каждый push в
продакшен-ветку передеплоивает сайт.

> **Важно (иначе `routes-manifest.json couldn't be found`):** не переопределяй
> **Output Directory** в Project → Settings → Build and Deployment — должен быть
> дефолт (`.next`). Если там остался override `out` от ранних экспериментов —
> выключи (Override → off) и сделай Redeploy. См.
> [доку Vercel](https://github.com/vercel/vercel/blob/main/errors/now-next-routes-manifest.md).

---

## Структура проекта

```
src/
  app/                 — роуты: / (RU), /en/ (EN), not-found, sitemap, robots
    globals.css        — Tailwind import + @theme токены + reset + keyframes
    layout.tsx         — метаданные, JSON-LD
  components/
    Portfolio/         — сборка страницы (+ useInteractions)
    Cursor/            — кастомный курсор (desktop)
    primitives/        — T/LangProvider (i18n), Reveal, CountUp
    sections/          — Nav, Hero, About, Achievements, Work, Marquee,
                         Experience, Skills, Contact, Footer
                         (сложные секции дробятся в parts/)
  hooks/               — поведение: useMediaQuery, useReveal, useCountUp,
                         useMobileMenu, useRagDemo, useSyncLangUrl, interactions/*
  lib/                 — i18n, config (SITE_URL, links), tenure, date, cx
  content/site.ts      — весь двуязычный контент
  styles/              — _tokens, _mixins, _breakpoints (SCSS-фундамент)
public/img/            — изображения
.next/                 — прод-сборка (git-ignored)
```

Каждый компонент — своя папка (`Name.tsx` + `name.module.scss` + `index.ts`),
вся behavior-логика — в `src/hooks/`. Подробнее — в [`CLAUDE.md`](./CLAUDE.md).
