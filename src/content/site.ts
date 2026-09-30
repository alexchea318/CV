import type {I18n} from "@/lib/i18n";
import {links} from "@/lib/config";

/* ============================================================
   NAV — the name on the left, the PDF on the right. The file keeps "CV" in
   its name: that is what HR sees in their downloads folder.
============================================================ */
export const nav = {
    fileName: {ru: "Резюме Александра Чеченева", en: "Alexander Chechenev CV"} satisfies I18n,
};

/* ============================================================
   HERO — who: the sheet header and the page metadata both read it.
============================================================ */
export const hero = {
    location: {ru: "Санкт-Петербург или удалённо", en: "Remote"} satisfies I18n,
    english: {ru: "английский B2", en: "English B2"} satisfies I18n,
    firstName: {ru: "Александр", en: "Alexander"} satisfies I18n,
    lastName: {ru: "Чеченев", en: "Chechenev"} satisfies I18n,
    roleLine: {
        ru: "AI Engineer (LLM, RAG, оценка качества, агенты)",
        en: "AI Engineer (LLM, RAG, evaluation, agents)",
    } satisfies I18n,
};

/* ============================================================
   META — the search snippet and the social card. Title and role are taken
   from the hero, so the tab, the snippet and the sheet cannot drift
   apart; only the description lives here, kept short for search results.
============================================================ */
export const meta = {
    description: {
        ru: "{tenure} в разработке, с 2023 года создаю LLM-продукты: веду разработку в 7 сервисах enterprise RAG, от поиска и оценки качества до gateway. 3 внедрения on-prem в банках и на производстве, точность ответов 89–96%.",
        en: "{tenure} in software engineering, building LLM products since 2023: leading development across 7 services of an enterprise RAG platform, from search and evaluation to gateway. 3 on-prem deployments in banking and manufacturing at 89–96% answer accuracy.",
    } satisfies I18n,
    ogImage: "/img/me.jpg",
    locality: {ru: "Санкт-Петербург", en: null} satisfies { ru: string; en: string | null },
    country: {ru: "RU", en: "GE"} satisfies I18n,
};

/* ============================================================
   RESUME SHEET — the one-page CV, same document on screen and on paper.
============================================================ */
export type RoleBlock = { title: I18n; period: I18n; items: { text: I18n; stack?: string }[] };
export type CompanyBlock = {
    name: I18n;
    /** Product page; the company name links to it on screen and in the PDF. */
    url?: string;
    period: I18n;
    blurb: I18n;
    roles?: RoleBlock[];
    items?: { text: I18n; stack?: string }[];
};

