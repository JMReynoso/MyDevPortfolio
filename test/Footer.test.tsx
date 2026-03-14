import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Footer } from "../src/components/layout/Footer";

describe("Footer", () => {
  it("renders text correctly", async () => {
    const screen = await render(<Footer text="Footer Text" />);
    const footer = screen.getByRole("contentinfo");
    await expect.element(footer).toBeInTheDocument();
    await expect.element(screen.getByText("Footer Text")).toBeInTheDocument();
  });

  it("applies default styling classes", async () => {
    const screen = await render(<Footer text="Footer" />);
    const footer = screen.getByRole("contentinfo");
    await expect.element(footer).toHaveClass("py-8");
    await expect.element(footer).toHaveClass("px-6");
    await expect.element(footer).toHaveClass("bg-[#2C2416]");
    await expect.element(footer).toHaveClass("text-center");
  });

  it("applies custom className", async () => {
    const screen = await render(<Footer text="Footer" className="custom" />);
    const footer = screen.getByRole("contentinfo");
    await expect.element(footer).toHaveClass("custom");
  });

  it("renders without text prop", async () => {
    const screen = await render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    await expect.element(footer).toBeInTheDocument();
  });

  it("renders JSX content as text", async () => {
    const screen = await render(<Footer text={<span data-testid="jsx-text">JSX</span>} />);
    await expect.element(screen.getByTestId("jsx-text")).toBeInTheDocument();
  });
});
