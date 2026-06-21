import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("design tokens", () => {
  it("defines base palette", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toContain("#0A0A0B");
    expect(css).toContain("#EDEAE3");
    expect(css).toContain("--accent-from");
  });
});
