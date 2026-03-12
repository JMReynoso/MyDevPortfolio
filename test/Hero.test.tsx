import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Hero } from "../src/components/features/Hero";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock WarmBadge component
vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children, variant, className }: any) => (
    <span data-testid={`warm-badge-${variant}`} className={className}>{children}</span>
  ),
}));

// Mock WarmButton component
vi.mock("../src/components/common/WarmButton", () => ({
  WarmButton: ({ children, href, variant }: any) => (
    <a href={href} data-testid={`warm-button-${variant}`}>{children}</a>
  ),
}));

describe("Hero Component", () => {
  const defaultProps = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    primaryButton: {
      text: "Primary Button",
      href: "/primary"
    },
    secondaryButton: {
      text: "Secondary Button",
      href: "/secondary"
    },
    image: "/test-image.jpg",
    imageAlt: "Test Image"
  };

  it("renders correctly with all props", async () => {
    const screen = await render(<Hero {...defaultProps} />);

    // Check greeting
    await expect.element(screen.getByTestId("warm-badge-accent")).toHaveTextContent("👋 Hello, I'm a developer");

    // Check title
    await expect.element(screen.getByText("Test Title")).toBeInTheDocument();

    // Check subtitle
    await expect.element(screen.getByText("Test Subtitle")).toBeInTheDocument();

    // Check primary button
    await expect.element(screen.getByTestId("warm-button-primary")).toHaveAttribute("href", "/primary");
    await expect.element(screen.getByTestId("warm-button-primary")).toHaveTextContent("Primary Button");

    // Check secondary button
    await expect.element(screen.getByTestId("warm-button-secondary")).toHaveAttribute("href", "/secondary");
    await expect.element(screen.getByTestId("warm-button-secondary")).toHaveTextContent("Secondary Button");

    // Check image
    const imgElement = screen.getByAltText("Test Image");
    await expect.element(imgElement).toBeInTheDocument();
    await expect.element(imgElement).toHaveAttribute("src", "/test-image.jpg");
  });

  it("renders correctly with minimal props", async () => {
    const minimalProps = {
      title: "Minimal Title",
      subtitle: "Minimal Subtitle"
    };

    const screen = await render(<Hero {...minimalProps} />);

    // Check basic elements
    await expect.element(screen.getByText("Minimal Title")).toBeInTheDocument();
    await expect.element(screen.getByText("Minimal Subtitle")).toBeInTheDocument();
  });

  it("renders correctly without buttons", async () => {
    const noButtonsProps = {
      title: "No Buttons Title",
      subtitle: "No Buttons Subtitle"
    };

    const screen = await render(<Hero {...noButtonsProps} />);

    // Check that no buttons are rendered
    await expect(screen.queryByTestId("warm-button-primary")).toBeNull();
    await expect(screen.queryByTestId("warm-button-secondary")).toBeNull();
  });

  it("renders correctly with imageComponent", async () => {
    const imageComponentProps = {
      title: "Title",
      subtitle: "Subtitle",
      imageComponent: <div data-testid="custom-image">Custom Image</div>
    };

    const screen = await render(<Hero {...imageComponentProps} />);

    // Check that custom image component is rendered
    await expect.element(screen.getByTestId("custom-image")).toBeInTheDocument();
    await expect.element(screen.getByText("Custom Image")).toBeInTheDocument();
  });

  it("renders correctly with custom greeting", async () => {
    const customGreetingProps = {
      ...defaultProps,
      greeting: "Custom Greeting"
    };

    const screen = await render(<Hero {...customGreetingProps} />);

    // Check custom greeting
    await expect.element(screen.getByTestId("warm-badge-accent")).toHaveTextContent("Custom Greeting");
  });

  it("handles special characters in props", async () => {
    const specialCharsProps = {
      title: "Title with 'quotes' and \"double quotes\"",
      subtitle: "Subtitle & Co.",
      primaryButton: {
        text: "Button with @#$%^&*()",
        href: "/special"
      },
      secondaryButton: {
        text: "Secondary & More",
        href: "/secondary-special"
      }
    };

    const screen = await render(<Hero {...specialCharsProps} />);

    // Check that special characters are handled
    await expect.element(screen.getByText("Title with 'quotes' and \"double quotes\"")).toBeInTheDocument();
    await expect.element(screen.getByText("Subtitle & Co.")).toBeInTheDocument();
    await expect.element(screen.getByTestId("warm-button-primary")).toHaveTextContent("Button with @#$%^&*()");
  });
});