import type { I18n } from "@/lib/i18n";
import { links } from "@/lib/config";

const NB = " "; // non-breaking space

/* ============================================================
   NAV
============================================================ */
export const nav = {
  brand: "АЧ",
  // Order matches the on-page section order (achievements precedes work).
  links: [
    { href: "#achievements", label: { ru: "ДОСТИЖЕНИЯ", en: "AWARDS" } },
    { href: "#work", label: { ru: "РАБОТЫ", en: "WORK" } },
    { href: "#experience", label: { ru: "ОПЫТ", en: "CAREER" } },
    { href: "#contact", label: { ru: "КОНТАКТ", en: "CONTACT" } },
  ] satisfies { href: string; label: I18n }[],
};

/* ============================================================
   HERO  (tenure number is injected dynamically — see lib/tenure)
============================================================ */
export const hero = {
  // Typewriter eyebrow: openStatus — location — <tenure phrase> suffix
  openStatus: { ru: "Открыт к предложениям", en: "Open to work" },
  location: { ru: "Санкт-Петербург / Удаленно", en: "St. Petersburg / Remote" },
  tenureSuffix: { ru: "опыт", en: "experience" },
  firstName: { ru: "Александр", en: "Alexander" },
  lastName: { ru: "Чеченев", en: "Chechenev" },
  role: { ru: `Full-Stack / AI${NB}Engineer`, en: "Full-Stack / AI Engineer" },
  spec: { ru: "— специализация RAG", en: "— RAG specialization" },
  backgroundLabel: { ru: "Бэкграунд:", en: "Background:" },
  backgroundRoles: [`Team${NB}Lead`, `Senior${NB}Frontend`],
  tagline: {
    ru: "Довожу RAG-системы до продакшена и отвечаю за весь путь — бэкенд, фронт, инфраструктуру и качество генерации.",
    en: "I take RAG systems to production and own the whole path — backend, frontend, infrastructure and generation quality.",
  } satisfies I18n,
  scroll: { ru: "ПРОКРУТКА", en: "SCROLL" },
};

/* ============================================================
   HERO — animated RAG live-demo chat
============================================================ */
export const ragDemo = {
  liveLabel: "RAG · LIVE DEMO",
  retrieving: { ru: "извлекаю источники…", en: "retrieving sources…" },
  items: [
    {
      q: { ru: "Где в коде обрабатываются платежи?", en: "Where are payments handled in the code?" },
      src: ["payments.ts", "billing.py"],
      a: {
        ru: "Платежи идут через PaymentService и Stripe-webhook, статусы пишутся в PostgreSQL.",
        en: "Payments go through PaymentService and a Stripe webhook; statuses are stored in PostgreSQL.",
      },
    },
    {
      q: { ru: "Как устроен retrieval?", en: "How does retrieval work?" },
      src: ["index.py", "ranker.py"],
      a: {
        ru: "Запрос эмбеддится, ищем в Elasticsearch, затем реранк по релевантности.",
        en: "The query is embedded, searched in Elasticsearch, then reranked by relevance.",
      },
    },
    {
      q: { ru: "Что мониторим в проде?", en: "What do we monitor in prod?" },
      src: ["observability.md"],
      a: {
        ru: "Graylog, Grafana и Sentry — ловим деградацию качества RAG раньше пользователей.",
        en: "Graylog, Grafana and Sentry — we catch RAG quality drift before users do.",
      },
    },
  ] satisfies { q: I18n; src: string[]; a: I18n }[],
};

