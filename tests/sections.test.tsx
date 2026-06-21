import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Contacts } from "@/components/sections/Contacts";
import { Projects } from "@/components/sections/Projects";

describe("sections", () => {
  it("hides VK in EN, shows it in RU", () => {
    const { rerender, container } = render(<Contacts lang="en" />);
    expect(within(container).queryByText("@schechenev")).toBeNull();
    rerender(<Contacts lang="ru" />);
    expect(screen.getByText("@schechenev")).toBeTruthy();
  });
  it("lists Jay Knowledge Hub first", () => {
    render(<Projects lang="en" />);
    expect(screen.getByText("Jay Knowledge Hub")).toBeTruthy();
  });
});
