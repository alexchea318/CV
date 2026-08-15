import type { ReactNode } from "react";
import "../globals.css";
import { Document } from "@/components/Document";
import { siteMetadata } from "@/lib/meta";

export const metadata = siteMetadata("ru");

export default function RuLayout({ children }: { children: ReactNode }) {
  return <Document lang="ru">{children}</Document>;
}
