import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Reveal } from "@/components/ui/Reveal";

describe("Reveal", () => {
  it("always renders its children (no JS hiding content)", () => {
    render(<Reveal><p>Visible content</p></Reveal>);
    expect(screen.getByText("Visible content")).toBeTruthy();
  });
});
