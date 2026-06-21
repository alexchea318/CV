import type { I18n } from "@/lib/i18n";

export const profile = {
  name: { ru: "Александр Чеченев", en: "Alexander Chechenev" },
  role: { ru: "FullStack AI Engineer", en: "FullStack AI Engineer" },
  tagline: {
    ru: "Senior Frontend бэкграунд · RAG и продакшен-LLM системы",
    en: "Senior Frontend background · RAG & production LLM systems",
  },
  about: {
    ru: [
      "Меня зовут Александр Чеченев. Живу в Санкт-Петербурге, закончил Политех (СПБПУ) по специальности «Информационно-аналитические системы безопасности».",
      "Моя специализация — полный цикл разработки и внедрения production-систем, в том числе на базе RAG (Retrieval-Augmented Generation): от требований и архитектуры до деплоя и эксплуатации.",
      "Сильная база в безопасности и низкоуровневом программировании дополняет инженерный подход к веб-разработке, которой я занимаюсь с 2019 года.",
    ],
    en: [
      "I'm Alexander Chechenev. Based in St. Petersburg; graduated from SPbPU (Polytech), \"Information-analytical security systems\".",
      "I specialize in full-cycle development and delivery of production systems, including RAG (Retrieval-Augmented Generation): from requirements and architecture to deployment and operations.",
      "A strong background in security and low-level programming complements my engineering approach to web development, which I've been doing since 2019.",
    ],
  } satisfies { ru: string[]; en: string[] },
  photo: "/img/me.jpg",
};
