import type {I18n} from "@/lib/i18n";
import {links} from "@/lib/config";

/* ============================================================
   NAV — one destination, the language switch and the write-to-me pill.
============================================================ */
export const nav = {
    brand: {ru: "АЧ", en: "AC"} satisfies I18n,
    name: {ru: "Александр Чеченев", en: "Alexander Chechenev"} satisfies I18n,
    links: [
        {href: "#resume", label: {ru: "Резюме", en: "CV"}},
    ] satisfies { href: string; label: I18n }[],
    cta: {ru: "Контакты", en: "Contacts"} satisfies I18n,
    ctaHref: "#contact",
};

/* ============================================================
   HERO — sells; the sheet below it is the document HR came to read.
   The tenure number is not stored here: lib/tenure derives it from
   February 2022 on every render, so it never goes stale.
============================================================ */
export const hero = {
    openStatus: {ru: "Открыт к предложениям", en: "Open to offers"} satisfies I18n,
    location: {ru: "Санкт-Петербург / удалённо", en: "Remote"} satisfies I18n,
    english: {ru: "английский B2", en: "English B2"} satisfies I18n,
    firstName: {ru: "Александр", en: "Alexander"} satisfies I18n,
    lastName: {ru: "Чеченев", en: "Chechenev"} satisfies I18n,
    roleLine: {
        ru: "AI Engineer · LLM / RAG / оценка качества / агенты",
        en: "AI Engineer · LLM / RAG / evaluation / agents",
    } satisfies I18n,
    // {tenure} is filled from February 2022 at render time — see lib/tenure.
    tagline: {
        ru: "{tenure} создаю LLM-продукты для production. Собираю enterprise-системы на LLM целиком: поиск и извлечение данных, оценка качества, инструменты для агентов, gateway и интерфейс: 7 сервисов.",
        en: "{tenure} building LLM products for production. I assemble enterprise LLM systems end to end: search and retrieval, quality evaluation, agent tooling, gateway and interface: 7 services.",
    } satisfies I18n,
    stats: [
        {
            value: 96,
            suffix: "%",
            label: {ru: "точность ответов в production", en: "answer accuracy in production"},
        },
        {
            value: 20,
            label: {
                ru: "инженеров работают по заданным мной стандартам",
                en: "engineers work to the standards I set",
            },
        },
        {
            value: 7,
            label: {ru: "сервисов под моей ответственностью", en: "services I run"},
        },
    ] satisfies { value: number; suffix?: string; label: I18n }[],
    tenureSuffix: {ru: "в production", en: "in production"} satisfies I18n,
    ctaResume: {ru: "Смотреть резюме ↓", en: "View CV ↓"} satisfies I18n,
};

/* ============================================================
   META — the search snippet and the social card. Title and role are taken
   from the hero, so the tab, the snippet and the first screen cannot drift
   apart; only the description lives here, kept short for search results.
============================================================ */
export const meta = {
    description: {
        ru: "{tenure} создаю LLM-продукты для production: поиск и извлечение данных, оценка качества, инструменты для агентов, gateway и интерфейс, 7 сервисов. 3 продукта внедрены в банках и на производстве, качество ответов 96%, 90,4% и 89%.",
        en: "{tenure} building LLM products for production: search and retrieval, quality evaluation, agent tooling, gateway and interface, 7 services. 3 products deployed on-prem in banking and manufacturing, answer quality 96%, 90.4% and 89%.",
    } satisfies I18n,
    ogImage: "/img/me.jpg",
    locality: {ru: "Санкт-Петербург", en: null} satisfies { ru: string; en: string | null },
    country: "RU",
};

/* ============================================================
   RESUME SHEET — the one-page CV, same document on screen and on paper.
============================================================ */
export type ImpactItem = { claim: I18n; detail: I18n; stack: string };
export type RoleBlock = { title: I18n; period: I18n; items: { text: I18n; stack?: string }[] };
export type CompanyBlock = {
    name: I18n;
    period: I18n;
    blurb: I18n;
    roles?: RoleBlock[];
    items?: { text: I18n; stack?: string }[];
};