/* ============================================================
   ABOUT (01)
============================================================ */
export const about = {
  index: "(01)",
  label: { ru: "О СЕБЕ", en: "ABOUT" },
  // Statement is composed as: leadA + <tenure phrase> + leadB + <accent> + tail
  statement: {
    leadA: { ru: "За ", en: "Over " },
    leadB: {
      ru: ` я вырос до Full-Stack / AI-инженера. Сегодня строю Enterprise production-системы на стыке `,
      en: " I grew into a Full-Stack / AI Engineer. Today I build Enterprise production systems at the intersection of ",
    },
    accent: { ru: "RAG, LLM", en: "RAG, LLM" },
    tail: { ru: ` и классической Fullstack-разработки.`, en: " and classic Fullstack engineering at." },
  } satisfies Record<"leadA" | "leadB" | "accent" | "tail", I18n>,
  // First stat (years in production) is rendered dynamically; these follow it.
  stats: [
    { value: "ИБ СПбПУ", label: { ru: "высшее образование", en: "higher degree" } },
    { value: "B2", label: { ru: "английский", en: "English" } },
  ] satisfies { value: string; label: I18n }[],
  capsHeading: { ru: "Полный цикл — всё в одних руках", en: "Full cycle — all in one pair of hands" },
  caps: [
    { name: { ru: "Системный анализ", en: "System analysis" }, stack: { ru: "Требования · формализация · Figma · UX", en: "Requirements · analysis · Figma · UX" } },
    { name: { ru: "Бэкенд", en: "Backend" }, stack: { ru: "Java · Spring · Python", en: "Java · Spring · Python" } },
    { name: { ru: "Фронтенд", en: "Frontend" }, stack: { ru: "React · TypeScript · Redux", en: "React · TypeScript · Redux" } },
    { name: { ru: "Инфраструктура", en: "Infrastructure" }, stack: { ru: "Docker · Jenkins · CI/CD", en: "Docker · Jenkins · CI/CD" } },
    { name: { ru: "Качество", en: "Quality" }, stack: { ru: "Graylog · Grafana · Sentry · pytest · Playwright", en: "Graylog · Grafana · Sentry · pytest · Playwright" } },
  ] satisfies { name: I18n; stack: I18n }[],
};

/* ============================================================
   ACHIEVEMENTS (02) — interactive showcase
============================================================ */
export type Achievement = {
  year: string;
  color: "violet" | "grad";
  img: string;
  kicker: I18n;
  title: I18n;
  text: I18n;
  cta: { label: I18n; href: string } | null;
};

export const achievements = {
  index: "(02)",
  label: { ru: "ДОСТИЖЕНИЯ", en: "ACHIEVEMENTS" },
  hint: { ru: "наведите, чтобы раскрыть", en: "Hover to explore" },
  items: [
    {
      year: "2025",
      color: "violet",
      img: "/img/elagin.jpg",
      kicker: { ru: "Выступление · Елагин Pro", en: "Public talk · Elagin Pro" },
      title: {
        ru: "Лекция «Свой ChatGPT в 2021 по цене парсера анекдотов»",
        en: "Talk: “Your own ChatGPT in 2021 for the price of a joke-parser”",
      },
      text: {
        ru: "Научно-популярная лекция на фестивале «Елагин Pro»: история о попытке перенести поиск информации в интернете в чат ещё в 2021 году и честный разбор ошибок, которые возникают при запуске собственного стартапа.",
        en: "A popular-science talk at the Elagin Pro festival: the story of trying to bring internet search into a chat back in 2021 — and an honest breakdown of the mistakes you can make launching your own startup.",
      },
      cta: null,
    },
    {
      year: "2021",
      color: "grad",
      img: "/img/best.jpg",
      kicker: { ru: "Премия Правительства · Findly", en: "Government award · Findly" },
      title: {
        ru: "«Лучший молодёжный проект Санкт-Петербурга»",
        en: "“Best Youth Project of St. Petersburg”",
      },
      text: {
        ru: "Проект Findly получил премию Правительства Санкт-Петербурга (по постановлению Правительства СПб) как лучший молодёжный проект 2021 года. Сразу после победы у меня взяли интервью об устройстве сервиса, пути его создания и дальнейших планах.",
        en: "My project Findly won the award of the Government of St. Petersburg (by official decree) as the best youth project of 2021. Right after the win I was interviewed about the service, how it was built and what came next.",
      },
      cta: { label: { ru: "Смотреть интервью →", en: "Watch the interview →" }, href: links.interview2021 },
    },
  ] satisfies Achievement[],
};

