import type { I18n } from "@/lib/i18n";

type Cap = { category: I18n<string>; items: I18n<string>[] };

export const capabilities: Cap[] = [
  {
    category: { ru: "Core", en: "Core" },
    items: [
      { ru: "Полный цикл разработки: от требований до продакшена", en: "Full-cycle development: from requirements to production" },
      { ru: "Системный анализ и формализация требований", en: "Systems analysis & requirements formalization" },
      { ru: "Проектирование UI/UX (Figma)", en: "UI/UX design (Figma)" },
      { ru: "Backend: Java (Spring), Python", en: "Backend: Java (Spring), Python" },
      { ru: "Работа с данными: Elasticsearch, PostgreSQL", en: "Data: Elasticsearch, PostgreSQL" },
      { ru: "Data versioning: lakeFS", en: "Data versioning: lakeFS" },
      { ru: "Интеграции: внешние сервисы и API", en: "Integrations: external services & APIs" },
      { ru: "Frontend: React, TypeScript", en: "Frontend: React, TypeScript" },
    ],
  },
  {
    category: { ru: "Тестирование", en: "Testing" },
    items: [
      { ru: "Backend: unit, integration (pytest, Spring Test)", en: "Backend: unit, integration (pytest, Spring Test)" },
      { ru: "Frontend: unit (Jest)", en: "Frontend: unit (Jest)" },
      { ru: "E2E: Playwright", en: "E2E: Playwright" },
    ],
  },
  {
    category: { ru: "Observability и качество", en: "Observability & Quality" },
    items: [
      { ru: "Production observability: Graylog, Grafana, Sentry", en: "Production observability: Graylog, Grafana, Sentry" },
      { ru: "Мониторинг и контроль деградации качества RAG/LLM систем", en: "Monitoring & control of RAG/LLM quality degradation" },
      { ru: "Диагностика ошибок генерации и retrieval", en: "Diagnosing generation & retrieval errors" },
    ],
  },
  {
    category: { ru: "Инфраструктура и DevOps", en: "Infrastructure & DevOps" },
    items: [
      { ru: "CI/CD: Docker, Jenkins", en: "CI/CD: Docker, Jenkins" },
      { ru: "Контейнеризация и сборка сервисов", en: "Containerization & service builds" },
      { ru: "Pipeline'ы: сборка, тестирование, деплой", en: "Pipelines: build, test, deploy" },
      { ru: "Управление окружениями (dev/stage/prod)", en: "Environment management (dev/stage/prod)" },
      { ru: "Диагностика и устранение инцидентов в продакшене", en: "Production incident diagnosis & resolution" },
    ],
  },
  {
    category: { ru: "AI и автоматизация", en: "AI & Automation" },
    items: [
      { ru: "AI-агенты в разработке (включая Claude Code)", en: "AI agents in development (incl. Claude Code)" },
      { ru: "Автоматизация через skills и сценарии", en: "Automation via skills & scenarios" },
      { ru: "Разработка собственных skills и MCP-серверов", en: "Building custom skills & MCP servers" },
    ],
  },
];
