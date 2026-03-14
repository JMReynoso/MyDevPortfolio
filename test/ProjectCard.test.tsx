import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProjectCard } from "../src/components/features/ProjectCard";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, whileTap, whileInView, initial, animate, transition, viewport, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

vi.mock("../src/components/figma/ImageWithFallback", () => ({
  ImageWithFallback: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} data-testid="project-image" />
  ),
}));

vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children }: any) => (
    <span data-testid={`badge-${children}`}>{children}</span>
  ),
}));

describe("ProjectCard", () => {
  const defaultProps = {
    title: "My Project",
    description: "Project description",
    image: "/project.jpg",
    tags: ["React", "TypeScript"],
    link: "https://example.com",
  };

  it("renders title and description", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);
    await expect.element(screen.getByText("My Project")).toBeInTheDocument();
    await expect.element(screen.getByText("Project description")).toBeInTheDocument();
  });

  it("renders as a link with correct href", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);
    const link = screen.getByRole("link");
    await expect.element(link).toHaveAttribute("href", "https://example.com");
    await expect.element(link).toHaveAttribute("target", "_blank");
    await expect.element(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders project image", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);
    const img = screen.getByTestId("project-image");
    await expect.element(img).toHaveAttribute("src", "/project.jpg");
    await expect.element(img).toHaveAttribute("alt", "My Project");
  });

  it("renders all tags as badges", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);
    await expect.element(screen.getByTestId("badge-React")).toBeInTheDocument();
    await expect.element(screen.getByTestId("badge-TypeScript")).toBeInTheDocument();
  });

  it("renders with empty tags array", async () => {
    const screen = await render(<ProjectCard {...defaultProps} tags={[]} />);
    await expect.element(screen.getByText("My Project")).toBeInTheDocument();
  });

  it("renders with single tag", async () => {
    const screen = await render(<ProjectCard {...defaultProps} tags={["Solo"]} />);
    await expect.element(screen.getByTestId("badge-Solo")).toBeInTheDocument();
  });

  it("applies card styling classes", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);
    const link = screen.getByRole("link");
    await expect.element(link).toHaveClass("rounded-3xl");
    await expect.element(link).toHaveClass("shadow-lg");
  });
});
