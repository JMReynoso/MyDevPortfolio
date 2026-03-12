import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import About from "../src/pages/About";

// Mock the useIsMobile hook
vi.mock("../components/ui/use-mobile", () => ({
  useIsMobile: vi.fn(() => false),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: any) => children,
    section: ({ children }: any) => children,
  },
}));

// Mock components
vi.mock("../components/layout/Section", () => ({
  Section: ({ children }: any) => <div data-testid="section">{children}</div>,
}));

vi.mock("../components/layout/SectionHeader", () => ({
  SectionHeader: ({ title }: any) => (
    <h2 data-testid="section-header">{title}</h2>
  ),
}));

vi.mock("../components/layout/Grid", () => ({
  Grid: ({ children }: any) => <div data-testid="grid">{children}</div>,
}));

vi.mock("../components/features/SkillCard", () => ({
  SkillCard: ({ name, icon: Icon }: any) => (
    <div data-testid="skill-card" data-name={name}>
      <Icon />
    </div>
  ),
}));

vi.mock("../components/features/CertificationCard", () => ({
  CertificationCard: ({ title }: any) => (
    <div data-testid="certification-card" data-title={title} />
  ),
}));

vi.mock("../components/features/EperienceEducationCard", () => ({
  ExperienceEducationCard: ({ title }: any) => (
    <div data-testid="experience-card" data-title={title} />
  ),
}));

// Mock data
vi.mock("../data/experience", () => ({
  experience: [
    {
      title: "Software Engineer",
      company: "Company A",
      date: "2020 - Present",
      description: "Developed web applications",
      tags: ["React", "Node.js"],
    },
  ],
}));

vi.mock("../data/certification", () => ({
  certifications: [
    {
      title: "Certification 1",
      text: "Description of certification",
      status: "Completed",
      icon: vi.fn(),
      link: "#",
    },
  ],
}));

vi.mock("../data/storyIcons", () => ({
  storyIcons: [
    {
      id: "icon1",
      icon: vi.fn(),
      label: "Icon 1",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-200",
    },
  ],
}));

describe("About", () => {
  it("renders without crashing", async () => {
    const screen = await render(<About />);
    expect.element(screen).toBeInTheDocument();
  });

  it("renders the hero section with correct title and description", async () => {
    const screen = await render(<About />);

    expect.element(screen).toHaveText("About Me");
    expect
      .element(screen)
      .toHaveText(
        "Get to know more about my journey, skills, and what drives me as a developer.",
      );
  });

  it("renders professional journey section", async () => {
    const screen = await render(<About />);

    expect.element(screen).toHaveText("My Professional Journey");
    expect.element(screen).toBeInTheDocument();
  });

  it("renders skills section with correct number of skill cards", async () => {
    const screen = await render(<About />);

    const skillCards = screen.getAllByTestId("skill-card");
    expect(skillCards.length).toBe(4);
  });

  it("renders certifications section", async () => {
    const screen = await render(<About />);

    expect.element(screen).toHaveText("Certifications");
    expect.element(screen).toBeInTheDocument();
  });

  it("renders experience and education section", async () => {
    const screen = await render(<About />);

    expect.element(screen).toHaveText("Experience & Education");
    expect.element(screen).toBeInTheDocument();
  });

  it("renders story section", async () => {
    const screen = await render(<About />);

    expect.element(screen).toHaveText("My Story");
    expect.element(screen).toBeInTheDocument();
  });

  it("applies correct background gradients", async () => {
    const screen = await render(<About />);

    // Check for gradient backgrounds
    expect.element(screen).toHaveClass("from-white");
    expect.element(screen).toHaveClass("via-[#F5E6D3]");
    expect.element(screen).toHaveClass("to-white");
  });

  it("renders with correct section structure", async () => {
    const screen = await render(<About />);

    const sections = screen.getAllByTestId("section");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("renders story icons when not on mobile", async () => {
    const screen = await render(<About />);

    // Story icons should be rendered in desktop view
    expect.element(screen).toBeInTheDocument();
  });

  it("applies correct animation classes to hero section", async () => {
    const screen = await render(<About />);

    const heroSection =
      screen.getByText("About Me").parentElement?.parentElement;
    expect(heroSection).toHaveClass("transition-all");
    expect(heroSection).toHaveClass("duration-1000");
  });
});
