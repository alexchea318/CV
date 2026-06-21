import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("design tokens", () => {
  it("defines the editorial monochrome palette", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toContain("#0A0A0A"); // near-black background
    expect(css).toContain("#F2F0EC"); // warm bone white foreground
    expect(css).toContain("--color-muted");
  });

  it("defines the dramatic display type scale", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toContain("--text-mega");
    expect(css).toContain("--text-giant");
  });

  it("stays monochrome — no accent-gradient tokens", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).not.toContain("--accent-from");
  });
});
