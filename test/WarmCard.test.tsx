import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { WarmCard } from "../src/components/common/WarmCard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("WarmCard", () => {
  const mockChildren = "Test Card";

  it("renders correctly with default props", async () => {
    const screen = await render(<WarmCard>{mockChildren}</WarmCard>);

    // Check that the component is rendered
    const card = screen.getByText(mockChildren);
    await expect.element(card).toBeInTheDocument();
    await expect.element(card).toHaveClass("bg-white");
    await expect.element(card).toHaveClass("p-6");
    await expect.element(card).toHaveClass("rounded-3xl");
  });

  it("renders correctly with different variants", async () => {
    const variants = ["default", "muted", "elevated"] as const;
    
    for (const variant of variants) {
      const screen = await render(<WarmCard variant={variant}>{mockChildren}</WarmCard>);
      
      const card = screen.getByText(mockChildren);
      await expect.element(card).toBeInTheDocument();
    }
  });

  it("renders correctly with different padding", async () => {
    const paddingOptions = ["none", "sm", "md", "lg"] as const;
    
    for (const padding of paddingOptions) {
      const screen = await render(<WarmCard padding={padding}>{mockChildren}</WarmCard>);
      
      const card = screen.getByText(mockChildren);
      await expect.element(card).toBeInTheDocument();
    }
  });

  it("renders correctly with different rounded values", async () => {
    const roundedOptions = ["md", "lg", "xl", "2xl", "3xl"] as const;
    
    for (const rounded of roundedOptions) {
      const screen = await render(<WarmCard rounded={rounded}>{mockChildren}</WarmCard>);
      
      const card = screen.getByText(mockChildren);
      await expect.element(card).toBeInTheDocument();
    }
  });

  it("renders correctly with hover prop", async () => {
    const screen = await render(<WarmCard hover>{mockChildren}</WarmCard>);
    
    const card = screen.getByText(mockChildren);
    await expect.element(card).toBeInTheDocument();
  });

  it("applies custom className correctly", async () => {
    const screen = await render(<WarmCard className="custom-class">{mockChildren}</WarmCard>);
    
    const card = screen.getByText(mockChildren);
    await expect.element(card).toHaveClass("custom-class");
  });

  it("renders with children correctly", async () => {
    const screen = await render(<WarmCard>{mockChildren}</WarmCard>);
    
    const card = screen.getByText(mockChildren);
    await expect.element(card).toBeInTheDocument();
  });

  it("renders with complex children", async () => {
    const complexChildren = <span data-testid="complex-child">Complex Content</span>;
    const screen = await render(<WarmCard>{complexChildren}</WarmCard>);
    
    await expect.element(screen.getByTestId("complex-child")).toBeInTheDocument();
  });
});