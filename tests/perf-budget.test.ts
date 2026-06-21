import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("perf budget", () => {
  it("ru page has no external font/CDN requests", () => {
    const html = readFileSync("out/ru/index.html", "utf8");
    expect(html).not.toContain("fonts.googleapis.com");
    expect(html).not.toContain("unpkg.com");
    expect(html).not.toContain("cdn.jsdelivr");
    expect(html).not.toContain("http://localhost");
  });
});