/* ============================================================
   SELECTED WORK (03)
============================================================ */
export const work = {
  index: "(03)",
  label: { ru: "ИЗБРАННЫЕ РАБОТЫ", en: "SELECTED WORK" },
  cases: [
    {
      company: "Just AI",
      period: { ru: "2026 — наст.", en: "2026 — now" },
      title: { ru: `RAG-платформа — Full-Stack / AI${NB}Engineer`, en: "RAG Platform — Full-Stack / AI Engineer" },
      text: {
        ru: `Полный цикл production-RAG: от требований и системного анализа до деплоя и контроля качества. Backend на Java${NB}(Spring) и Python, данные на Elasticsearch${NB}+${NB}PostgreSQL, версионирование данных через lakeFS.`,
        en: "Full-cycle delivery of production RAG: from requirements and system analysis to deploy and quality monitoring. Backend on Java (Spring) & Python, data on Elasticsearch + PostgreSQL, data versioning with lakeFS.",
      },
      tags: ["Python", "Spring", "Elasticsearch", "lakeFS", "MCP"],
      href: "#",
    },
    {
      company: "Just AI",
      period: { ru: "2024 — 2026", en: "2024 — 2026" },
      title: { ru: "База знаний AI — Senior Frontend", en: "AI Knowledge Base — Senior Frontend" },
      text: {
        ru: `Frontend-архитектура enterprise AI-продукта (React, TypeScript, монорепозиторий). Вёл общую UI-библиотеку (shadcn/ui), провёл миграции npm→pnpm, webpack→Vite, React${NB}16→18 и сложный UI: canvas, карты, video${NB}streaming.`,
        en: "Frontend architecture of an enterprise AI product (React, TypeScript, monorepo). Owned a shared UI library (shadcn/ui), drove migrations npm→pnpm, webpack→Vite, React 16→18, and shipped complex UI: canvas, maps, video streaming.",
      },
      tags: ["React", "TypeScript", "Vite", "shadcn/ui", "Playwright"],
      href: "https://just-ai.com/ai-baza-znaniy",
    },
    {
      company: "НеоБИТ",
      period: { ru: "2023 — 2024", en: "2023 — 2024" },
      title: { ru: "AI × Соцсети — Team Lead / PM", en: "AI × Social Networks — Team Lead / PM" },
      text: {
        ru: `Руководил командой из 5 человек (планирование спринтов, Jira, оценки) и был project-менеджером проектов «AI × соцсети»: перевод бизнес-требований в технические, демо, контроль качества, документация и работа с гостайной (3${NB}уровень) с прохождением ПИМ.`,
        en: "Led a team of 5 (sprint planning, Jira boards, estimates) and acted as project manager on AI-for-social-networks projects: translating business into technical requirements, demos, QA, documentation and state-secrecy clearance (level 3) with formal acceptance testing.",
      },
      tags: [{ ru: "Лидерство", en: "Leadership" }, "Jira", { ru: "Управление", en: "Project Mgmt" }],
      href: "#",
    },
  ],
};

/* ============================================================
   MARQUEE
============================================================ */
export const marquee = [
  "Retrieval-Augmented Generation",
  "Production observability",
  "Full-cycle delivery",
  "AI agents · MCP · Skills",
];

/* ============================================================
   EXPERIENCE (04) — timeline + detail panels.
   Add a new job by prepending one Role; everything else follows.
============================================================ */
export type ExpGroup = { label: string; value: I18n };
export type Role = {
  period: I18n; // short label for the timeline row
  dateRange: I18n; // full range for the detail panel
  title: I18n;
  company: string;
  blurb: I18n;
  groups: ExpGroup[];
};

