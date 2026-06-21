import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Reveal } from "@/components/ui/Reveal";

describe("Reveal", () => {
  it("always renders its children (no JS hiding content)", () => {
    render(<Reveal><p>Visible content</p></Reveal>);
    expect(screen.getByText("Visible content")).toBeTruthy();
  });

  describe("desktop branch", () => {
    let originalMatchMedia: typeof window.matchMedia;
    let originalIntersectionObserver: typeof window.IntersectionObserver;

    beforeEach(() => {
      // Mock IntersectionObserver (required by framer-motion's whileInView in jsdom)
      originalIntersectionObserver = window.IntersectionObserver;
      window.IntersectionObserver = class MockIntersectionObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      } as unknown as typeof IntersectionObserver;

      // Override matchMedia so useIsDesktop() resolves to true
      originalMatchMedia = window.matchMedia;
      window.matchMedia = (query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      });
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
      window.IntersectionObserver = originalIntersectionObserver;
    });

    it("renders children inside motion.div on desktop", async () => {
      await act(async () => {
        render(<Reveal><p>Desktop content</p></Reveal>);
      });
      expect(screen.getByText("Desktop content")).toBeTruthy();
    });
  });
});
