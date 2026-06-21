import { describe, it, expect } from "vitest";
import { pick, isLocale, locales, defaultLocale } from "@/lib/i18n";

describe("i18n", () => {
  it("has exactly ru and en", () => {
    expect(locales).toEqual(["ru", "en"]);
    expect(defaultLocale).toBe("ru");
  });
  it("picks the right field", () => {
    const f = { ru: "Привет", en: "Hello" };
    expect(pick(f, "ru")).toBe("Привет");
    expect(pick(f, "en")).toBe("Hello");
  });
  it("validates locales", () => {
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });
});
