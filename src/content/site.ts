import type { I18n } from "@/lib/i18n";
import { links } from "@/lib/config";

const NB = " "; // non-breaking space

/* ============================================================
   NAV
============================================================ */
export const nav = {
  brand: { ru: "АЧ", en: "AC" } satisfies I18n,
  // Order matches the on-page section order (achievements precedes work).
  links: [
    { href: "#achievements", label: { ru: "ДОСТИЖЕНИЯ", en: "AWARDS" } },
    { href: "#work", label: { ru: "ПРОЕКТЫ", en: "PROJECTS" } },
    { href: "#experience", label: { ru: "ОПЫТ", en: "CAREER" } },
    { href: "#contact", label: { ru: "КОНТАКТЫ", en: "CONTACTS" } },
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
    tail: { ru: ` и классической Fullstack-разработки.`, en: " and classic Fullstack engineering." },
  } satisfies Record<"leadA" | "leadB" | "accent" | "tail", I18n>,
  // First stat (years in production) is rendered dynamically; these follow it.
  stats: [
    {
      value: { ru: "ИБ в СПбПУ", en: "InfoSec, SPbPU" },
      label: { ru: "высшее образование", en: "higher education" },
      hint: {
        ru: "Специалитет «Информационно-аналитические системы безопасности», Санкт-Петербургский политехнический университет Петра Великого (СПбПУ)",
        en: "Specialist’s degree, “Information-Analytical Security Systems”, Peter the Great St. Petersburg Polytechnic University (SPbPU)",
      },
    },
    { value: { ru: "B2", en: "B2" }, label: { ru: "английский", en: "English" } },
  ] satisfies { value: I18n; label: I18n; hint?: I18n }[],
  capsHeading: { ru: "Полный цикл разработки", en: "Full development cycle" },
  // The cycle proves breadth — I own every phase end-to-end. No tech here (that
  // lives in the Skills section); each phase shows only what I actually do in it.
  caps: [
    { name: { ru: "Системный анализ", en: "System analysis" }, note: { ru: "Требования, формализация, пользовательские сценарии", en: "Requirements, formalization, user flows" } },
    { name: { ru: "Прототипирование", en: "Prototyping" }, note: { ru: "Кликабельные прототипы и проверка гипотез", en: "Clickable prototypes and hypothesis checks" } },
    { name: { ru: "Бэкенд", en: "Backend" }, note: { ru: "Сервисы, API и доменная логика", en: "Services, APIs and domain logic" } },
    { name: { ru: "Фронтенд", en: "Frontend" }, note: { ru: "Архитектура SPA и UI-слой продукта", en: "SPA architecture and the product UI layer" } },
    { name: { ru: "Инфраструктура", en: "Infrastructure" }, note: { ru: "Контейнеры, пайплайны и окружения", en: "Containers, pipelines and environments" } },
    { name: { ru: "Качество", en: "Quality" }, note: { ru: "Тесты и наблюдаемость в production", en: "Tests and observability in production" } },
  ] satisfies { name: I18n; note: I18n }[],
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
      img: "/img/elagin.png",
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
      img: "/img/best.png",
      kicker: { ru: "Премия Правительства · Findly", en: "Government award · Findly" },
      title: {
        ru: "«Лучший молодёжный проект Санкт-Петербурга»",
        en: "“Best Youth Project of St. Petersburg”",
      },
      text: {
        ru: "Проект Findly получил премию Правительства Санкт-Петербурга (по постановлению Правительства СПб) как лучший молодёжный проект 2021 года. Сразу после победы у меня взяли интервью об устройстве сервиса, пути его создания и дальнейших планах.",
        en: "My project Findly won the award of the Government of St. Petersburg (by official decree) as the best youth project of 2021. Right after the win I was interviewed about the service, how it was built and what came next.",
      },
      cta: { label: { ru: "Читать интервью →", en: "Read the interview →" }, href: links.interview2021 },
    },
  ] satisfies Achievement[],
};