export const experience = {
  index: "(04)",
  label: { ru: "КАРЬЕРНЫЙ ПУТЬ", en: "CAREER PATH" },
  hint: { ru: "наведите на роль", en: "Hover a role" },
  roles: [
    {
      period: { ru: "2026 — наст.", en: "2026 — now" },
      dateRange: { ru: "Январь 2026 — настоящее время", en: "January 2026 — present" },
      title: { ru: "Full-Stack / AI Engineer (RAG)", en: "Full-Stack / AI Engineer (RAG)" },
      company: "Just AI",
      blurb: {
        ru: "Full-cycle разработка и внедрение production-систем, включая RAG.",
        en: "Full-cycle development and rollout of production systems, including RAG.",
      },
      groups: [
        { label: "CORE", value: { ru: "Полный цикл · системный анализ · Figma · Java / Spring · Python · Elasticsearch · PostgreSQL · lakeFS · React / TS", en: "Full cycle · system analysis · Figma · Java / Spring · Python · Elasticsearch · PostgreSQL · lakeFS · React / TS" } },
        { label: "TESTS", value: { ru: "pytest · Spring Test · Jest · Playwright", en: "pytest · Spring Test · Jest · Playwright" } },
        { label: "OBSERVABILITY", value: { ru: "Graylog · Grafana · Sentry · контроль деградации RAG / LLM", en: "Graylog · Grafana · Sentry · RAG / LLM quality monitoring" } },
        { label: "DEVOPS", value: { ru: "Docker · Jenkins · CI/CD · dev / stage / prod", en: "Docker · Jenkins · CI/CD · dev / stage / prod" } },
        { label: "AI", value: { ru: "AI-агенты (Claude Code) · skills · MCP-серверы", en: "AI agents (Claude Code) · skills · MCP servers" } },
      ],
    },
    {
      period: { ru: "2024 — 2026", en: "2024 — 2026" },
      dateRange: { ru: "Апрель 2024 — Январь 2026", en: "April 2024 — January 2026" },
      title: { ru: "Frontend Developer (Senior)", en: "Frontend Developer (Senior)" },
      company: "Just AI",
      blurb: {
        ru: "Frontend-архитектура enterprise AI-продукта — just-ai.com/ai-baza-znaniy.",
        en: "Frontend architecture of an enterprise AI product — just-ai.com/ai-baza-znaniy.",
      },
      groups: [
        { label: "CORE", value: { ru: "React · TypeScript · монорепо · контракты с backend · перформанс · архитектура · code review · CI/CD", en: "React · TypeScript · monorepo · backend contracts · performance · architecture · code review · CI/CD" } },
        { label: "CROSS-TEAM", value: { ru: "Frontend guild · единые стандарты · менторинг · архитектурные ревью", en: "Frontend guild · shared standards · mentoring · architecture reviews" } },
        { label: "RELIABILITY", value: { ru: "Playwright · Cypress · Jest · стабильность релизов · инциденты", en: "Playwright · Cypress · Jest · release stability · incidents" } },
        { label: "ENGINEERING", value: { ru: "npm→pnpm · webpack→Vite · React 16→18 · UI-библиотека (shadcn/ui) · canvas / карты / video", en: "npm→pnpm · webpack→Vite · React 16→18 · UI library (shadcn/ui) · canvas / maps / video" } },
        { label: "AI", value: { ru: "Агенты для тестов и документации · внедрение AI-инструментов", en: "Agents for tests & docs · adopting AI tooling" } },
      ],
    },
    {
      period: { ru: "2023 — 2024", en: "2023 — 2024" },
      dateRange: { ru: "Сентябрь 2023 — Апрель 2024", en: "September 2023 — April 2024" },
      title: { ru: "Development Team Lead / PM", en: "Development Team Lead / PM" },
      company: "НеоБИТ",
      blurb: {
        ru: "Управление командой из 5 человек + роль project-менеджера (AI × соцсети).",
        en: "Leading a team of 5 + project manager role (AI × social networks).",
      },
      groups: [
        { label: "TEAM LEAD", value: { ru: "Спринты · Jira (Kanban / Scrum) · постановка задач · оценка · документация · база знаний · выбор технологий", en: "Sprints · Jira (Kanban / Scrum) · task setting · estimates · docs · knowledge base · tech selection" } },
        { label: "PROJECT MGMT", value: { ru: "Сроки · демо и бизнес-встречи · бизнес→тех требования · контроль качества", en: "Deadlines · demos & business meetings · business→tech requirements · QA" } },
        { label: "SECURITY", value: { ru: "Гостайна (3 уровень) · ПИМ", en: "State secrecy (level 3) · acceptance testing" } },
      ],
    },
    {
      period: { ru: "2022 — 2023", en: "2022 — 2023" },
      dateRange: { ru: "Сентябрь 2022 — Сентябрь 2023", en: "September 2022 — September 2023" },
      title: { ru: "Frontend Developer (Middle)", en: "Frontend Developer (Middle)" },
      company: "НеоБИТ",
      blurb: { ru: "Руководство React-разработкой в команде.", en: "Leading React development within the team." },
      groups: [
        { label: "CORE", value: { ru: "Библиотека компонентов · код-ревью · архитектура и код-стайл · постановка задач · контракты с бэком", en: "Component library · code review · architecture & code style · task setting · backend contracts" } },
        { label: "DESIGN", value: { ru: "Интерфейсы в Figma · пользовательские сценарии", en: "Interfaces in Figma · user scenarios" } },
        { label: "QA", value: { ru: "End-to-end тестирование · поддержка кодовой базы", en: "End-to-end testing · codebase maintenance" } },
      ],
    },
    {
      period: { ru: "2021", en: "2021" },
      dateRange: { ru: "Февраль 2021 — Сентябрь 2021", en: "February 2021 — September 2021" },
      title: { ru: "Fullstack Developer (Junior)", en: "Fullstack Developer (Junior)" },
      company: "НеоБИТ",
      blurb: { ru: "Разработка SPA веб-приложений.", en: "Building SPA web applications." },
      groups: [
        { label: "STACK", value: { ru: "React (фронт) · Go (бэк) · PostgreSQL (запросы к БД)", en: "React (frontend) · Go (backend) · PostgreSQL (queries)" } },
      ],
    },
    {
      period: { ru: "2021", en: "2021" },
      dateRange: { ru: "Июнь 2021 — Июль 2021", en: "June 2021 — July 2021" },
      title: { ru: "Data Science Intern", en: "Data Science Intern" },
      company: "LG Electronics Russia R&D Lab",
      blurb: { ru: "Стажировка в отделе Data Science.", en: "Internship in the Data Science department." },
      groups: [
        { label: "RESEARCH", value: { ru: "Исследование методов оптимизации градиентного спуска", en: "Research on gradient-descent optimization methods" } },
      ],
    },
  ] satisfies Role[],
};

