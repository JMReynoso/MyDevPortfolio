import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Hero } from "../src/components/features/Hero";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, whileHover, whileTap, whileInView, initial, animate, transition, viewport, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children, variant }: any) => (
    <span data-testid={`badge-${variant}`}>{children}</span>
  ),
}));

vi.mock("../src/components/common/WarmButton", () => ({
  WarmButton: ({ children, href, variant }: any) => (
    <a href={href} data-testid={`button-${variant}`}>{children}</a>
  ),
}));

describe("Hero", () => {
  const fullProps = {
    title: "My Title",
    subtitle: "My Subtitle",
    primaryButton: { text: "Primary", href: "/primary" },
    secondaryButton: { text: "Secondary", href: "/secondary" },
    image: "/hero.jpg",
    imageAlt: "Hero Image",
  };

  it("renders title and subtitle", async () => {
    const screen = await render(<Hero title="My Title" subtitle="My Subtitle" />);
    const heading = screen.getByRole("heading", { level: 1 });
    await expect.element(heading).toHaveTextContent("My Title");
    await expect.element(screen.getByText("My Subtitle")).toBeInTheDocument();
  });

  it("renders default greeting", async () => {
    const screen = await render(<Hero title="Title" subtitle="Sub" />);
    await expect.element(screen.getByTestId("badge-accent")).toBeInTheDocument();
  });

  it("renders custom greeting", async () => {
    const screen = await render(
      <Hero title="Title" subtitle="Sub" greeting="Custom Greeting" />,
    );
    await expect.element(screen.getByText("Custom Greeting")).toBeInTheDocument();
  });

  it("renders primary and secondary buttons", async () => {
    const screen = await render(<Hero {...fullProps} />);
    const primary = screen.getByTestId("button-primary");
    await expect.element(primary).toHaveAttribute("href", "/primary");
    await expect.element(primary).toHaveTextContent("Primary");
    const secondary = screen.getByTestId("button-secondary");
    await expect.element(secondary).toHaveAttribute("href", "/secondary");
    await expect.element(secondary).toHaveTextContent("Secondary");
  });

  it("does not render buttons when not provided", async () => {
    const screen = await render(<Hero title="Title" subtitle="Sub" />);
    await expect.element(screen.getByTestId("button-primary")).not.toBeInTheDocument();
    await expect.element(screen.getByTestId("button-secondary")).not.toBeInTheDocument();
  });

  it("renders image when provided", async () => {
    const screen = await render(<Hero {...fullProps} />);
    const img = screen.getByAltText("Hero Image");
    await expect.element(img).toBeInTheDocument();
    await expect.element(img).toHaveAttribute("src", "/hero.jpg");
  });

  it("renders imageComponent when provided", async () => {
    const screen = await render(
      <Hero
        title="Title"
        subtitle="Sub"
        imageComponent={<div data-testid="custom-img">Custom</div>}
      />,
    );
    await expect.element(screen.getByTestId("custom-img")).toBeInTheDocument();
  });

  it("does not render image section when no image or imageComponent", async () => {
    const screen = await render(<Hero title="Title" subtitle="Sub" />);
    await expect.element(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders section with id=home", async () => {
    const screen = await render(<Hero title="Title" subtitle="Sub" />);
    await expect.element(screen.getByText("Title")).toBeInTheDocument();
  });
});
