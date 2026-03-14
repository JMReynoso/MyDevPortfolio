import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { WarmCard } from "../src/components/common/WarmCard";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("WarmCard", () => {
  it("renders children correctly", async () => {
    const screen = await render(<WarmCard>Card Content</WarmCard>);
    await expect.element(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies default variant, padding, and rounded classes", async () => {
    const screen = await render(<WarmCard>Card</WarmCard>);
    const card = screen.getByText("Card");
    await expect.element(card).toHaveClass("bg-white");
    await expect.element(card).toHaveClass("p-6");
    await expect.element(card).toHaveClass("rounded-3xl");
    await expect.element(card).toHaveClass("transition-all");
  });

  it("renders as a plain div when hover is false (default)", async () => {
    const screen = await render(<WarmCard>Card</WarmCard>);
    const card = screen.getByText("Card");
    await expect.element(card).toBeInTheDocument();
  });

  it("renders with motion.div when hover is true", async () => {
    const screen = await render(<WarmCard hover>Card</WarmCard>);
    const card = screen.getByText("Card");
    await expect.element(card).toBeInTheDocument();
    await expect.element(card).toHaveClass("bg-white");
  });

  it("applies muted variant", async () => {
    const screen = await render(<WarmCard variant="muted">Card</WarmCard>);
    const card = screen.getByText("Card");
    await expect.element(card).toHaveClass("bg-[#F5E6D3]");
  });

  it("applies elevated variant", async () => {
    const screen = await render(<WarmCard variant="elevated">Card</WarmCard>);
    const card = screen.getByText("Card");
    await expect.element(card).toHaveClass("shadow-lg");
  });

  it("applies no padding", async () => {
    const screen = await render(<WarmCard padding="none">Card</WarmCard>);
    const card = screen.getByText("Card");
    await expect.element(card).not.toHaveClass("p-4");
    await expect.element(card).not.toHaveClass("p-6");
    await expect.element(card).not.toHaveClass("p-8");
  });

  it("applies sm padding", async () => {
    const screen = await render(<WarmCard padding="sm">Card</WarmCard>);
    await expect.element(screen.getByText("Card")).toHaveClass("p-4");
  });

  it("applies lg padding", async () => {
    const screen = await render(<WarmCard padding="lg">Card</WarmCard>);
    await expect.element(screen.getByText("Card")).toHaveClass("p-8");
  });

  it("applies md rounded", async () => {
    const screen = await render(<WarmCard rounded="md">Card</WarmCard>);
    await expect.element(screen.getByText("Card")).toHaveClass("rounded-xl");
  });

  it("applies custom className", async () => {
    const screen = await render(<WarmCard className="custom">Card</WarmCard>);
    await expect.element(screen.getByText("Card")).toHaveClass("custom");
  });

  it("renders complex JSX children", async () => {
    const screen = await render(
      <WarmCard>
        <span data-testid="child">Complex Content</span>
      </WarmCard>,
    );
    await expect.element(screen.getByTestId("child")).toBeInTheDocument();
  });
});