/* ============================================================
   SKILLS (05)
============================================================ */
export const skills = {
  index: "(05)",
  label: { ru: "СТЕК И НАВЫКИ", en: "STACK & SKILLS" },
  groups: [
    { title: { ru: "BACKEND", en: "BACKEND" }, items: ["Java", "Spring", "Python", "Go"] },
    { title: { ru: "ДАННЫЕ", en: "DATA" }, items: ["Elasticsearch", "PostgreSQL", "lakeFS"] },
    { title: { ru: "FRONTEND", en: "FRONTEND" }, items: ["React", "TypeScript", "Redux", "CSS3"] },
    { title: { ru: "DEVOPS", en: "DEVOPS" }, items: ["Docker", "Jenkins", "CI/CD", "Vite"] },
    { title: { ru: "OBSERVABILITY", en: "OBSERVABILITY" }, items: ["Graylog", "Grafana", "Sentry"] },
    { title: { ru: "ТЕСТИРОВАНИЕ", en: "TESTING" }, items: ["pytest", "Jest", "Playwright", "Cypress"] },
    { title: { ru: "AI / АВТОМАТИЗАЦИЯ", en: "AI / AUTOMATION" }, items: ["Claude Code", "MCP", { ru: "AI-агенты", en: "AI agents" }, "Skills"] },
    { title: { ru: "ЯЗЫКИ", en: "LANGUAGES" }, items: [{ ru: "Русский — родной", en: "Russian — native" }, { ru: "Английский — B2", en: "English — B2" }] },
  ],
};

/* ============================================================
   CONTACT (06)
============================================================ */
export const contact = {
  index: "(06)",
  label: { ru: "СВЯЖЕМСЯ", en: "LET'S TALK" },
  headline: { ru: `Поговорим${NB}→`, en: "Let's talk →" },
  links: [
    { kind: "email", value: links.email, href: `mailto:${links.email}` },
    { kind: "Telegram", value: "Telegram", href: links.telegram },
    { kind: "GitHub", value: "GitHub", href: links.github },
    { kind: "VK", value: "VK", href: links.vk },
  ],
  cv: { ru: "↓ Резюме (PDF)", en: "↓ Download CV (PDF)" },
  cvHref: links.cv,
};

/* ============================================================
   FOOTER
============================================================ */
export const footer = {
  left: {
    ru: "© 2026 Александр Чеченев — Full-Stack / AI Engineer (RAG)",
    en: "© 2026 Alexander Chechenev — Full-Stack / AI Engineer (RAG)",
  } satisfies I18n,
};