export const resume = {
    updatedLabel: {ru: "обновлено", en: "updated"} satisfies I18n,
    downloadCta: {ru: "Скачать PDF", en: "Download PDF"} satisfies I18n,

    summaryLabel: {ru: "Кратко", en: "Summary"} satisfies I18n,
    summary: {
        ru: "{tenure} создаю LLM-продукты для production. Собираю enterprise-системы на LLM целиком: поиск и извлечение данных, оценка качества, инструменты для агентов, gateway и интерфейс: 7 сервисов. 3 продукта внедрены в банках и на производстве, on-prem. Для каждого внедрения зафиксировано качество ответов: 96%, 90,4% и 89%. Система оценки качества разработана и сдана вместе с продуктом.",
        en: "{tenure} building LLM products for production. I assemble enterprise LLM systems end to end: search and retrieval, quality evaluation, agent tooling, gateway and interface: 7 services. 3 products deployed on-prem in banking and manufacturing. Answer quality is on record for every deployment: 96%, 90.4% and 89%. The quality evaluation system was built and shipped together with the product.",
    } satisfies I18n,

    impactLabel: {ru: "Ключевые результаты", en: "Selected impact"} satisfies I18n,
    impact: [
        {
            claim: {
                ru: "Сократил команду с 3 до 2 инженеров без снижения объёма поставки.",
                en: "Cut the team from three engineers to two with no drop in delivery scope.",
            },
            detail: {
                ru: "Разложил рабочий цикл на регламенты разработки: от постановки задачи и создания ветки до changelog и merge request. Процесс исполняют и человек, и AI-агент: объём поставки 7 сервисов остался прежним.",
                en: "I broke the workflow down into development runbooks: from task intake and branch creation to changelog and merge request. Both a human and an AI agent run the process; delivery across 7 services stayed the same.",
            },
            stack: "Claude Code, Cursor, MCP, GitLab CI",
        },
        {
            claim: {
                ru: "Добился точности ответов 96%, 90,4% и 89% в production.",
                en: "Reached 96%, 90.4% and 89% answer accuracy in production.",
            },
            detail: {
                ru: "Построил систему оценки качества и регрессионный гейт: тест-сеты, эталонные ответы, модель-судья, дифференциальные прогоны на каждое изменение в CI. Корпуса от 10 тысяч до 500 тысяч слов, результаты оценки опубликованы вместе с продуктом.",
                en: "I built the quality evaluation system and the regression gate: test sets, reference answers, LLM-as-a-Judge, differential runs on every change in CI. Corpora from 10K to 500K words; the evaluation results are published with the product.",
            },
            stack: "Python, LLM-as-a-Judge, pytest, CI",
        },
        {
            claim: {
                ru: "Устранил 3 источника финансовых потерь и настроил стоимость инференса по результатам замеров.",
                en: "Eliminated three sources of financial loss and tuned inference cost on measured data.",
            },
            detail: {
                ru: "Убрал повторную генерацию семантическим кэшем, сохранил оплаченные внешнему краулеру страницы при повторной обработке, исключил списание токенов при недоступном биллинге. Сравнил 4 модели-судьи по расходу токенов, лимит ответа судьи выбрал на основании 400 вердиктов за 30 дней вместо значения по умолчанию в gateway. Настроил мониторинг TTFT, перцентилей p50, p95 и p99, стоимости и SLA по этапам. 2 инцидента P1 закрыты в день обнаружения: за 4 часа и 2 часа 23 минуты.",
                en: "I removed repeated generation with a semantic cache, kept the pages already paid for to the external crawler across retries, and stopped token charges during billing outages. I compared 4 judge models on token spend and set the judge output limit from 400 verdicts over 30 days instead of the gateway default. I instrumented TTFT, p50, p95 and p99, cost and SLA per stage. 2 P1 incidents were closed the day they were found: in 4 hours and 2 hours 23 minutes.",
            },
            stack: "Python, Memcached, Prometheus, Grafana, Sentry",
        },
        {
            claim: {
                ru: "Закрыл проверкой прав 4 сервиса и 5 способов доступа к данным.",
                en: "Put permission checks across four services and five data-access paths.",
            },
            detail: {
                ru: "Вынес проверку прав из обработчика запроса непосредственно в процесс поиска и извлечения данных: исключил обходы через GraphRAG, табличный поиск, описания картинок, выгрузку архива и прямое чтение фрагментов.",
                en: "I moved the permission check out of the request handler directly into search and retrieval: bypasses through GraphRAG, table search, image descriptions, archive export and direct fragment reads are gone.",
            },
            stack: "Kotlin, Python, Neo4j, RBAC",
        },
        {
            claim: {
                ru: "Разработал 5 инструментов MCP на 2 транспортных протоколах.",
                en: "Built five MCP tools over two transport protocols.",
            },
            detail: {
                ru: "Написал и опубликовал в публичном каталоге MCP-сервер для базы знаний: права по проектному токену, приёмочные тесты, отсутствие операций изменения данных.",
                en: "I wrote and published the knowledge-base MCP server in a public catalog: project-token authorization, acceptance tests, and no data-mutating operations.",
            },
            stack: "Python, MCP, tool calling",
        },
    ] satisfies ImpactItem[],

    experienceLabel: {ru: "Опыт", en: "Experience"} satisfies I18n,
    companies: [
        {
            name: {ru: "Just AI · Jay Knowledge Hub", en: "Just AI · Jay Knowledge Hub"},
            period: {ru: "апрель 2024 — настоящее время", en: "April 2024 — present"},
            blurb: {
                ru: "Enterprise RAG-платформа в реестре отечественного ПО, внедрённая в банках и на производстве. LLM-продукт с первого дня, титул AI Engineer (RAG) с декабря 2025: он закрепил ответственность, которая уже сходилась на индексе, поиске, gateway и интерфейсе.",
                en: "Enterprise RAG platform in the Russian software registry, deployed in banking and manufacturing. LLM product work from day one; the AI Engineer (RAG) title from December 2025 formalized ownership that had already converged on indexing, search, gateway and interface.",
            },
            roles: [
                {
                    title: {ru: "AI Engineer (RAG)", en: "AI Engineer (RAG)"},
                    period: {ru: "декабрь 2025 — настоящее время", en: "December 2025 — present"},
                    items: [
                        {
                            text: {
                                ru: "Отвечаю за поиск и извлечение данных в 7 сервисах: гибридный поиск на Elasticsearch, эмбеддинги, чанкинг, фильтры по метаданным, трансформация запроса, реранкинг, семантический кэш, GraphRAG.",
                                en: "I own search and retrieval across 7 services: Elasticsearch hybrid search, embeddings, chunking, metadata filters, query transformation, reranking, semantic cache, GraphRAG.",
                            },
                        },
                        {
                            text: {
                                ru: "Провёл версионирование документов через 5 сервисов и 4 языка: версия стала атрибутом чанка вместо отдельного индекса, шаг выбора версии на LLM возвращает фильтр к Elasticsearch, смена текущей версии не требует переиндексации источников. Публичный API расширен только опциональными полями: проекты без версий сохранили поведение и задержку поиска.",
                                en: "I shipped document versioning across 5 services and 4 languages: version became a chunk attribute rather than a separate index, an LLM step returns an Elasticsearch filter, and switching the current version needs no reindexing. The public API grew only optional fields, so projects without versions kept their behaviour and search latency.",
                            },
                            stack: "Kotlin, Python, TypeScript, Elasticsearch, LLM",
                        },
                        {
                            text: {
                                ru: "Разработал загрузку из файлов, внешних API и обхода сайтов: docling приводит PDF, сканы и таблицы к единому виду до чанкинга, документ свыше 100 страниц разбивается и идёт через приоритетную очередь, оборванный обход продолжается с сохранённого места, повтор касается только упавших источников.",
                                en: "I built ingestion from files, third-party APIs and web crawling: docling normalizes PDFs, scans and tables before chunking, a document over 100 pages is split and routed through a priority queue, an interrupted crawl resumes from the saved position, and a retry touches only the failed sources.",
                            },
                            stack: "Python, docling, очереди, повторы, MinIO",
                        },
                        {
                            text: {
                                ru: "Отвечаю за on-prem поставку по нормативу 10 000 пользователей и 1 запроса в секунду на пользователя: Docker, Kubernetes, Jenkins, LTS-ветки, порядок выката по общим пакетам.",
                                en: "I own on-prem delivery against a 10,000-user, 1 RPS-per-user target: Docker, Kubernetes, Jenkins, LTS branches, rollout ordering across shared packages.",
                            },
                        },
                    ],
                },
                {
                    title: {ru: "Frontend Developer (Senior)", en: "Frontend Developer (Senior)"},
                    period: {ru: "апрель 2024 — декабрь 2025", en: "April 2024 — December 2025"},
                    items: [
                        {
                            text: {
                                ru: "Разработал диалоговый интерфейс к базе знаний, через который пользователь получает ответы и источники: потоковый вывод ответа, цитаты источников, работа с документами и правами.",
                                en: "I built the conversational interface to the knowledge base, where the user gets answers and sources: streaming answers, source citations, document and permission handling.",
                            },
                            stack: "React, Next.js, TypeScript, REST",
                        },
                        {
                            text: {
                                ru: "Создал интерфейс продукта с нуля вместе со сборкой, маршрутизацией и поставкой, задал стандарты кодовой базы, которую развивают 20 инженеров.",
                                en: "I created the product interface from zero along with its build, routing and delivery, and set the standards for a codebase now developed by 20 engineers.",
                            },
                            stack: "Vite, Node.js, Playwright, Jest, SonarQube",
                        },
                    ],
                },
            ],
        },
        {
            name: {ru: "НеоБИТ · Development Team Lead / PM", en: "NeoBIT · Development Team Lead / PM"},
            period: {ru: "сентябрь 2023 — апрель 2024", en: "September 2023 — April 2024"},
            blurb: {
                ru: "Генеративный AI для социальных платформ, сервисы на Go в Kubernetes.",
                en: "Generative AI for social platforms; Go services on Kubernetes.",
            },
            items: [
                {
                    text: {
                        ru: "Руководил командой 5 инженеров и вывел 3 продукта на генеративном AI от идеи до production.",
                        en: "I led a team of 5 engineers and took 3 generative-AI products from idea to production.",
                    },
                },
                {
                    text: {
                        ru: "Отвечал за архитектуру, планирование, ревью, релизы и технические решения перед заказчиком без посредника.",
                        en: "I owned architecture, planning, review, releases and customer-facing technical decisions with no intermediary.",
                    },
                },
            ],
        },
    ] satisfies CompanyBlock[],

    earlierLabel: {ru: "Ранние роли", en: "Earlier roles"} satisfies I18n,
    earlier: [
        {
            lead: {ru: "Frontend / Fullstack Developer · НеоБИТ", en: "Frontend / Fullstack Developer · NeoBIT"},
            text: {
                ru: "февраль 2022 — сентябрь 2023: React и Go в production, UI-система, первые коммерческие сервисы на Go.",
                en: "February 2022 — September 2023: React and Go in production, a UI system, the first commercial Go services.",
            },
        },
        {
            lead: {ru: "Data Science Intern · LG Electronics Russia R&D Lab", en: "Data Science Intern · LG Electronics Russia R&D Lab"},
            text: {
                ru: "лето 2021: методы оптимизации градиентного спуска.",
                en: "summer 2021: optimization methods for gradient descent.",
            },
        },
    ] satisfies { lead: I18n; text: I18n }[],

    stackLabel: {ru: "Стек", en: "Stack"} satisfies I18n,
    stack: [
        {
            label: {ru: "LLM и агенты", en: "LLM and agents"},
            items: {
                ru: "агенты с инструментами, tool calling, structured output, MCP, контекст-инжиниринг, промпт-инжиниринг, human-in-the-loop, Claude Code, Cursor, коммерческие API и открытые веса, расчёт расхода токенов",
                en: "tool-using agents, tool calling, structured output, MCP, context engineering, prompt engineering, human-in-the-loop, Claude Code, Cursor, commercial APIs and open-weight models, token cost accounting",
            },
        },
        {
            label: {ru: "RAG и поиск", en: "RAG and search"},
            items: {
                ru: "гибридный поиск, реранкинг, эмбеддинги, чанкинг, фильтры по метаданным, трансформация запроса, семантический кэш, GraphRAG, Elasticsearch, Neo4j, LlamaIndex, docling",
                en: "hybrid search, reranking, embeddings, chunking, metadata filters, query transformation, semantic cache, GraphRAG, Elasticsearch, Neo4j, LlamaIndex, docling",
            },
        },
        {
            label: {ru: "Оценка качества", en: "Evaluation"},
            items: {
                ru: "LLM-as-a-Judge, тест-сеты, эталонные ответы, дифференциальные прогоны, регрессия промптов, метрики качества в CI, дрейф качества, стоимость и задержка",
                en: "LLM-as-a-Judge, test sets, reference answers, differential runs, prompt regression, quality metrics in CI, drift detection, cost and latency",
            },
        },
        {
            label: {ru: "Продукт", en: "Product"},
            items: {
                ru: "React, Next.js, TypeScript, Vite, Node.js, REST, потоковый вывод ответа, рендер результатов инструментов, цитаты источников, Playwright, Jest",
                en: "React, Next.js, TypeScript, Vite, Node.js, REST, streaming answers, tool-result rendering, source citations, Playwright, Jest",
            },
        },
        {
            label: {ru: "Сервисы и данные", en: "Services and data"},
            items: {
                ru: "Python, FastAPI, Kotlin, Go, очереди, оркестрация, повторы, идемпотентность, вебхуки, интеграции со сторонними API, PostgreSQL, MinIO, lakeFS, Memcached",
                en: "Python, FastAPI, Kotlin, Go, queues, orchestration, retries, idempotency, webhooks, third-party integrations, PostgreSQL, MinIO, lakeFS, Memcached",
            },
        },
        {
            label: {ru: "Поставка", en: "Delivery"},
            items: {
                ru: "Docker, Kubernetes, Jenkins, GitLab CI, Vault, SonarQube, on-prem поставка, LTS-ветки, Prometheus, Grafana, Sentry, Graylog",
                en: "Docker, Kubernetes, Jenkins, GitLab CI, Vault, SonarQube, on-prem delivery, LTS branches, Prometheus, Grafana, Sentry, Graylog",
            },
        },
    ] satisfies { label: I18n; items: I18n }[],

    metaLabel: {ru: "Образование и признание", en: "Education and recognition"} satisfies I18n,
    meta: [
        {
            ru: "Специалитет «Информационно-аналитические системы безопасности», СПбПУ",
            en: "Specialist degree in Information and Analytical Security Systems, Peter the Great St. Petersburg Polytechnic University",
        },
        {
            ru: "2025: лекция «Свой ChatGPT в 2021 по цене парсера анекдотов» на фестивале «Елагин Pro»",
            en: "2025: speaker, “Your own ChatGPT in 2021 for the price of a joke parser”, Elagin Pro festival",
        },
        {
            ru: "2021: премия Правительства Санкт-Петербурга, лучший молодёжный проект года (Findly)",
            en: "2021: Government of Saint Petersburg Award, Best Youth Project of the Year (Findly)",
        },
    ] satisfies I18n[],
};

