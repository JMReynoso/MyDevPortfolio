import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { WarmButton } from "../src/components/common/WarmButton";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock react-router
vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  ),
}));

describe("WarmButton", () => {
  const mockChildren = "Test Button";

  it("renders correctly with default props", async () => {
    const screen = await render(<WarmButton>{mockChildren}</WarmButton>);

    // Check that the component is rendered
    const button = screen.getByText(mockChildren);
    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass("bg-[#7BA05B]");
    await expect.element(button).toHaveClass("text-white");
    await expect.element(button).toHaveClass("px-8");
    await expect.element(button).toHaveClass("py-4");
    await expect.element(button).toHaveClass("text-base");
  });

  it("renders correctly with different variants", async () => {
    const variants = ["primary", "secondary", "outline"] as const;
    
    for (const variant of variants) {
      const screen = await render(<WarmButton variant={variant}>{mockChildren}</WarmButton>);
      
      const button = screen.getByText(mockChildren);
      await expect.element(button).toBeInTheDocument();
    }
  });

  it("renders correctly with different sizes", async () => {
    const sizes = ["sm", "md", "lg"] as const;
    
    for (const size of sizes) {
      const screen = await render(<WarmButton size={size}>{mockChildren}</WarmButton>);
      
      const button = screen.getByText(mockChildren);
      await expect.element(button).toBeInTheDocument();
    }
  });

  it("renders correctly with href prop (external URL)", async () => {
    const screen = await render(<WarmButton href="https://example.com">{mockChildren}</WarmButton>);

    const link = screen.getByRole("link");
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders correctly with href prop (internal route)", async () => {
    const screen = await render(<WarmButton href="/internal">{mockChildren}</WarmButton>);

    const link = screen.getByRole("link");
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "/internal");
  });

  it("renders correctly with href prop (anchor link)", async () => {
    const screen = await render(<WarmButton href="#section1">{mockChildren}</WarmButton>);

    const link = screen.getByRole("link");
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "#section1");
  });

  it("renders correctly with onClick prop", async () => {
    const handleClick = vi.fn();
    const screen = await render(<WarmButton onClick={handleClick}>{mockChildren}</WarmButton>);

    const button = screen.getByRole("button");
    await expect.element(button).toBeInTheDocument();

    // Simulate click
    button.click();
    await expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className correctly", async () => {
    const screen = await render(<WarmButton className="custom-class">{mockChildren}</WarmButton>);
    
    const button = screen.getByText(mockChildren);
    await expect.element(button).toHaveClass("custom-class");
  });

  it("renders with children correctly", async () => {
    const screen = await render(<WarmButton>{mockChildren}</WarmButton>);
    
    const button = screen.getByText(mockChildren);
    await expect.element(button).toBeInTheDocument();
  });

  it("renders with complex children", async () => {
    const complexChildren = <span data-testid="complex-child">Complex Content</span>;
    const screen = await render(<WarmButton>{complexChildren}</WarmButton>);
    
    await expect.element(screen.getByTestId("complex-child")).toBeInTheDocument();
  });
});