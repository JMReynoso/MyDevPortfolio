import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import Home from "../src/pages/Home";

vi.mock("../src/components", () => ({
  Hero: ({ greeting, title, subtitle, primaryButton, secondaryButton, imageComponent }: any) => (
    <div data-testid="hero">
      <span>{greeting}</span>
      <span>{title}</span>
      <span>{subtitle}</span>
      {primaryButton && <a href={primaryButton.href}>{primaryButton.text}</a>}
      {secondaryButton && <a href={secondaryButton.href}>{secondaryButton.text}</a>}
      {imageComponent && <div data-testid="hero-image">{imageComponent}</div>}
    </div>
  ),
  Section: ({ children, id, background }: any) => (
    <section data-testid={`section-${id}`} data-background={background}>
      {children}
    </section>
  ),
  SectionHeader: ({ title, subtitle }: any) => (
    <div data-testid={`section-header-${title}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  ),
  Technologies: () => <div data-testid="technologies">Technologies</div>,
  Grid: ({ children }: any) => <div data-testid="grid">{children}</div>,
  ProjectCard: ({ title, description, tags, link }: any) => (
    <div data-testid={`project-card-${title}`}>
      <span>{title}</span>
      <span>{description}</span>
      <a href={link}>View</a>
      {tags.map((tag: string) => (
        <span key={tag} data-testid={`tag-${tag}`}>{tag}</span>
      ))}
    </div>
  ),
  ContactSection: ({ title, subtitle, email, githubUrl, linkedinUrl }: any) => (
    <div data-testid="contact-section">
      <span>{title}</span>
      <span>{subtitle}</span>
      <span data-testid="email">{email}</span>
      <span data-testid="github">{githubUrl}</span>
      <span data-testid="linkedin">{linkedinUrl}</span>
    </div>
  ),
}));

vi.mock("../src/components/figma/ImageWithFallback", () => ({
  ImageWithFallback: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} data-testid="image-with-fallback" />
  ),
}));

vi.mock("../src/data/projects", () => ({
  projects: [
    {
      title: "Project One",
      description: "First project description",
      image: "/img1.jpg",
      tags: ["React", "TypeScript"],
      link: "https://example.com/one",
    },
    {
      title: "Project Two",
      description: "Second project description",
      image: "/img2.jpg",
      tags: ["Node.js"],
      link: "https://example.com/two",
    },
  ],
}));

vi.mock("../src/constants/strings", () => ({
  strings: {
    social: {
      email: "test@example.com",
      github: "https://github.com/test",
      linkedin: "https://linkedin.com/in/test",
    },
    name: "Test User",
    initials: "TU",
  },
}));

describe("Home", () => {
  it("renders the Hero section", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders hero with correct title and subtitle", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByText("Building apps on the web")).toBeInTheDocument();
    await expect.element(
      screen.getByText(
        "I create applications with a focus on backend architecture, frontend design, and seamless user experiences.",
      ),
    ).toBeInTheDocument();
  });

  it("renders hero greeting", async () => {
    const screen = await render(<Home />);
    await expect
      .element(screen.getByText("👋 omg hi! I'm a developer"))
      .toBeInTheDocument();
  });

  it("renders hero buttons", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByText("View My Work!")).toBeInTheDocument();
    await expect.element(screen.getByText("Get in Touch!")).toBeInTheDocument();
  });

  it("renders the hero image component", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByTestId("hero-image")).toBeInTheDocument();
    await expect.element(screen.getByTestId("image-with-fallback")).toBeInTheDocument();
  });

  it("renders the Technologies section", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByTestId("section-technologies")).toBeInTheDocument();
    await expect.element(screen.getByTestId("technologies")).toBeInTheDocument();
    await expect.element(screen.getByText("Technologies I Use")).toBeInTheDocument();
  });

  it("renders the Projects section with project cards", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByTestId("section-projects")).toBeInTheDocument();
    await expect.element(screen.getByText("Featured Projects")).toBeInTheDocument();
    await expect.element(screen.getByTestId("project-card-Project One")).toBeInTheDocument();
    await expect.element(screen.getByTestId("project-card-Project Two")).toBeInTheDocument();
  });

  it("renders project details correctly", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByText("First project description")).toBeInTheDocument();
    await expect.element(screen.getByText("Second project description")).toBeInTheDocument();
  });

  it("renders the Contact section with correct props", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByTestId("section-contact")).toBeInTheDocument();
    await expect.element(screen.getByTestId("contact-section")).toBeInTheDocument();
    await expect.element(screen.getByText("Let's Work Together!")).toBeInTheDocument();
    await expect.element(screen.getByTestId("email")).toHaveTextContent("test@example.com");
    await expect.element(screen.getByTestId("github")).toHaveTextContent("https://github.com/test");
    await expect.element(screen.getByTestId("linkedin")).toHaveTextContent("https://linkedin.com/in/test");
  });

  it("renders sections with correct backgrounds", async () => {
    const screen = await render(<Home />);
    await expect
      .element(screen.getByTestId("section-technologies"))
      .toHaveAttribute("data-background", "white");
    await expect
      .element(screen.getByTestId("section-projects"))
      .toHaveAttribute("data-background", "cream");
    await expect
      .element(screen.getByTestId("section-contact"))
      .toHaveAttribute("data-background", "white");
  });
});
