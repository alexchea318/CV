import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";

const NAME = "Alexander Chechenev";
const ROLE = "Full-Stack / AI Engineer (RAG)";
const DESC =
  "I take RAG systems to production: backend, frontend, infrastructure and generation quality. Saint Petersburg, remote.";

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
