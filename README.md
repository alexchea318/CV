# Портфолио — FullStack AI Engineer Александр Чеченев

Статически экспортируемый двуязычный (RU/EN) сайт-портфолио в тёмно-кинематографическом стиле.
Живой адрес обновляется в `lib/config.ts` (см. ниже).

---

## Технологии

| Слой | Инструмент |
|---|---|
| Фреймворк | Next.js 15 (App Router, `output: 'export'`) |
| Язык | TypeScript |
| Стили | Tailwind CSS v4 |
| Анимации | Motion (Framer Motion v12) + Lenis (плавный скролл) |
| Шрифты | Unbounded + Geist — самохостинг, внешних запросов нет |
| Тесты | Vitest |
| Деплой | Vercel (основной) / GitHub Pages (`out/`) |

---

## Команды

```bash
# Разработка
npm run dev        # http://localhost:3000

# Сборка
npm run build      # → артефакты в out/

# Предпросмотр собранного
npm run start      # npx serve out

# Тесты
npm test           # vitest run (включая perf-budget)

# Линтинг
npm run lint
```

---

## Редактирование контента

Весь контент живёт в `content/*.ts`. Каждое поле с переводом — объект `{ ru: "...", en: "..." }`.

```
content/
  profile.ts       — имя, должность, bio
  capabilities.ts  — AI-возможности (centerpiece)
  experience.ts    — опыт работы
  projects.ts      — проекты
  awards.ts        — награды и сертификаты
  contacts.ts      — контакты (Telegram, Email, GitHub, LinkedIn, VK)
```

Пример двуязычного поля:

```ts
title: { ru: "Заголовок на русском", en: "English title" }
```

---

## Добавить LinkedIn

В файле `content/contacts.ts` найди запись LinkedIn и замени `href` на реальный URL, убери `placeholder: true`:

```ts
// было:
{ label: "LinkedIn", value: "Скоро / Soon", href: "#", placeholder: true },

// стало:
{ label: "LinkedIn", value: "alexander-chechenev", href: "https://www.linkedin.com/in/alexander-chechenev" },
```

---

## Изменить канонический URL

После подключения домена на Vercel или GitHub Pages обнови одну строку:

```ts
// lib/config.ts
export const SITE_URL = "https://your-domain.com";
```

Это значение используется в SEO-мета-тегах, JSON-LD и `sitemap.xml`.

---

## Деплой

### Vercel (рекомендуется)

1. Запушить ветку в GitHub.
2. В Vercel: **Add New Project → Import** репозиторий.
3. Vercel автоматически прочитает `vercel.json`:
   ```json
   { "buildCommand": "next build", "outputDirectory": "out", "framework": "nextjs" }
   ```
4. После деплоя обновить `SITE_URL` в `lib/config.ts` на выданный Vercel домен.

### GitHub Pages

1. Выполнить `npm run build` — появится `out/`.
2. Запушить содержимое `out/` в ветку `gh-pages` (или настроить GitHub Actions).
3. Включить Pages в Settings → Pages → Source: `gh-pages / root`.

---

## Lighthouse (ручная проверка)

После `npm run build` запустить:

```bash
npm run start   # поднимет out/ на http://localhost:3000
```

Открыть Chrome DevTools → Lighthouse → Mobile → `http://localhost:3000/ru/`.
Целевые показатели: Performance ≥ 90, без render-blocking внешних запросов.

---

## Структура проекта

```
app/
  [locale]/        — страницы RU и EN
components/        — UI-компоненты (Hero, Capabilities, Experience, ...)
content/           — весь контент (bilingual .ts файлы)
lib/
  config.ts        — SITE_URL
  i18n.ts          — хелперы локализации
public/
  fonts/           — самохостинг Unbounded + Geist
tests/             — Vitest тесты (включая perf-budget)
out/               — статический экспорт (git-ignored)
vercel.json        — конфиг деплоя
```
