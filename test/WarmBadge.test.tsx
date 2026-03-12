import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { WarmBadge } from "../src/components/common/WarmBadge";

describe("WarmBadge", () => {
  const mockChildren = "Test Badge";

  it("renders correctly with default props", async () => {
    const screen = await render(<WarmBadge>{mockChildren}</WarmBadge>);

    // Check that the component is rendered
    await expect.element(screen.getByText(mockChildren)).toBeInTheDocument();
    await expect
      .element(screen.getByText(mockChildren))
      .toHaveClass("bg-[#F5E6D3]");
    await expect
      .element(screen.getByText(mockChildren))
      .toHaveClass("text-[#2C2416]");
    await expect.element(screen.getByText(mockChildren)).toHaveClass("px-3");
    await expect.element(screen.getByText(mockChildren)).toHaveClass("py-1");
    await expect.element(screen.getByText(mockChildren)).toHaveClass("text-sm");
  });

  it("renders correctly with different variants", async () => {
    const variants = [
      "default",
      "accent",
      "muted",
      "success",
      "maple",
    ] as const;

    for (const [index, variant] of variants.entries()) {
      const screen = await render(
        <WarmBadge variant={variant}>{mockChildren + " " + index}</WarmBadge>,
      );

      await expect.element(screen.getByText(mockChildren + " " + index)).toBeInTheDocument();
    }
  });

  it("renders correctly with different sizes", async () => {
    const sizes = ["sm", "md", "lg"] as const;

    for (const [index, size] of sizes.entries()) {
      const screen = await render(
        <WarmBadge size={size}>{mockChildren + " " + index}</WarmBadge>,
      );

      await expect.element(screen.getByText(mockChildren + " " + index)).toBeInTheDocument();
    }
  });

  it("applies custom className correctly", async () => {
    const screen = await render(
      <WarmBadge className="custom-class">{mockChildren}</WarmBadge>,
    );

    await expect
      .element(screen.getByText(mockChildren))
      .toHaveClass("custom-class");
  });

  it("renders with children correctly", async () => {
    const screen = await render(<WarmBadge>{mockChildren}</WarmBadge>);

    await expect.element(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it("renders with complex children", async () => {
    const complexChildren = (
      <span data-testid="complex-child">Complex Content</span>
    );
    const screen = await render(<WarmBadge>{complexChildren}</WarmBadge>);

    await expect
      .element(screen.getByTestId("complex-child"))
      .toBeInTheDocument();
  });
});
