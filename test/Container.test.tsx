import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Container } from "../src/components/layout/Container";

describe("Container", () => {
  it("renders children correctly", async () => {
    const screen = await render(
      <Container>
        <p>Hello World</p>
      </Container>,
    );
    await expect.element(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies default lg size class", async () => {
    const screen = await render(<Container>Content</Container>);
    const container = screen.getByText("Content");
    await expect.element(container).toHaveClass("max-w-6xl");
    await expect.element(container).toHaveClass("mx-auto");
  });

  it("applies sm size", async () => {
    const screen = await render(<Container size="sm">Content</Container>);
    await expect.element(screen.getByText("Content")).toHaveClass("max-w-2xl");
  });

  it("applies md size", async () => {
    const screen = await render(<Container size="md">Content</Container>);
    await expect.element(screen.getByText("Content")).toHaveClass("max-w-4xl");
  });

  it("applies xl size", async () => {
    const screen = await render(<Container size="xl">Content</Container>);
    await expect.element(screen.getByText("Content")).toHaveClass("max-w-7xl");
  });

  it("applies full size", async () => {
    const screen = await render(<Container size="full">Content</Container>);
    await expect.element(screen.getByText("Content")).toHaveClass("max-w-full");
  });

  it("applies custom className", async () => {
    const screen = await render(<Container className="my-class">Content</Container>);
    const container = screen.getByText("Content");
    await expect.element(container).toHaveClass("my-class");
    await expect.element(container).toHaveClass("mx-auto");
  });
});
