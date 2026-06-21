import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("shows role, name and tagline in EN", () => {
    render(<Hero lang="en" />);
    expect(screen.getByText("FullStack AI Engineer")).toBeTruthy();
    expect(screen.getByText("Alexander Chechenev")).toBeTruthy();
    expect(screen.getByText(/RAG & production LLM systems/)).toBeTruthy();
  });
});
