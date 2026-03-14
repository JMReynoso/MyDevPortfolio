import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { ImageWithFallback } from "../src/components/figma/ImageWithFallback";

describe("ImageWithFallback", () => {
  it("renders image with correct src and alt", async () => {
    const screen = await render(
      <ImageWithFallback src="/test.jpg" alt="Test image" />,
    );
    const img = screen.getByRole("img");
    await expect.element(img).toBeInTheDocument();
    await expect.element(img).toHaveAttribute("src", "/test.jpg");
    await expect.element(img).toHaveAttribute("alt", "Test image");
  });

  it("applies className to image", async () => {
    const screen = await render(
      <ImageWithFallback src="/test.jpg" alt="Test" className="my-img" />,
    );
    const img = screen.getByRole("img");
    await expect.element(img).toHaveClass("my-img");
  });

  it("passes through additional props", async () => {
    const screen = await render(
      <ImageWithFallback
        src="/test.jpg"
        alt="Test"
        data-testid="custom-img"
        width={200}
        height={150}
      />,
    );
    const img = screen.getByTestId("custom-img");
    await expect.element(img).toBeInTheDocument();
    await expect.element(img).toHaveAttribute("width", "200");
    await expect.element(img).toHaveAttribute("height", "150");
  });

  it("shows fallback when image fails to load", async () => {
    const screen = await render(
      <ImageWithFallback src="/broken.jpg" alt="Broken image" />,
    );

    const img = screen.getByRole("img");
    // Trigger error event on the actual DOM element
    img.element().dispatchEvent(new Event("error"));

    // Fallback should show an error image with alt text
    const fallbackImg = screen.getByAltText("Error loading image");
    await expect.element(fallbackImg).toBeInTheDocument();
  });

  it("preserves original URL in data attribute on error", async () => {
    const screen = await render(
      <ImageWithFallback src="/original.jpg" alt="Original" />,
    );

    const img = screen.getByRole("img");
    img.element().dispatchEvent(new Event("error"));

    const fallbackImg = screen.getByAltText("Error loading image");
    await expect.element(fallbackImg).toHaveAttribute("data-original-url", "/original.jpg");
  });
});
