import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProjectCard } from "../src/components/features/ProjectCard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock ImageWithFallback component
vi.mock("../src/components/figma/ImageWithFallback", () => ({
  ImageWithFallback: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} data-testid="image-with-fallback" />
  ),
}));

// Mock WarmBadge component
vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children, variant }: any) => (
    <span data-testid={`warm-badge-${variant}`}>{children}</span>
  ),
}));

describe("ProjectCard Component", () => {
  const defaultProps = {
    title: "Test Project",
    description: "Test Description",
    image: "/test-image.jpg",
    tags: ["React", "TypeScript"],
    link: "/project-link"
  };

  it("renders correctly with all props", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);

    // Check title
    await expect.element(screen.getByText("Test Project")).toBeInTheDocument();

    // Check description
    await expect.element(screen.getByText("Test Description")).toBeInTheDocument();

    // Check image
    const imgElement = screen.getByTestId("image-with-fallback");
    await expect.element(imgElement).toBeInTheDocument();
    await expect.element(imgElement).toHaveAttribute("src", "/test-image.jpg");

    // Check tags
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("React");
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("TypeScript");

    // Check link
    const linkElement = screen.getByRole("link");
    await expect.element(linkElement).toHaveAttribute("href", "/project-link");
  });

  it("renders correctly with minimal props", async () => {
    const minimalProps = {
      title: "Minimal Project",
      description: "Minimal Description",
      image: "/minimal-image.jpg",
      tags: ["Tag"],
      link: "/minimal-link"
    };

    const screen = await render(<ProjectCard {...minimalProps} />);

    // Check basic elements
    await expect.element(screen.getByText("Minimal Project")).toBeInTheDocument();
    await expect.element(screen.getByText("Minimal Description")).toBeInTheDocument();
  });

  it("renders correctly with empty tags", async () => {
    const propsWithEmptyTags = {
      ...defaultProps,
      tags: []
    };

    const screen = await render(<ProjectCard {...propsWithEmptyTags} />);

    // Check that the component renders without errors
    await expect.element(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders correctly with single tag", async () => {
    const singleTagProps = {
      ...defaultProps,
      tags: ["Single Tag"]
    };

    const screen = await render(<ProjectCard {...singleTagProps} />);

    // Check that single tag is rendered
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("Single Tag");
  });

  it("handles special characters in props", async () => {
    const specialCharsProps = {
      title: "Title with 'quotes' and \"double quotes\"",
      description: "Description & Co.",
      image: "/special-image.jpg",
      tags: ["Tag with special chars: @#$%^&*()"],
      link: "/special-link"
    };

    const screen = await render(<ProjectCard {...specialCharsProps} />);

    // Check that special characters are handled
    await expect.element(screen.getByText("Title with 'quotes' and \"double quotes\"")).toBeInTheDocument();
    await expect.element(screen.getByText("Description & Co.")).toBeInTheDocument();
  });
});