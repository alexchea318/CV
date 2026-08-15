import type { ReactNode } from "react";
import "../globals.css";
import { Document } from "@/components/Document";
import { siteMetadata } from "@/lib/meta";

export const metadata = siteMetadata("en");

export default function EnLayout({ children }: { children: ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
