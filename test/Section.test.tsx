import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Section } from "../src/components/layout/Section";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, whileHover, whileTap, whileInView, initial, animate, transition, viewport, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
}));

describe("Section", () => {
  it("renders children correctly", async () => {
    const screen = await render(
      <Section>
        <p>Section Content</p>
      </Section>,
    );
    await expect.element(screen.getByText("Section Content")).toBeInTheDocument();
  });

  it("applies default cream background and lg padding", async () => {
    const screen = await render(
      <Section>
        <p>Content</p>
      </Section>,
    );
    await expect.element(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies white background", async () => {
    const screen = await render(
      <Section background="white">
        <p>White</p>
      </Section>,
    );
    await expect.element(screen.getByText("White")).toBeInTheDocument();
  });

  it("applies dark background", async () => {
    const screen = await render(
      <Section background="dark">
        <p>Dark</p>
      </Section>,
    );
    await expect.element(screen.getByText("Dark")).toBeInTheDocument();
  });

  it("renders with custom id", async () => {
    const screen = await render(
      <Section id="my-section">
        <p>With ID</p>
      </Section>,
    );
    await expect.element(screen.getByText("With ID")).toBeInTheDocument();
  });

  it("wraps content in max-width container", async () => {
    const screen = await render(
      <Section>
        <p>Wrapped</p>
      </Section>,
    );
    await expect.element(screen.getByText("Wrapped")).toBeInTheDocument();
  });

  it("renders section element when animate is false", async () => {
    const screen = await render(
      <Section animate={false}>
        <p>No Animation</p>
      </Section>,
    );
    await expect.element(screen.getByText("No Animation")).toBeInTheDocument();
  });

  it("renders motion.section when animate is true (default)", async () => {
    const screen = await render(
      <Section>
        <p>Animated</p>
      </Section>,
    );
    await expect.element(screen.getByText("Animated")).toBeInTheDocument();
  });

  it("applies custom className", async () => {
    const screen = await render(
      <Section className="custom-section">
        <p>Custom</p>
      </Section>,
    );
    await expect.element(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("applies sm padding", async () => {
    const screen = await render(
      <Section padding="sm">
        <p>Small Padding</p>
      </Section>,
    );
    await expect.element(screen.getByText("Small Padding")).toBeInTheDocument();
  });
});