/* ============================================================
   SELECTED WORK (03)
============================================================ */
export const work = {
  index: "(03)",
  label: { ru: "ПРОЕКТЫ", en: "PROJECTS" },
  cta: { ru: "Перейти к проекту →", en: "View project →" },
  // Projects tell WHAT the product is and the altitude of my impact — not task
  // lists (those live in Experience). Tags stay as quiet proof of the stack.
  cases: [
    {
      company: "Just AI",
      period: { ru: "2026 — наст.", en: "2026 — now" },
      title: { ru: "Enterprise RAG Platform", en: "Enterprise RAG Platform" },
      what: {
        ru: "Поиск и генерация по корпоративным данным на естественном языке.",
        en: "Natural-language search and generation over enterprise data.",
      },
      text: {
        ru: `Один из ключевых инженеров платформы. Определяю техническое развитие продукта: архитектуру сервисов, работу с данными и retrieval-пайплайнами, подходы к оценке качества генерации. Отвечаю за вывод новых возможностей от концепции до production.`,
        en: "One of the platform's key engineers. I drive the product's technical direction: service architecture, data and retrieval pipelines, and how generation quality is evaluated. I own the rollout of new capabilities from concept to production.",
      },
      tags: ["Java", "Spring", "Python", "Elasticsearch", "lakeFS", "MCP"],
      href: "https://khub.just-ai.com/",
    },
    {
      company: "Just AI",
      period: { ru: "2024 — 2026", en: "2024 — 2026" },
      title: { ru: "AI Knowledge Base", en: "AI Knowledge Base" },
      what: {
        ru: "Корпоративная база знаний с диалоговым AI-поиском вместо классического поиска по документам.",
        en: "Enterprise knowledge base with conversational AI search instead of classic document search.",
      },
      text: {
        ru: `Входил в число ведущих разработчиков продукта. Определял развитие фронтенд-платформы: инициировал технологические миграции, развивал внутреннюю UI-систему и формировал инженерные стандарты команды.`,
        en: "One of the product's lead developers. I shaped the frontend platform: initiated technology migrations, grew the internal UI system and set the team's engineering standards.",
      },
      tags: ["React", "TypeScript", "Vite", "shadcn/ui", "Playwright"],
      href: "https://just-ai.com/ai-baza-znaniy",
    },
    {
      company: "НеоБИТ",
      period: { ru: "2023 — 2024", en: "2023 — 2024" },
      title: { ru: "AI × Social Networks", en: "AI × Social Networks" },
      what: {
        ru: "Генеративный ИИ для социальных платформ: автоматизация создания контента, аналитика аудитории и AI-ассистенты для SMM.",
        en: "Generative AI for social platforms: automated content creation, audience analytics and AI assistants for SMM.",
      },
      text: {
        ru: `Технический лидер и один из основных драйверов развития продуктовой линейки. Принимал ключевые архитектурные решения, руководил командой разработки и отвечал за превращение продуктовых гипотез в готовые решения.`,
        en: "Technical lead and a primary driver of the product line. Made key architectural decisions, led the development team and turned product hypotheses into shipped solutions.",
      },
      tags: [{ ru: "Тимлид", en: "Team Lead" }, { ru: "Продукт", en: "Product" }, "Jira"],
      href: "https://neobit.ru/",
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
export type ExpGroup = { label: string; items: I18n[] };
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
        {
          label: "CORE",
          items: [
            { ru: "Полный цикл: системный анализ, прототипирование (Figma), разработка, деплой", en: "Full cycle: system analysis, prototyping (Figma), development, deploy" },
            { ru: "Backend: Java / Spring, Python", en: "Backend: Java / Spring, Python" },
            { ru: "Данные: Elasticsearch, PostgreSQL, версионирование через lakeFS", en: "Data: Elasticsearch, PostgreSQL, versioning via lakeFS" },
            { ru: "Frontend: React, TypeScript", en: "Frontend: React, TypeScript" },
          ],
        },
        {
          label: "TESTS",
          items: [
            { ru: "Backend: pytest, Spring Test", en: "Backend: pytest, Spring Test" },
            { ru: "Frontend: Jest, Playwright", en: "Frontend: Jest, Playwright" },
          ],
        },
        {
          label: "OBSERVABILITY",
          items: [
            { ru: "Graylog, Grafana, Sentry", en: "Graylog, Grafana, Sentry" },
            { ru: "Контроль деградации качества RAG / LLM", en: "Monitoring RAG / LLM quality drift" },
          ],
        },
        {
          label: "DEVOPS",
          items: [
            { ru: "Docker, Jenkins, CI/CD", en: "Docker, Jenkins, CI/CD" },
            { ru: "Окружения dev / stage / prod", en: "dev / stage / prod environments" },
          ],
        },
        {
          label: "AI",
          items: [
            { ru: "AI-агенты (Claude Code)", en: "AI agents (Claude Code)" },
            { ru: "Skills и MCP-серверы", en: "Skills and MCP servers" },
          ],
        },
      ],
    },
    {
      period: { ru: "2024 — 2026", en: "2024 — 2026" },
      dateRange: { ru: "Апрель 2024 — Январь 2026", en: "April 2024 — January 2026" },
      title: { ru: "Frontend Developer (Senior)", en: "Frontend Developer (Senior)" },
      company: "Just AI",
      blurb: {
        ru: "Enterprise веб-приложение для взаимодействия с AI.",
        en: "Enterprise web application for interacting with AI.",
      },
      groups: [
        {
          label: "CORE",
          items: [
            { ru: "Frontend-архитектура (React, TypeScript), развитие UI-части enterprise AI-продукта", en: "Frontend architecture (React, TypeScript); evolving the UI of an enterprise AI product" },
            { ru: "Монорепозиторий и единые стандарты кодовой базы", en: "Monorepo and unified codebase standards" },
            { ru: "Интеграция с backend и согласование контрактов взаимодействия", en: "Backend integration and agreeing on interaction contracts" },
            { ru: "Производительность, стабильность и безопасность frontend-системы", en: "Performance, stability and security of the frontend system" },
            { ru: "Архитектурные решения и code review", en: "Architecture decisions and code review" },
            { ru: "CI/CD: Jenkins, Docker", en: "CI/CD: Jenkins, Docker" },
          ],
        },
        {
          label: "CROSS-TEAM",
          items: [
            { ru: "Участие в frontend guild (senior-разработчики разных команд)", en: "Member of the frontend guild (senior developers across teams)" },
            { ru: "Выработка и поддержка единых инженерных стандартов", en: "Defining and maintaining shared engineering standards" },
            { ru: "Синхронизация архитектуры и качества между командами", en: "Aligning architecture and quality across teams" },
            { ru: "Менторинг и архитектурные ревью", en: "Mentoring and architecture reviews" },
          ],
        },
        {
          label: "RELIABILITY",
          items: [
            { ru: "E2E-тестирование: Playwright, Cypress", en: "E2E testing: Playwright, Cypress" },
            { ru: "Unit-тестирование: Jest", en: "Unit testing: Jest" },
            { ru: "Поддержка стабильности production-релизов", en: "Keeping production releases stable" },
            { ru: "Разбор и устранение production-инцидентов", en: "Investigating and resolving production incidents" },
          ],
        },
        {
          label: "AI & AUTOMATION",
          items: [
            { ru: "AI-агенты для автоматизации тестирования и документации", en: "AI agents to automate testing and documentation" },
            { ru: "Внедрение AI-инструментов в разработку", en: "Adopting AI tools in development" },
            { ru: "Автоматизация инженерных процессов", en: "Automating engineering processes" },
          ],
        },
      ],
    },
    {
      period: { ru: "2023 — 2024", en: "2023 — 2024" },
      dateRange: { ru: "Сентябрь 2023 — Апрель 2024", en: "September 2023 — April 2024" },
      title: { ru: "Development Team Lead / PM", en: "Development Team Lead / PM" },
      company: "НеоБИТ",
      blurb: {
        ru: "Управление командой разработки из 5 человек + роль project-менеджера (AI × соцсети).",
        en: "Leading a development team of 5 + project manager role (AI × social networks).",
      },
      groups: [
        {
          label: "TEAM LEAD",
          items: [
            { ru: "Планирование спринтов", en: "Sprint planning" },
            { ru: "Ведение Kanban- и Scrum-досок в Jira", en: "Running Kanban and Scrum boards in Jira" },
            { ru: "Постановка задач фронтенду, бэкенду, QA, DevOps и дизайнерам", en: "Writing tasks for frontend, backend, QA, DevOps and designers" },
            { ru: "Оценка времени и ресурсов под новые функции", en: "Estimating time and resources for new features" },
            { ru: "Написание документации и поддержка базы знаний", en: "Writing documentation and maintaining the knowledge base" },
            { ru: "Изучение документации и научных статей для выбора технологий", en: "Researching docs and papers to choose technologies" },
            { ru: "Оценка сотрудников и синхронизация целей команды", en: "Evaluating team members and aligning team goals" },
            { ru: "Организация процесса разработки и контроль результатов", en: "Organizing the development process and tracking results" },
            { ru: "Процесс актуализации и переиспользования кодовой базы", en: "Process for keeping and reusing the codebase" },
          ],
        },
        {
          label: "PROJECT MGMT",
          items: [
            { ru: "Оценка, установка и контроль соблюдения сроков", en: "Estimating, setting and enforcing deadlines" },
            { ru: "Демонстрация проекта: презентации, бизнес-встречи, созвоны", en: "Demoing the project: presentations, business meetings, calls" },
            { ru: "Перевод бизнес-требований в технические", en: "Translating business requirements into technical ones" },
            { ru: "Контроль качества", en: "Quality control" },
            { ru: "Выстраивание процесса поддержки проекта", en: "Building the project support process" },
          ],
        },
        {
          label: "SECURITY",
          items: [
            { ru: "Работа с гостайной (3 уровень)", en: "Working with state secrets (clearance level 3)" },
            { ru: "Контроль документации и прохождение ПИМ (программа и методика испытаний)", en: "Documentation control and passing acceptance testing (test program & procedure)" },
          ],
        },
      ],
    },
    {
      period: { ru: "2022 — 2023", en: "2022 — 2023" },
      dateRange: { ru: "Сентябрь 2022 — Сентябрь 2023", en: "September 2022 — September 2023" },
      title: { ru: "Frontend Developer (Middle)", en: "Frontend Developer (Middle)" },
      company: "НеоБИТ",
      blurb: { ru: "Руководство React-разработкой в команде.", en: "Leading React development within the team." },
      groups: [
        {
          label: "CORE",
          items: [
            { ru: "Разработка и развитие библиотеки компонентов", en: "Building and growing a component library" },
            { ru: "Архитектура и код-стайл, code review", en: "Architecture & code style, code review" },
            { ru: "Постановка задач и контракты с бэкендом", en: "Task setting and backend contracts" },
          ],
        },
        {
          label: "DESIGN",
          items: [
            { ru: "Интерфейсы в Figma", en: "Interfaces in Figma" },
            { ru: "Проработка пользовательских сценариев", en: "Working out user scenarios" },
          ],
        },
        {
          label: "QA",
          items: [
            { ru: "End-to-end тестирование", en: "End-to-end testing" },
            { ru: "Поддержка кодовой базы", en: "Codebase maintenance" },
          ],
        },
      ],
    },
    {
      period: { ru: "2022", en: "2022" },
      dateRange: { ru: "Февраль 2022 — Сентябрь 2022", en: "February 2022 — September 2022" },
      title: { ru: "Fullstack Developer (Junior)", en: "Fullstack Developer (Junior)" },
      company: "НеоБИТ",
      blurb: { ru: "Разработка SPA веб-приложений.", en: "Building SPA web applications." },
      groups: [
        {
          label: "STACK",
          items: [
            { ru: "React (фронтенд)", en: "React (frontend)" },
            { ru: "Go (бэкенд)", en: "Go (backend)" },
            { ru: "PostgreSQL (запросы к БД)", en: "PostgreSQL (DB queries)" },
          ],
        },
      ],
    },
    {
      period: { ru: "2021", en: "2021" },
      dateRange: { ru: "Июнь 2021 — Июль 2021", en: "June 2021 — July 2021" },
      title: { ru: "Data Science Intern", en: "Data Science Intern" },
      company: "LG Electronics Russia R&D Lab",
      blurb: { ru: "Стажировка в отделе Data Science.", en: "Internship in the Data Science department." },
      groups: [
        {
          label: "RESEARCH",
          items: [
            { ru: "Исследование методов оптимизации градиентного спуска", en: "Research on gradient-descent optimization methods" },
          ],
        },
      ],
    },
  ] satisfies Role[],
};

