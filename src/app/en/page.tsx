import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";
import { tenurePhrase } from "@/lib/tenure";

const NAME = "Alexander Chechenev";
const ROLE = "AI Engineer · LLM / RAG / evaluation / agents";
const DESC =
  `${tenurePhrase("en")} building LLM products for production: search and retrieval, quality evaluation, agent tooling, gateway and interface, 7 services. 3 products deployed on-prem in banking and manufacturing, answer quality 96%, 90.4% and 89%.`;

export const metadata: Metadata = {
  title: `${NAME} — ${ROLE}`,
  description: DESC,
  alternates: {
    canonical: "/en/",
    languages: { ru: "/", en: "/en/" },
  },
  openGraph: {
    title: `${NAME} — ${ROLE}`,
    description: DESC,
    type: "profile",
    images: ["/img/me.jpg"],
  },
};

export default function HomeEn() {
  return <Portfolio initialLang="en" />;
}
