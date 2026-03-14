import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { WarmBadge } from "../src/components/common/WarmBadge";

describe("WarmBadge", () => {
  it("renders children correctly", async () => {
    const screen = await render(<WarmBadge>Test Badge</WarmBadge>);
    await expect.element(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default variant and size classes", async () => {
    const screen = await render(<WarmBadge>Badge</WarmBadge>);
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("bg-[#F5E6D3]");
    await expect.element(badge).toHaveClass("text-[#2C2416]");
    await expect.element(badge).toHaveClass("px-3");
    await expect.element(badge).toHaveClass("py-1");
    await expect.element(badge).toHaveClass("text-sm");
    await expect.element(badge).toHaveClass("rounded-full");
  });

  it("applies accent variant classes", async () => {
    const screen = await render(<WarmBadge variant="accent">Badge</WarmBadge>);
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("bg-[#FFD166]/30");
    await expect.element(badge).toHaveClass("text-[#2C2416]");
  });

  it("applies muted variant classes", async () => {
    const screen = await render(<WarmBadge variant="muted">Badge</WarmBadge>);
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("bg-[#8B6F47]/20");
    await expect.element(badge).toHaveClass("text-[#8B6F47]");
  });

  it("applies success variant classes", async () => {
    const screen = await render(<WarmBadge variant="success">Badge</WarmBadge>);
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("bg-[#7BA05B]/20");
    await expect.element(badge).toHaveClass("text-[#4A6741]");
  });

  it("applies maple variant classes", async () => {
    const screen = await render(<WarmBadge variant="maple">Badge</WarmBadge>);
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("bg-[#C77B58]/20");
    await expect.element(badge).toHaveClass("text-[#C77B58]");
  });

  it("applies sm size classes", async () => {
    const screen = await render(<WarmBadge size="sm">Badge</WarmBadge>);
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("px-2");
    await expect.element(badge).toHaveClass("py-1");
    await expect.element(badge).toHaveClass("text-xs");
  });

  it("applies lg size classes", async () => {
    const screen = await render(<WarmBadge size="lg">Badge</WarmBadge>);
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("px-4");
    await expect.element(badge).toHaveClass("py-2");
    await expect.element(badge).toHaveClass("text-base");
  });

  it("applies custom className", async () => {
    const screen = await render(
      <WarmBadge className="custom-class">Badge</WarmBadge>,
    );
    const badge = screen.getByText("Badge");
    await expect.element(badge).toHaveClass("custom-class");
    await expect.element(badge).toHaveClass("rounded-full");
  });

  it("renders complex JSX children", async () => {
    const screen = await render(
      <WarmBadge>
        <span data-testid="inner">Complex</span>
      </WarmBadge>,
    );
    await expect.element(screen.getByTestId("inner")).toBeInTheDocument();
    await expect.element(screen.getByText("Complex")).toBeInTheDocument();
  });
});