/* ============================================================
   SKILLS (05)
============================================================ */
export type SkillCard = { title: I18n; items: (string | I18n)[]; flagship?: boolean };

export const skills = {
  index: "(05)",
  label: { ru: "СТЕК И НАВЫКИ", en: "STACK & SKILLS" },
  // Lead with the specialization; everything stays visible (no hover-to-reveal).
  cards: [
    {
      title: { ru: "AI / LLM", en: "AI / LLM" },
      flagship: true,
      items: [
        "RAG", "Retrieval", "Embeddings", "Reranking",
        { ru: "Векторный поиск", en: "Vector search" },
        "Prompt engineering", "LLM evaluation",
        "Claude Code", "MCP", { ru: "AI-агенты", en: "AI agents" }, "Skills",
      ],
    },
    { title: { ru: "Backend", en: "Backend" }, items: ["Java", "Spring", "Python", "Go"] },
    { title: { ru: "Frontend", en: "Frontend" }, items: ["React", "TypeScript", "Next.js", "Redux", "Vite"] },
    { title: { ru: "Данные и поиск", en: "Data & Search" }, items: ["Elasticsearch", "PostgreSQL", "lakeFS"] },
    { title: { ru: "Инфраструктура", en: "Infrastructure" }, items: ["Docker", "Jenkins", "GitLab CI", "Nexus", "Nginx"] },
    { title: { ru: "Качество", en: "Quality" }, items: ["pytest", "Jest", "Playwright", "Cypress", "Sentry", "Grafana", "Graylog"] },
  ] satisfies SkillCard[],
  // Non-technical competencies — kept apart from the stack so they read as approach, not tooling.
  soft: {
    label: { ru: "Подход и лидерство", en: "Approach & Leadership" },
    items: [
      { ru: "Системный анализ", en: "System analysis" },
      { ru: "Требования", en: "Requirements" },
      "Team Lead",
      { ru: "Менторинг", en: "Mentoring" },
      "Code review",
    ] as (string | I18n)[],
  },
};

/* ============================================================
   CONTACT (06)
============================================================ */
export const contact = {
  index: "(06)",
  label: { ru: "КОНТАКТЫ", en: "CONTACTS" },
  headline: { ru: `Связаться${NB}→`, en: "Let's talk →" },
  headlineHref: links.telegram,
  links: [
    { kind: "email", value: links.email, href: `mailto:${links.email}` },
    { kind: "Telegram", value: "Telegram", href: links.telegram },
    { kind: "GitHub", value: "GitHub", href: links.github },
    { kind: "LinkedIn", value: "LinkedIn", href: links.linkedin },
    { kind: "VK", value: "VK", href: links.vk },
    { kind: "hh.ru", value: "Резюме на hh.ru", href: links.hh },
  ],
};

/* ============================================================
   FOOTER
============================================================ */
export const footer = {
  left: {
    ru: "Александр Чеченев — Full-Stack / AI Engineer (RAG)",
    en: "Alexander Chechenev — Full-Stack / AI Engineer (RAG)",
  } satisfies I18n,
};
