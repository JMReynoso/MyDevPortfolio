import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Container } from "../src/components/layout/Container";

describe("Container", () => {
  it("renders children correctly", async () => {
    const screen = await render(
      <Container>
        <div data-testid="child-element">Test Content</div>
      </Container>,
    );

    expect.element(screen).toHaveText("Test Content");
  });

  it("applies default size class (lg)", async () => {
    const screen = await render(
      <Container>
        <div>Content</div>
      </Container>,
    );

    expect.element(screen).toHaveClass("max-w-6xl");
  });

  it("applies custom size class", async () => {
    const screen = await render(
      <Container size="sm">
        <div>Content</div>
      </Container>,
    );

    expect.element(screen).toHaveClass("max-w-2xl");
  });

  it("applies custom className", async () => {
    const screen = await render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>,
    );

    expect.element(screen).toHaveClass("custom-class");
  });

  it("applies both size and custom className", async () => {
    const screen = await render(
      <Container size="xl" className="custom-class">
        <div>Content</div>
      </Container>,
    );

    expect.element(screen).toHaveClass("max-w-7xl");
    expect.element(screen).toHaveClass("custom-class");
  });

  it("handles full size correctly", async () => {
    const screen = await render(
      <Container size="full">
        <div>Content</div>
      </Container>,
    );

    expect.element(screen).toHaveClass("max-w-full");
  });
});
