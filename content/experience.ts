import type { I18n } from "@/lib/i18n";

/** A single position. One company can hold several over time. */
export type Role = {
  title: I18n<string>;
  period: I18n<string>;
  text: I18n<string>;
};

/** A company with one or more roles, newest role first. */
export type Job = {
  company: string;
  span: I18n<string>; // full tenure at the company
  roles: Role[];
  img?: string;
};

export const experience: Job[] = [
  {
    company: "Just AI",
    span: { ru: "2024 — Сейчас", en: "2024 — Present" },
    img: "/img/just-ai-vb.png",
    roles: [
      {
        title: { ru: "FullStack AI Engineer", en: "FullStack AI Engineer" },
        period: { ru: "2025 — Сейчас", en: "2025 — Present" },
        text: {
          ru: "Полный цикл RAG-систем и AI-агентов: фронтенд и бэкенд (Java/Spring, Python), работа с данными (Elasticsearch, lakeFS), observability и эксплуатация в продакшене.",
          en: "Full-cycle RAG systems and AI agents: frontend and backend (Java/Spring, Python), data (Elasticsearch, lakeFS), observability and production operations.",
        },
      },
      {
        title: { ru: "Senior Frontend Developer", en: "Senior Frontend Developer" },
        period: { ru: "Апрель 2024 — 2025", en: "Apr 2024 — 2025" },
        text: {
          ru: "Разработка и тестирование интерфейсов веб-приложений для LLM-продуктов: TypeScript, React, Vite, Playwright, Figma.",
          en: "Building and testing web app interfaces for LLM products: TypeScript, React, Vite, Playwright, Figma.",
        },
      },
    ],
  },
  {
    company: "НеоБИТ",
    span: { ru: "2022 — 2024", en: "2022 — 2024" },
    img: "/img/neo.jpg",
    roles: [
      {
        title: { ru: "Full-stack разработчик", en: "Full-stack Developer" },
        period: { ru: "Февраль 2022 — Апрель 2024", en: "Feb 2022 — Apr 2024" },
        text: {
          ru: "Разработка веб-приложений: Figma, React, Redux, Go, PostgreSQL.",
          en: "Web application development: Figma, React, Redux, Go, PostgreSQL.",
        },
      },
    ],
  },
  {
    company: "LG Electronics Russia R&D Lab",
    span: { ru: "2021", en: "2021" },
    img: "/img/LG.jpg",
    roles: [
      {
        title: { ru: "Стажировка, Data Science", en: "Data Science Intern" },
        period: { ru: "Июнь 2021 — Июль 2021", en: "Jun 2021 — Jul 2021" },
        text: {
          ru: "Исследование методов оптимизации градиентного спуска.",
          en: "Research on gradient-descent optimization methods.",
        },
      },
    ],
  },
];
