import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { IconButton } from "../src/components/common/IconButton";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

const MockIcon = ((props: any) => <span data-testid="mock-icon" {...props} />) as any;

describe("IconButton", () => {
  const defaultProps = {
    icon: MockIcon,
    label: "Test button",
  };

  it("renders as a button by default", async () => {
    const screen = await render(<IconButton {...defaultProps} />);
    const button = screen.getByRole("button");
    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveAttribute("aria-label", "Test button");
  });

  it("renders icon inside button", async () => {
    const screen = await render(<IconButton {...defaultProps} />);
    await expect.element(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("applies default green variant and md size", async () => {
    const screen = await render(<IconButton {...defaultProps} />);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("bg-[#7BA05B]");
    await expect.element(button).toHaveClass("w-14");
    await expect.element(button).toHaveClass("h-14");
  });

  it("applies maple variant", async () => {
    const screen = await render(<IconButton {...defaultProps} variant="maple" />);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("bg-[#C77B58]");
  });

  it("applies yellow variant", async () => {
    const screen = await render(<IconButton {...defaultProps} variant="yellow" />);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("bg-[#FFD166]");
  });

  it("applies brown variant", async () => {
    const screen = await render(<IconButton {...defaultProps} variant="brown" />);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("bg-[#8B6F47]");
  });

  it("applies sm size", async () => {
    const screen = await render(<IconButton {...defaultProps} size="sm" />);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("w-10");
    await expect.element(button).toHaveClass("h-10");
  });

  it("applies lg size", async () => {
    const screen = await render(<IconButton {...defaultProps} size="lg" />);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("w-16");
    await expect.element(button).toHaveClass("h-16");
  });

  it("renders as a link when href is provided", async () => {
    const screen = await render(<IconButton {...defaultProps} href="https://example.com" />);
    const link = screen.getByRole("link");
    await expect.element(link).toHaveAttribute("href", "https://example.com");
    await expect.element(link).toHaveAttribute("target", "_blank");
    await expect.element(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not set target/rel for non-http href", async () => {
    const screen = await render(<IconButton {...defaultProps} href="#section" />);
    const link = screen.getByRole("link");
    await expect.element(link).toHaveAttribute("href", "#section");
  });

  it("calls onClick handler", async () => {
    const handleClick = vi.fn();
    const screen = await render(<IconButton {...defaultProps} onClick={handleClick} />);
    await screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", async () => {
    const screen = await render(<IconButton {...defaultProps} className="custom" />);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("custom");
    await expect.element(button).toHaveClass("rounded-2xl");
  });
});