export const resume = {
    downloadCta: {ru: "Скачать PDF", en: "Download PDF"} satisfies I18n,

    summaryLabel: {ru: "Кратко", en: "Summary"} satisfies I18n,
    summary: {
        ru: "{tenure} в разработке, с 2023 года создаю LLM-продукты. Веду разработку во всех 7 сервисах enterprise RAG-платформы: делаю сквозные фичи от техплана до релиза. 3 внедрения on-prem с точностью ответов 89–96% по оценке LLM-as-a-Judge.",
        en: "{tenure} in software engineering, building LLM products since 2023. I lead development across all 7 services of an enterprise RAG platform, shipping cross-service features from technical plan to release. 3 on‑prem deployments at 89–96% answer accuracy, measured by LLM-as-a-Judge.",
    } satisfies I18n,

    experienceLabel: {ru: "Опыт", en: "Experience"} satisfies I18n,
    companies: [
        {
            name: {ru: "Just AI (Jay Knowledge Hub)", en: "Just AI (Jay Knowledge Hub)"},
            url: "https://just-ai.com/ai-baza-znaniy",
            period: {ru: "апрель 2024 – настоящее время", en: "Apr 2024 – present"},
            blurb: {
                ru: "Enterprise RAG-платформа в реестре отечественного ПО, внедрена в банках и на производстве.",
                en: "Enterprise RAG platform in the Russian software registry, deployed in banking and manufacturing.",
            },
            roles: [
                {
                    title: {ru: "AI Engineer (RAG)", en: "AI Engineer (RAG)"},
                    period: {ru: "декабрь 2025 – настоящее время", en: "Dec 2025 – present"},
                    items: [
                        {
                            text: {
                                ru: "Построил оценку качества и регрессионный гейт в CI: тест-сеты, модель-судья. Охват ассистента вырос с 55 до 3 000 вопросов при прежней точности 89%.",
                                en: "Built quality evaluation and a CI regression gate: test sets, LLM-as-a-Judge. Assistant coverage grew from 55 to 3,000 questions, accuracy holding at 89%.",
                            },
                            stack: "Python, pytest, CI",
                        },
                        {
                            text: {
                                ru: "Провёл версионирование документов через все 7 сервисов: версия стала атрибутом чанка, без переиндексации и ломки API.",
                                en: "Shipped document versioning across all 7 services: version became a chunk attribute, with no reindexing and no breaking API changes.",
                            },
                            stack: "Kotlin, Python, TypeScript",
                        },
                        {
                            text: {
                                ru: "Отвечаю за on-prem поставку под 10 000 пользователей и 1 RPS на пользователя: LTS-ветки, порядок выката общих пакетов.",
                                en: "Own on-prem delivery targeting 10,000 users at 1 RPS per user: LTS branches and rollout ordering across shared packages.",
                            },
                            stack: "Docker, Kubernetes, Jenkins",
                        },
                        {
                            text: {
                                ru: "Устранил 3 источника лишних расходов: повторную генерацию (семантический кэш), повторную оплату краулера, списания при сбое биллинга. 2 инцидента P1 решены в тот же день.",
                                en: "Eliminated 3 sources of unnecessary spend: duplicate generation (semantic cache), duplicate crawler charges, billing during outages. Resolved 2 P1 incidents the same day.",
                            },
                            stack: "Memcached, Grafana, Sentry",
                        },
                        {
                            text: {
                                ru: "Отвечаю за поиск: гибридный поиск, трансформация запроса, реранкинг, GraphRAG. Перенёс проверку прав в сам поиск и закрыл 5 обходов в 4 сервисах.",
                                en: "Own retrieval: hybrid search, query transformation, reranking, GraphRAG. Moved permission checks into search itself, closing 5 bypasses across 4 services.",
                            },
                            stack: "Elasticsearch, Neo4j, RBAC",
                        },
                        {
                            text: {
                                ru: "Разложил цикл разработки на регламенты для людей и AI-агентов: 2 инженера делают объём, на который нужно было 3. Опубликовал MCP-сервер базы знаний (5 инструментов).",
                                en: "Codified the development cycle into runbooks executable by humans and AI agents: 2 engineers now deliver what previously required 3. Built and published the knowledge-base MCP server (5 tools).",
                            },
                            stack: "Claude Code, MCP, GitLab CI",
                        },
                    ],
                },
                {
                    title: {ru: "Senior Frontend Developer", en: "Senior Frontend Developer"},
                    period: {ru: "апрель 2024 – декабрь 2025", en: "Apr 2024 – Dec 2025"},
                    items: [
                        {
                            text: {
                                ru: "Владел frontend-архитектурой: 4 репозитория, 12 разработчиков, 0 уязвимостей в аудитах. Разработал диалоговый интерфейс с потоковым ответом и цитатами.",
                                en: "Owned the frontend architecture: 4 repositories, 12 developers, zero audit vulnerabilities. Built the chat interface with streaming answers and citations.",
                            },
                            stack: "React, Next.js, TypeScript",
                        },
                        {
                            text: {
                                ru: "Руководил миграцией монорепозитория из 12 проектов (React 16 → 19, webpack → Vite, Jest → Vitest), загрузка 3 проектов ускорилась в 2,7 раза.",
                                en: "Led the migration of a 12-project monorepo (React 16 → 19, webpack → Vite, Jest → Vitest); 3 projects load 2.7× faster.",
                            },
                            stack: "Vite, Vitest, Node.js",
                        },
                    ],
                },
            ],
        },
        {
            name: {ru: "НеоБИТ, Development Team Lead и PM", en: "NeoBIT, Development Team Lead and PM"},
            period: {ru: "сентябрь 2023 – апрель 2024", en: "Sep 2023 – Apr 2024"},
            blurb: {
                ru: "Генеративный AI для соцсетей и мессенджеров, сервисы на Go в Kubernetes.",
                en: "Generative AI for social media and messengers; Go services on Kubernetes.",
            },
            items: [
                {
                    text: {
                        ru: "Руководил командой 5 инженеров (Go, frontend, DevOps, ML): 3 продукта на генеративном AI от требований до production за 17 спринтов, все в срок.",
                        en: "Led a team of 5 engineers across Go, frontend, DevOps and ML, taking 3 generative-AI products from requirements to production across 17 sprints, all on time.",
                    },
                },
                {
                    text: {
                        ru: "Совмещал роли тимлида и PM: 15 Epic из бизнес-требований, 8 демо руководству заказчика, 3 поставки в закрытый контур по госконтрактам.",
                        en: "Combined Team Lead and PM responsibilities: 15 epics from business requirements, 8 demos to customer executives, 3 air-gapped deliveries for government contracts.",
                    },
                },
            ],
        },
    ] satisfies CompanyBlock[],

    earlierLabel: {ru: "Ранние роли", en: "Earlier roles"} satisfies I18n,
    earlier: [
        {
            lead: {ru: "НеоБИТ, Frontend и Fullstack Developer", en: "NeoBIT, Frontend and Fullstack Developer"},
            text: {
                ru: "2022–2023: React, библиотека компонентов, первые сервисы на Go.",
                en: "2022–2023: React, a component library, the first Go services.",
            },
        },
        {
            lead: {ru: "LG Electronics Russia R&D Lab, Data Science Intern", en: "LG Electronics Russia R&D Lab, Data Science Intern"},
            text: {
                ru: "Лето 2021: методы оптимизации градиентного спуска.",
                en: "Summer 2021: optimization methods for gradient descent.",
            },
        },
    ] satisfies { lead: I18n; text: I18n }[],

    stackLabel: {ru: "Стек", en: "Stack"} satisfies I18n,
    stack: [
        {
            label: {ru: "LLM и RAG", en: "LLM and RAG"},
            items: {
                ru: "агенты, tool calling, MCP, гибридный поиск, реранкинг, GraphRAG, Elasticsearch, Neo4j, LlamaIndex",
                en: "agents, tool calling, MCP, hybrid search, reranking, GraphRAG, Elasticsearch, Neo4j, LlamaIndex",
            },
        },
        {
            label: {ru: "Оценка качества", en: "Evaluation"},
            items: {
                ru: "LLM-as-a-Judge, тест-сеты, регрессия промптов, метрики в CI, стоимость и задержка",
                en: "LLM-as-a-Judge, test sets, prompt regression, quality metrics in CI, cost and latency",
            },
        },
        {
            label: {ru: "Разработка", en: "Engineering"},
            items: {
                ru: "Python, FastAPI, Kotlin, Go, TypeScript, React, Next.js, PostgreSQL, MinIO, Memcached",
                en: "Python, FastAPI, Kotlin, Go, TypeScript, React, Next.js, PostgreSQL, MinIO, Memcached",
            },
        },
        {
            label: {ru: "Поставка", en: "Delivery"},
            items: {
                ru: "Docker, Kubernetes, Jenkins, GitLab CI, on-prem, Prometheus, Grafana, Sentry",
                en: "Docker, Kubernetes, Jenkins, GitLab CI, on-prem, Prometheus, Grafana, Sentry",
            },
        },
    ] satisfies { label: I18n; items: I18n }[],

    metaLabel: {ru: "Образование и выступления", en: "Education and talks"} satisfies I18n,
    meta: [
        {
            ru: "Специалитет «Информационно-аналитические системы безопасности», СПбПУ",
            en: "Specialist degree in Information and Analytical Security Systems, Peter the Great St. Petersburg Polytechnic University",
        },
        {
            ru: "2025: доклад «Свой ChatGPT в 2021 по цене парсера анекдотов», фестиваль «Елагин Pro»",
            en: "2025: talk “Your own ChatGPT in 2021 for the price of a joke parser”, Elagin Pro festival",
        },
    ] satisfies I18n[],
};

/* ============================================================
   CONTACT — the link row in the sheet header.
============================================================ */
export type ContactLink = {
    kind: string;
    value: string | I18n;
    href: string;
    ruOnly?: true;
    /** Address spelled out for the printout; absent means "screen only". */
    print?: string;
};

// Annotated, not `satisfies`: without the annotation TypeScript narrows every
// value to `string` and the I18n branch in the components becomes unreachable.
// `print` is what the paper carries: on a printout a link is unclickable, so
// the address is spelled out. Links without it are dropped from the printout.
export const contactLinks: ContactLink[] = [
    {kind: "email", value: links.email, href: `mailto:${links.email}`, print: links.email},
    {kind: "Telegram", value: "Telegram", href: links.telegram, print: "t.me/alexchea318"},
    {kind: "LinkedIn", value: "LinkedIn", href: links.linkedin, print: "linkedin.com/in/alexander-chechenev"},
    {kind: "VK", value: "VK", href: links.vk, ruOnly: true, print: "vk.me/schechenev"},
];
