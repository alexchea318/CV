// @vitest-environment node
import { existsSync, readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("static export", () => {
  it("emits ru and en pages with hero text", () => {
    expect(existsSync("out/ru/index.html")).toBe(true);
    expect(existsSync("out/en/index.html")).toBe(true);
    const ru = readFileSync("out/ru/index.html", "utf8");
    expect(ru).toContain("FullStack AI Engineer");
  });
});
