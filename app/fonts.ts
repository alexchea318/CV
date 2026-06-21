import { GeistSans } from "geist/font/sans";
import { Unbounded } from "next/font/google";

export const displayFont = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--ff-display",
  display: "swap",
});

export { GeistSans };
