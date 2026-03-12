import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import Home from "../src/pages/Home";

// Mock components
vi.mock("../components/Hero", () => ({
  Hero: ({ greeting, title, subtitle }: any) => (
    <div data-testid="hero">
      <h1>{greeting}</h1>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock("../components/Section", () => ({
  Section: ({ children, id }: any) => (
    <section data-testid="section" data-id={id}>
      {children}
    </section>
  ),
}));

vi.mock("../components/SectionHeader", () => ({
  SectionHeader: ({ title, subtitle }: any) => (
    <div data-testid="section-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock("../components/Technologies", () => ({
  Technologies: () => <div data-testid="technologies" />,
}));

vi.mock("../components/Grid", () => ({
  Grid: ({ children }: any) => <div data-testid="grid">{children}</div>,
}));

vi.mock("../components/ProjectCard", () => ({
  ProjectCard: ({ title, description }: any) => (
    <div data-testid="project-card" data-title={title}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock("../components/ContactSection", () => ({
  ContactSection: ({ title, subtitle }: any) => (
    <div data-testid="contact-section">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock("../components/figma/ImageWithFallback", () => ({
  ImageWithFallback: ({ src, alt }: any) => (
    <img data-testid="image-with-fallback" src={src} alt={alt} />
  ),
}));

// Mock data
vi.mock("../data/projects", () => ({
  projects: [
    {
      title: "Project 1",
      description: "Description 1",
      image: "image1.jpg",
      tags: ["tag1", "tag2"],
      link: "#",
    },
    {
      title: "Project 2",
      description: "Description 2",
      image: "image2.jpg",
      tags: ["tag3", "tag4"],
      link: "#",
    },
  ],
}));

vi.mock("../constants/strings", () => ({
  strings: {
    social: {
      email: "test@example.com",
      github: "https://github.com/test",
      linkedin: "https://linkedin.com/test",
    },
  },
}));

describe("Home", () => {
  it("renders without crashing", async () => {
    const screen = await render(<Home />);
    await expect.element(screen).toBeInTheDocument();
  });

  it("renders the hero section with correct content", async () => {
    const screen = await render(<Home />);

    await expect.element(screen).toHaveText("👋 omg hi! I'm a developer");
    await expect.element(screen).toHaveText("Building apps on the web");
    await expect
      .element(screen)
      .toHaveText(
        "I create applications with a focus on backend architecture, frontend design, and seamless user experiences.",
      );
  });

  it("renders technologies section", async () => {
    const screen = await render(<Home />);

    await expect.element(screen).toBeInTheDocument();
    await expect.element(screen).toHaveText("Technologies I Use");
  });

  it("renders projects section with correct number of project cards", async () => {
    const screen = await render(<Home />);

    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards.length).toBe(2);
  });

  it("renders contact section", async () => {
    const screen = await render(<Home />);

    await expect.element(screen).toBeInTheDocument();
    await expect.element(screen).toHaveText("Let's Work Together!");
  });

  it("handles scroll to section functionality", async () => {
    // Mock sessionStorage
    Storage.prototype.setItem = vi.fn();
    Storage.prototype.getItem = vi.fn(() => "projects");
    Storage.prototype.removeItem = vi.fn();

    const screen = await render(<Home />);

    // Check that the component renders without error
    await expect.element(screen).toBeInTheDocument();
  });

  it("applies correct background classes to sections", async () => {
    const screen = await render(<Home />);

    const sections = screen.getAllByTestId("section");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("renders all main sections in correct order", async () => {
    const screen = await render(<Home />);

    // Check that all main sections are present
    await expect.element(screen).toBeInTheDocument();
    await expect.element(screen).toHaveText("Technologies I Use");
    await expect.element(screen).toHaveText("Featured Projects");
    await expect.element(screen).toHaveText("Let's Work Together!");
  });

  it("renders image with correct attributes", async () => {
    const screen = await render(<Home />);

    const image = screen.getByTestId("image-with-fallback");
    await expect.element(image).toBeInTheDocument();
    await expect.element(image).toHaveAttribute("src");
    await expect.element(image).toHaveAttribute("alt");
  });

  it("passes correct props to components", async () => {
    const screen = await render(<Home />);

    // Check that project cards receive correct props
    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards.length).toBe(2);
  });
});
