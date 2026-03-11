import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { IconButton } from "../src/components/common/IconButton";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}));

// Mock Lucide icon
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe("IconButton", () => {
  const mockProps = {
    icon: MockIcon,
    variant: "green" as const,
    size: "md" as const,
    label: "Test button",
  };

  it("renders correctly with all props", async () => {
    const screen = await render(<IconButton {...mockProps} />);

    // Check that the button is rendered
    await expect.element(screen.getByRole("button")).toBeInTheDocument();

    // Check that the icon is present
    await expect.element(screen.getByTestId("mock-icon")).toBeInTheDocument();

    // Check that the label is set
    await expect.element(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Test button",
    );
  });

  it("renders correctly with href prop", async () => {
    const screen = await render(
      <IconButton {...mockProps} href="https://example.com" />,
    );

    // Check that the link is rendered
    const link = screen.getByRole("link");
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "https://example.com");
    await expect.element(link).toHaveAttribute("target", "_blank");
    await expect.element(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders correctly with onClick prop", async () => {
    const handleClick = vi.fn();
    const screen = await render(<IconButton {...mockProps} onClick={handleClick} />);

    // Check that the button is rendered
    const button = screen.getByRole("button");
    await expect.element(button).toBeInTheDocument();

    // Simulate click
    await button.click();
  });

  it("renders correctly with different variants", async () => {
    const variants = ["green", "maple", "yellow", "brown"] as const;

    variants.forEach( async (variant) => {
      const screen = await render(<IconButton {...mockProps} variant={variant} />);

      const button = screen.getByRole("button");
      await expect.element(button).toBeInTheDocument();
    });
  });

  it("renders correctly with different sizes", async () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach(async (size) => {
      const screen = await render(<IconButton {...mockProps} size={size} />);

      const button = screen.getByRole("button");
      await expect.element(button).toBeInTheDocument();
    });
  });

  it("applies custom className correctly", async () => {
    const screen = await render(
      <IconButton {...mockProps} className="custom-class" />,
    );

    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("custom-class");
  });
});
