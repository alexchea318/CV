import type {I18n} from "@/lib/i18n";
import {links} from "@/lib/config";

const NB = " "; // non-breaking space

/* ============================================================
   NAV
============================================================ */
export const nav = {
    brand: {ru: "АЧ", en: "AC"} satisfies I18n,
    // Order matches the on-page section order (achievements precedes work).
    links: [
        {href: "#achievements", label: {ru: "ДОСТИЖЕНИЯ", en: "AWARDS"}},
        {href: "#work", label: {ru: "ПРОЕКТЫ", en: "PROJECTS"}},
        {href: "#experience", label: {ru: "ОПЫТ", en: "CAREER"}},
        {href: "#contact", label: {ru: "КОНТАКТЫ", en: "CONTACTS"}},
    ] satisfies { href: string; label: I18n }[],
};

/* ============================================================
   HERO  (tenure number is injected dynamically — see lib/tenure)
============================================================ */
export const hero = {
    // Typewriter eyebrow: openStatus — location — <tenure phrase> suffix
    openStatus: {ru: "Открыт к предложениям", en: "Open to opportunities"},
    location: {ru: "Санкт-Петербург / Удалённо", en: "St. Petersburg / Remote"},
    tenureSuffix: {ru: "опыт", en: "experience"},
    firstName: {ru: "Александр", en: "Alexander"},
    lastName: {ru: "Чеченев", en: "Chechenev"},
    role: {ru: `AI${NB}Engineer`, en: "AI Engineer"},
    spec: {ru: "— специализация RAG", en: "— RAG specialization"},
    backgroundLabel: {ru: "Бэкграунд:", en: "Background:"},
    backgroundRoles: [`Team${NB}Lead`, `Senior${NB}Frontend`],
    tagline: {
        ru: "Разрабатываю RAG-функциональность enterprise-платформ и довожу AI-фичи от прототипа до production.",
        en: "I build RAG functionality for enterprise platforms and take AI features from prototype to production.",
    } satisfies I18n,
    scroll: {ru: "ПРОКРУТКА", en: "SCROLL"},
};

