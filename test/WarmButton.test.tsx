import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { WarmButton } from "../src/components/common/WarmButton";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
}));

describe("WarmButton", () => {
  it("renders as a button by default (no href)", async () => {
    const screen = await render(<WarmButton>Click Me</WarmButton>);
    const button = screen.getByRole("button");
    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveTextContent("Click Me");
  });

  it("applies default primary variant and md size classes", async () => {
    const screen = await render(<WarmButton>Btn</WarmButton>);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("bg-[#7BA05B]");
    await expect.element(button).toHaveClass("text-white");
    await expect.element(button).toHaveClass("px-8");
    await expect.element(button).toHaveClass("py-4");
    await expect.element(button).toHaveClass("text-base");
  });

  it("applies secondary variant classes", async () => {
    const screen = await render(<WarmButton variant="secondary">Btn</WarmButton>);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("bg-white");
    await expect.element(button).toHaveClass("text-[#2C2416]");
  });

  it("applies outline variant classes", async () => {
    const screen = await render(<WarmButton variant="outline">Btn</WarmButton>);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("bg-transparent");
    await expect.element(button).toHaveClass("text-[#7BA05B]");
    await expect.element(button).toHaveClass("border-2");
  });

  it("applies sm size classes", async () => {
    const screen = await render(<WarmButton size="sm">Btn</WarmButton>);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("px-4");
    await expect.element(button).toHaveClass("py-2");
    await expect.element(button).toHaveClass("text-sm");
  });

  it("applies lg size classes", async () => {
    const screen = await render(<WarmButton size="lg">Btn</WarmButton>);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("px-10");
    await expect.element(button).toHaveClass("py-5");
    await expect.element(button).toHaveClass("text-lg");
  });

  it("renders as Link for internal route href", async () => {
    const screen = await render(<WarmButton href="/about">Go</WarmButton>);
    const link = screen.getByRole("link");
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "/about");
    await expect.element(link).toHaveTextContent("Go");
  });

  it("renders as anchor for external href", async () => {
    const screen = await render(<WarmButton href="https://example.com">External</WarmButton>);
    const link = screen.getByRole("link");
    await expect.element(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders as anchor for anchor link href", async () => {
    const screen = await render(<WarmButton href="#section">Anchor</WarmButton>);
    const link = screen.getByRole("link");
    await expect.element(link).toHaveAttribute("href", "#section");
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const screen = await render(<WarmButton onClick={handleClick}>Click</WarmButton>);
    const button = screen.getByRole("button");
    await button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", async () => {
    const screen = await render(<WarmButton className="my-class">Btn</WarmButton>);
    const button = screen.getByRole("button");
    await expect.element(button).toHaveClass("my-class");
  });
});
