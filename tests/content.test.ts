import { describe, it, expect } from "vitest";
import { capabilities } from "@/content/capabilities";
import { experience } from "@/content/experience";
import { contacts } from "@/content/contacts";

describe("content", () => {
  it("has 5 capability categories incl. AI & Automation", () => {
    expect(capabilities).toHaveLength(5);
    expect(capabilities.map((c) => c.category.en)).toContain("AI & Automation");
  });
  it("keeps all three jobs", () => {
    expect(experience.map((e) => e.company)).toEqual(["Just AI", "НеоБИТ", "LG Electronics Russia R&D Lab"]);
  });
  it("marks VK as ru-only and LinkedIn as placeholder", () => {
    const vk = contacts.find((c) => c.label === "VK");
    const li = contacts.find((c) => c.label === "LinkedIn");
    expect(vk?.ruOnly).toBe(true);
    expect(li?.placeholder).toBe(true);
  });
});
