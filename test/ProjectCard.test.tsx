import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProjectCard } from "../src/components/features/ProjectCard";

vi.mock("framer-motion", () => {
  const stripMotionProps = ({ whileHover, whileTap, whileInView, initial, animate, transition, viewport, ...props }: any) => props;

  return {
    motion: {
      a: (props: any) => <a {...stripMotionProps(props)} />,
      div: (props: any) => <div {...stripMotionProps(props)} />,
    },
  };
});

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

  it("crops the image from the top by default", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);
    const img = screen.getByTestId("project-image");
    await expect.element(img).toHaveClass("object-cover");
    await expect.element(img).not.toHaveClass("object-contain");
  });

  it("shows a contained image whole and centred on Warm Cream", async () => {
    const screen = await render(<ProjectCard {...defaultProps} imageFit="contain" />);
    const img = screen.getByTestId("project-image");
    await expect.element(img).toHaveClass("object-contain");
    await expect.element(img).toHaveClass("h-full");
    await expect.element(img).not.toHaveClass("object-cover");
    expect(img.element().parentElement).toHaveClass("bg-[#FFF8F0]");
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

  it("applies the hover shadow when it has a link", async () => {
    const screen = await render(<ProjectCard {...defaultProps} />);
    await expect.element(screen.getByRole("link")).toHaveClass("hover:shadow-2xl");
  });

  describe("without a link", () => {
    const { link: _link, ...propsWithoutLink } = defaultProps;

    it("renders as a plain card, not a link", async () => {
      const screen = await render(<ProjectCard {...propsWithoutLink} />);
      expect(screen.container.querySelector("a")).toBeNull();
      expect(screen.container.querySelector("[href]")).toBeNull();
      await expect.element(screen.getByRole("link")).not.toBeInTheDocument();
    });

    it("still renders title, description, image and tags", async () => {
      const screen = await render(<ProjectCard {...propsWithoutLink} />);
      await expect.element(screen.getByText("My Project")).toBeInTheDocument();
      await expect.element(screen.getByText("Project description")).toBeInTheDocument();
      await expect.element(screen.getByTestId("project-image")).toHaveAttribute("src", "/project.jpg");
      await expect.element(screen.getByTestId("badge-React")).toBeInTheDocument();
      await expect.element(screen.getByTestId("badge-TypeScript")).toBeInTheDocument();
    });

    it("keeps the base card styling but not the hover shadow", async () => {
      const screen = await render(<ProjectCard {...propsWithoutLink} />);
      const card = screen.container.firstElementChild as HTMLElement;
      await expect.element(card).toHaveClass("rounded-3xl");
      await expect.element(card).toHaveClass("shadow-lg");
      await expect.element(card).not.toHaveClass("hover:shadow-2xl");
    });
  });
});