/* ============================================================
   CONTACT — unchanged block: the headline, the link row, back to top.
============================================================ */
export type IconKind = "email" | "telegram" | "github" | "linkedin" | "vk" | "hh" | "pdf";
export type ContactLink = {
    kind: string;
    value: string | I18n;
    href: string;
    ruOnly?: true;
    icon?: IconKind;
    /** Address spelled out for the printout; absent means "screen only". */
    print?: string;
    /** Card width in columns of the six-column grid. */
    span?: number;
    /** Width when the RU-only cards are gone and the row has to close up. */
    spanEn?: number;
};

// Annotated, not `satisfies`: without the annotation TypeScript narrows every
// value to `string` and the I18n branch in the components becomes unreachable.
// Six columns, two rows, always. In Russian that is three cards per row; in
// English hh.ru drops out and the two cards left in the first row widen.
// Six columns, two rows, always. Russian fills them with three cards each;
// in English the RU-only cards drop out and the rest widen to three columns.
// GitHub lives in the sheet header only: the code speaks for itself there.
const CONTACT_LINKS: ContactLink[] = [
    {kind: "email", value: links.email, href: `mailto:${links.email}`, icon: "email", span: 2, spanEn: 3},
    {kind: "Telegram", value: "Telegram", href: links.telegram, icon: "telegram", span: 2, spanEn: 3},
    {kind: "hh", value: "hh.ru", href: links.hh, ruOnly: true, icon: "hh", span: 2},
    {kind: "VK", value: "VK", href: links.vk, ruOnly: true, icon: "vk", span: 2},
    {kind: "LinkedIn", value: "LinkedIn", href: links.linkedin, icon: "linkedin", span: 2, spanEn: 3},
];

// The sheet carries VK; hh.ru stays in the contacts block only.
// `print` is what the paper carries: on a printout a link is unclickable, so
// the address is spelled out. Links without it are dropped from the printout.
const SHEET_LINKS: ContactLink[] = [
    {kind: "email", value: links.email, href: `mailto:${links.email}`, print: links.email},
    {kind: "Telegram", value: "Telegram", href: links.telegram, print: "t.me/alexchea318"},
    {kind: "GitHub", value: "GitHub", href: links.github},
    {kind: "LinkedIn", value: "LinkedIn", href: links.linkedin},
    {kind: "VK", value: "VK", href: links.vk, ruOnly: true, print: "vk.me/schechenev"},
];

export const contact = {
    headline: {ru: "Контакты", en: "Contacts"} satisfies I18n,
    downloadCta: {ru: "Скачать резюме в PDF", en: "Download the CV as PDF"} satisfies I18n,
    toTop: {ru: "наверх", en: "back to top"} satisfies I18n,
    links: CONTACT_LINKS,
    sheetLinks: SHEET_LINKS,
};

/* ============================================================
   FOOTER
============================================================ */
export const footer = {
    left: {ru: "Александр Чеченев", en: "Alexander Chechenev"} satisfies I18n,
};
