import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Footer } from "../src/components/layout/Footer";

describe("Footer", () => {
  it("renders children correctly", async () => {
    const screen = await render(<Footer text="Test Footer Text" />);

    await expect.element(screen).toHaveText("Test Footer Text");
  });

  it("applies default classes", async () => {
    const screen = await render(<Footer text="Test Footer Text" />);

    await expect.element(screen).toHaveClass("py-8");
    await expect.element(screen).toHaveClass("px-6");
    await expect.element(screen).toHaveClass("bg-[#2C2416]");
    await expect.element(screen).toHaveClass("text-center");
  });

  it("applies custom className", async () => {
    const screen = await render(
      <Footer text="Test Footer Text" className="custom-footer-class" />,
    );

    await expect.element(screen).toHaveClass("custom-footer-class");
  });

  it("handles empty text prop", async () => {
    const screen = await render(<Footer />);

    await expect.element(screen).toHaveText("");
  });

  it("renders with null text", async () => {
    const screen = await render(<Footer text={null as any} />);

    await expect.element(screen).toHaveText("");
  });
});