/* ============================================================
   HERO — animated RAG live-demo chat
============================================================ */
export const ragDemo = {
    liveLabel: "RAG · LIVE DEMO",
    retrieving: {ru: "извлекаю источники…", en: "retrieving sources…"},
    items: [
        {
            q: {ru: "Где в коде обрабатываются платежи?", en: "Where are payments handled in the code?"},
            src: ["payments.ts", "billing.py"],
            a: {
                ru: "Платежи идут через PaymentService и Stripe-webhook, статусы пишутся в PostgreSQL.",
                en: "Payments go through PaymentService and a Stripe webhook; statuses are stored in PostgreSQL.",
            },
        },
        {
            q: {ru: "Как устроен retrieval?", en: "How does retrieval work?"},
            src: ["index.py", "ranker.py"],
            a: {
                ru: "Запрос эмбеддится, ищем в Elasticsearch, затем реранк по релевантности.",
                en: "The query is embedded, searched in Elasticsearch, then reranked by relevance.",
            },
        },
        {
            q: {ru: "Что мониторим в проде?", en: "What do we monitor in prod?"},
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
    label: {ru: "О СЕБЕ", en: "ABOUT"},
    // Statement is composed as: leadA + <tenure phrase> + leadB + <accent> + tail
    statement: {
        leadA: {ru: "За ", en: "Over "},
        leadB: {
            ru: ` вырос до AI-инженера. Фуллстек-бэкграунд помогает строить фичи сквозь весь стек — от `,
            en: " I grew into an AI Engineer. A fullstack background helps me build features across the whole stack — from ",
        },
        accent: {ru: "retrieval до production", en: "retrieval to production"},
        tail: {ru: `.`, en: "."},
    } satisfies Record<"leadA" | "leadB" | "accent" | "tail", I18n>,
    // First stat (years in production) is rendered dynamically; these follow it.
    stats: [
        {
            value: {ru: "ИБ в СПбПУ", en: "InfoSec, SPbPU"},
            label: {ru: "высшее образование", en: "higher education"},
            hint: {
                ru: "Специалитет «Информационно-аналитические системы безопасности», Санкт-Петербургский политехнический университет Петра Великого (СПбПУ)",
                en: "Specialist’s degree, “Information-Analytical Security Systems”, Peter the Great St. Petersburg Polytechnic University (SPbPU)",
            },
        },
        {value: {ru: "B2", en: "B2"}, label: {ru: "английский", en: "English"}},
    ] satisfies { value: I18n; label: I18n; hint?: I18n }[],
    capsHeading: {ru: "Зоны ответственности", en: "Areas of ownership"},
    // Ownership over activity — these read as levels of responsibility, not a task
    // list. No tech here (that lives in the Skills section); the last item signals
    // I shape where the product goes, not just how it's built.
    caps: [
        {
            name: {ru: "Анализ", en: "Analysis"},
            note: {ru: "Требования и проработка решений", en: "Requirements and solution design"}
        },
        {
            name: {ru: "Архитектура", en: "Architecture"},
            note: {ru: "Системное проектирование и интеграции", en: "System design and integrations"}
        },
        {
            name: {ru: "Разработка", en: "Development"},
            note: {ru: "Бэкенд, фронтенд и AI-функциональность", en: "Backend, frontend and AI features"}
        },
        {
            name: {ru: "Инфраструктура", en: "Infrastructure"},
            note: {ru: "CI/CD и production-среды", en: "CI/CD and production environments"}
        },
        {
            name: {ru: "Качество", en: "Quality"},
            note: {ru: "Тестирование и эксплуатация", en: "Testing and operations"}
        },
        {
            name: {ru: "Развитие продукта", en: "Product evolution"},
            note: {ru: "Технические решения и развитие платформы", en: "Technical decisions and platform evolution"}
        },
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
    label: {ru: "ДОСТИЖЕНИЯ", en: "ACHIEVEMENTS"},
    hint: {ru: "наведите, чтобы раскрыть", en: "Hover to explore"},
    items: [
        {
            year: "2025",
            color: "violet",
            img: "/img/elagin.png",
            kicker: {ru: "Выступление · Елагин Pro", en: "Public talk · Elagin Pro"},
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
            kicker: {ru: "Премия Правительства · Findly", en: "Government award · Findly"},
            title: {
                ru: "«Лучший молодёжный проект Санкт-Петербурга»",
                en: "“Best Youth Project of St. Petersburg”",
            },
            text: {
                ru: "Проект Findly получил премию Правительства Санкт-Петербурга (по постановлению Правительства СПб) как лучший молодёжный проект 2021 года. Сразу после победы у меня взяли интервью об устройстве сервиса, пути его создания и дальнейших планах.",
                en: "My project Findly won the award of the Government of St. Petersburg (by official decree) as the best youth project of 2021. Right after the win I was interviewed about the service, how it was built and what came next.",
            },
            cta: {label: {ru: "Читать интервью →", en: "Read the interview →"}, href: links.interview2021},
        },
    ] satisfies Achievement[],
};

/* ============================================================
   SELECTED WORK (03)
============================================================ */
export const work = {
    index: "(03)",
    label: {ru: "ПРОЕКТЫ", en: "PROJECTS"},
    cta: {ru: "Перейти к проекту", en: "View project"},
    // Projects tell WHAT the product is and the altitude of my impact — not task
    // lists (those live in Experience). Tags stay as quiet proof of the stack.
    cases: [
        {
            company: "Just AI",
            period: {ru: "2026 — наст.", en: "2026 — now"},
            title: {ru: "Enterprise RAG Platform", en: "Enterprise RAG Platform"},
            what: {
                ru: "Поиск и генерация по корпоративным данным на естественном языке.",
                en: "Natural-language search and generation over enterprise data.",
            },
            text: {
                ru: `Один из ключевых инженеров платформы. Самостоятельно разрабатываю RAG-функциональность — от концепции до production.`,
                en: "One of the platform's key engineers. I build RAG functionality independently — from concept to production.",
            },
            tags: [
                {ru: "RAG", en: "RAG"},
                {ru: "Java · Spring · Python · Elasticsearch", en: "Java · Spring · Python · Elasticsearch"},
                {ru: "Enterprise on-prem", en: "Enterprise on-prem"},
            ],
            href: "https://khub.just-ai.com/",
        },
        {
            company: "Just AI",
            period: {ru: "2024 — 2026", en: "2024 — 2026"},
            title: {ru: "AI Knowledge Base", en: "AI Knowledge Base"},
            what: {
                ru: "Корпоративная база знаний с диалоговым AI-поиском вместо классического поиска по документам.",
                en: "Enterprise knowledge base with conversational AI search instead of classic document search.",
            },
            text: {
                ru: `Вёл развитие фронтенд-платформы продукта: определял архитектуру, технологический стек и инженерные стандарты. Участвовал в выработке общих фронтенд-стандартов компании.`,
                en: "Led the product's frontend platform: defined its architecture, technology stack and engineering standards. Contributed to company-wide frontend standards.",
            },
            tags: [
                {ru: "Диалоговый AI-поиск", en: "Conversational AI search"},
                {ru: "React · TypeScript · Vite · Playwright", en: "React · TypeScript · Vite · Playwright"},
                {ru: "Фронтенд-стандарты компании", en: "Company-wide frontend standards"},
            ],
            href: "https://just-ai.com/ai-baza-znaniy",
        },
        {
            company: "НеоБИТ",
            period: {ru: "2023 — 2024", en: "2023 — 2024"},
            title: {ru: "AI × Social Networks", en: "AI × Social Networks"},
            what: {
                ru: "Генеративный ИИ для социальных платформ: автоматизация создания контента, аналитика аудитории и AI-ассистенты.",
                en: "Generative AI for social platforms: automated content creation, audience analytics and AI assistants.",
            },
            text: {
                ru: `Технический лидер продуктовой линейки. Руководил командой разработки, принимал ключевые архитектурные решения и отвечал за вывод продуктов от идеи до запуска.`,
                en: "Technical lead of the product line. Led the development team, made key architectural decisions and owned products from idea to launch.",
            },
            tags: [
                {ru: "Команда 5 инженеров", en: "Team of 5"},
                {ru: "High-load · Go · K8s", en: "High-load · Go · K8s"},
                {ru: "3 продукта с нуля", en: "3 products from scratch"},
            ],
            href: "https://neobit.ru/",
        },
    ],
};

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
    label: {ru: "КАРЬЕРНЫЙ ПУТЬ", en: "CAREER PATH"},
    hint: {ru: "наведите на роль", en: "Hover a role"},

    roles: [
        {
            period: {ru: "2026 — наст.", en: "2026 — now"},
            dateRange: {ru: "Январь 2026 — настоящее время", en: "January 2026 — present"},
            title: {ru: "AI Engineer (RAG)", en: "AI Engineer (RAG)"},
            company: "Just AI",
            blurb: {
                ru: "Enterprise RAG-платформа для поиска и генерации по корпоративным данным.",
                en: "Enterprise RAG platform for search and generation over enterprise data.",
            },
            groups: [
                {
                    label: "OWNERSHIP",
                    items: [
                        {
                            ru: "Ключевой инженер платформы, отвечающий за техническое развитие RAG-системы",
                            en: "Key engineer responsible for the technical evolution of the RAG platform",
                        },
                        {
                            ru: "Разработка retrieval- и data-пайплайнов",
                            en: "Building retrieval and data pipelines",
                        },
                        {
                            ru: "Вывод AI-функциональности от концепции до production",
                            en: "Delivery of AI features from concept to production",
                        },
                    ],
                },
                {
                    label: "AI",
                    items: [
                        {
                            ru: "RAG-пайплайн: чанкинг, эмбеддинги, retrieval",
                            en: "RAG pipeline: chunking, embeddings, retrieval",
                        },
                        {
                            ru: "Оценка качества генерации (LLM evaluation)",
                            en: "Generation quality evaluation (LLM evaluation)",
                        },
                    ],
                },
                {
                    label: "PRACTICES",
                    items: [
                        {
                            ru: "Code review, инженерные стандарты и шаблоны проверок",
                            en: "Code review, engineering standards and review templates",
                        },
                        {
                            ru: "Документация и база технических знаний команды",
                            en: "Documentation and the team's technical knowledge base",
                        },
                    ],
                },
                {
                    label: "SYSTEMS",
                    items: [
                        {
                            ru: "Java / Spring, Python сервисы",
                            en: "Java / Spring, Python services",
                        },
                        {
                            ru: "Elasticsearch, PostgreSQL, lakeFS",
                            en: "Elasticsearch, PostgreSQL, lakeFS",
                        },
                        {
                            ru: "React, TypeScript frontend",
                            en: "React, TypeScript frontend",
                        },
                    ],
                },
                {
                    label: "PRODUCTION",
                    items: [
                        {
                            ru: "Docker, Jenkins, CI/CD-пайплайны",
                            en: "Docker, Jenkins, CI/CD pipelines",
                        },
                        {
                            ru: "Надёжность и стабильность production-систем",
                            en: "Production reliability and system stability",
                        },
                    ],
                },
            ],
        },

        {
            period: {ru: "2024 — 2026", en: "2024 — 2026"},
            dateRange: {ru: "Апрель 2024 — Январь 2026", en: "April 2024 — January 2026"},
            title: {ru: "Frontend Developer (Senior)", en: "Frontend Developer (Senior)"},
            company: "Just AI",
            blurb: {
                ru: "Enterprise AI-продукт с диалоговым интерфейсом для работы с данными.",
                en: "Enterprise AI product with conversational interface for data interaction.",
            },
            groups: [
                {
                    label: "OWNERSHIP",
                    items: [
                        {
                            ru: "Развитие frontend-архитектуры enterprise AI-продукта",
                            en: "Evolution of frontend architecture for an enterprise AI product",
                        },
                        {
                            ru: "Определение инженерных стандартов и UI-платформы",
                            en: "Definition of engineering standards and UI platform",
                        },
                        {
                            ru: "Архитектурные решения и code review",
                            en: "Architecture decisions and code review",
                        },
                    ],
                },
                {
                    label: "PLATFORM",
                    items: [
                        {
                            ru: "Монорепозиторий и масштабируемая UI-архитектура",
                            en: "Monorepo and scalable UI architecture",
                        },
                        {
                            ru: "Frontend guild и кросс-командная синхронизация",
                            en: "Frontend guild and cross-team alignment",
                        },
                        {
                            ru: "Менторинг инженеров",
                            en: "Engineering mentoring",
                        },
                    ],
                },
                {
                    label: "RELIABILITY",
                    items: [
                        {
                            ru: "E2E и unit тестирование (Playwright, Jest)",
                            en: "E2E and unit testing (Playwright, Jest)",
                        },
                        {
                            ru: "Production stability и разбор инцидентов",
                            en: "Production stability and incident resolution",
                        },
                    ],
                },
            ],
        },

        {
            period: {ru: "2023 — 2024", en: "2023 — 2024"},
            dateRange: {ru: "Сентябрь 2023 — Апрель 2024", en: "September 2023 — April 2024"},
            title: {ru: "Development Team Lead / PM", en: "Development Team Lead / PM"},
            company: "НеоБИТ",
            blurb: {
                ru: "AI-продукты для социальных платформ (команда 5 человек).",
                en: "AI products for social platforms (team of 5 engineers).",
            },
            groups: [
                {
                    label: "LEADERSHIP",
                    items: [
                        {
                            ru: "Руководство командой разработки (5 человек)",
                            en: "Leading a 5-engineer development team",
                        },
                        {
                            ru: "Планирование и доставка продуктовых фич",
                            en: "Feature planning and delivery",
                        },
                        {
                            ru: "Code review и инженерный контроль качества",
                            en: "Code review and engineering quality control",
                        },
                    ],
                },
                {
                    label: "PRODUCT",
                    items: [
                        {
                            ru: "Перевод бизнес-требований в технические решения",
                            en: "Translating business requirements into technical solutions",
                        },
                        {
                            ru: "Демонстрации, работа с заказчиком, контроль релизов",
                            en: "Demos, client communication, release management",
                        },
                    ],
                },
                {
                    label: "PROCESS",
                    items: [
                        {
                            ru: "Выстраивание процессов разработки и поддержки продукта",
                            en: "Designing development and support processes",
                        },
                    ],
                },
            ],
        },

        {
            period: {ru: "2022 — 2023", en: "2022 — 2023"},
            dateRange: {ru: "Сентябрь 2022 — Сентябрь 2023", en: "September 2022 — September 2023"},
            title: {ru: "Frontend Developer (Middle)", en: "Frontend Developer (Middle)"},
            company: "НеоБИТ",
            blurb: {
                ru: "Развитие React-приложения и UI-системы.",
                en: "Development of a React application and UI system.",
            },
            groups: [
                {
                    label: "FRONTEND",
                    items: [
                        {
                            ru: "React архитектура и UI-компоненты",
                            en: "React architecture and UI components",
                        },
                        {
                            ru: "Code review и поддержка кодовой базы",
                            en: "Code review and codebase maintenance",
                        },
                    ],
                },
                {
                    label: "DESIGN",
                    items: [
                        {
                            ru: "Проработка UX сценариев",
                            en: "UX scenario design",
                        },
                        {
                            ru: "Работа с Figma макетами",
                            en: "Working with Figma designs",
                        },
                    ],
                },
            ],
        },

        {
            period: {ru: "2022", en: "2022"},
            dateRange: {ru: "Февраль 2022 — Сентябрь 2022", en: "February 2022 — September 2022"},
            title: {ru: "Fullstack Developer (Junior)", en: "Fullstack Developer (Junior)"},
            company: "НеоБИТ",
            blurb: {
                ru: "Разработка SPA приложений.",
                en: "Development of SPA applications.",
            },
            groups: [
                {
                    label: "STACK",
                    items: [
                        {
                            ru: "React + Go + PostgreSQL",
                            en: "React + Go + PostgreSQL",
                        },
                    ],
                },
            ],
        },

        {
            period: {ru: "2021", en: "2021"},
            dateRange: {ru: "Июнь 2021 — Июль 2021", en: "June 2021 — July 2021"},
            title: {ru: "Data Science Intern", en: "Data Science Intern"},
            company: "LG Electronics Russia R&D Lab",
            blurb: {
                ru: "Стажировка в исследовательской команде Data Science.",
                en: "Internship in a Data Science research team.",
            },
            groups: [
                {
                    label: "RESEARCH",
                    items: [
                        {
                            ru: "Методы оптимизации градиентного спуска",
                            en: "Gradient descent optimization methods",
                        },
                    ],
                },
            ],
        },
    ] satisfies Role[],
};

/* ============================================================
   SKILLS (05)
============================================================ */
export const skills = {
    index: "(05)",
    label: { ru: "СТЕК И ЭКСПЕРТИЗА", en: "STACK & EXPERTISE" },
    // Decorative full-bleed marquee at the foot of the section (aria-hidden).
    marquee: ["ENTERPRISE", "PRODUCTION", "RELIABILITY"],

    responsibility: {
        label: { ru: "Инженерная ответственность", en: "Engineering ownership" },
        items: [
            {
                no: "01",
                title: { ru: "От прототипа до production", en: "Prototype to production" },
                text: {
                    ru: "Беру задачу под ключ: от прототипа до прода, с ответственностью за качество и стабильность результата.",
                    en: "I own tasks end-to-end: from prototype to production, accountable for quality and stability of the result.",
                },
            },
            {
                no: "02",
                title: { ru: "Инженерные практики", en: "Engineering practices" },
                text: {
                    ru: "Code review, документация, общие стандарты и шаблоны проверок; база корпоративных навыков для AI-агентов.",
                    en: "Code review, documentation, shared standards and review templates; a corporate skill base for AI agents.",
                },
            },
            {
                no: "03",
                title: { ru: "Выбор технологий", en: "Technology selection" },
                text: {
                    ru: "Подбор и обоснование стека под задачу и ограничения продукта; ответственность за решение в production.",
                    en: "Choosing and justifying the stack for the task and product constraints; owning the decision in production.",
                },
            },
        ],
    },

    technologies: {
        label: { ru: "Технологии", en: "Technologies" },
        groups: [
            {
                label: { ru: "AI / RAG", en: "AI / RAG" },
                items: ["RAG", "Chunking", "Embeddings", "Retrieval", "LLM evaluation", "Python"],
            },
            {
                label: { ru: "Frontend", en: "Frontend" },
                items: ["TypeScript", "React", "Next.js", "Playwright"],
            },
            {
                label: { ru: "Данные и поиск", en: "Data & search" },
                items: ["Elasticsearch", "PostgreSQL", "lakeFS", "MinIO"],
            },
            {
                label: { ru: "Использую по задаче", en: "Used as needed" },
                items: ["Java", "Node.js", "Go", "Docker", "Jenkins", "Sentry", "Graylog"],
            },
        ],
    },
};

/* ============================================================
   CONTACT (06)
============================================================ */
export const contact = {
    index: "(06)",
    label: {ru: "КОНТАКТЫ", en: "CONTACTS"},
    headline: {ru: `Связаться${NB}→`, en: "Let's talk →"},
    headlineHref: links.telegram,
    toTop: {ru: "Наверх", en: "Back to top"},
    links: [
        {kind: "email", value: links.email, href: `mailto:${links.email}`},
        {kind: "Telegram", value: "Telegram", href: links.telegram},
        {kind: "GitHub", value: "GitHub", href: links.github},
        {kind: "LinkedIn", value: "LinkedIn", href: links.linkedin},
        {kind: "VK", value: "VK", href: links.vk},
        {kind: "hh.ru", value: "Резюме на hh.ru", href: links.hh},
    ],
};

/* ============================================================
   FOOTER
============================================================ */
export const footer = {
    left: {
        ru: "Александр Чеченев",
        en: "Alexander Chechenev",
    } satisfies I18n,
};
