import { existsSync, readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("seo artifacts", () => {
  it("emits sitemap and robots", () => {
    expect(existsSync("out/sitemap.xml")).toBe(true);
    expect(existsSync("out/robots.txt")).toBe(true);
  });
  it("includes Person JSON-LD and og tags", () => {
    const html = readFileSync("out/ru/index.html", "utf8");
    expect(html).toContain('"@type":"Person"');
    expect(html).toContain("og:title");
  });
});
