import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import About from "../src/pages/About";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      whileHover,
      whileTap,
      whileInView,
      whileFocus,
      initial,
      animate,
      exit,
      transition,
      viewport,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("../src/components", () => ({
  Grid: ({ children }: any) => <div data-testid="grid">{children}</div>,
  Section: ({ children, id, background }: any) => (
    <section data-testid={`section-${id}`} data-background={background}>
      {children}
    </section>
  ),
  SectionHeader: ({ title }: any) => (
    <div data-testid={`section-header-${title}`}>
      <h2>{title}</h2>
    </div>
  ),
  SkillCard: ({ name, color }: any) => (
    <div data-testid={`skill-card-${name}`} data-color={color}>
      {name}
    </div>
  ),
}));

vi.mock("../src/components/features/CertificationCard", () => ({
  CertificationCard: ({ title, text, status }: any) => (
    <div data-testid={`cert-card-${title}`} data-status={status}>
      <span>{title}</span>
      <span>{text}</span>
      <span>{status}</span>
    </div>
  ),
}));

vi.mock("../src/components/features/EperienceEducationCard", () => ({
  ExperienceEducationCard: ({ title, company, date }: any) => (
    <div data-testid={`exp-card-${title}`}>
      <span>{title}</span>
      <span>{company}</span>
      <span>{date}</span>
    </div>
  ),
}));

vi.mock("../src/components/ui/use-mobile", () => ({
  useIsMobile: () => false,
}));

vi.mock("lucide-react", () => ({
  Code2: (props: any) => <span data-testid="icon-code2" {...props} />,
  Coffee: (props: any) => <span data-testid="icon-coffee" {...props} />,
  MonitorCog: (props: any) => <span data-testid="icon-monitor" {...props} />,
  Rocket: (props: any) => <span data-testid="icon-rocket" {...props} />,
  Book: (props: any) => <span data-testid="icon-book" {...props} />,
  Music: (props: any) => <span data-testid="icon-music" {...props} />,
  Shirt: (props: any) => <span data-testid="icon-shirt" {...props} />,
  Server: (props: any) => <span data-testid="icon-server" {...props} />,
  Laptop: (props: any) => <span data-testid="icon-laptop" {...props} />,
}));

vi.mock("../src/data/experience", () => ({
  experience: [
    {
      title: "Senior Dev",
      company: "Tech Corp",
      date: "2022 - Present",
      description: ["Built APIs", "Led team"],
      tags: ["Node.js", "React"],
    },
    {
      title: "Junior Dev",
      company: "Startup Inc",
      date: "2020 - 2022",
      description: ["Wrote code"],
      tags: ["Python"],
    },
  ],
}));

vi.mock("../src/data/certification", () => ({
  certifications: [
    {
      title: "AWS Cert",
      text: "Cloud cert description",
      color: "F5E6D3",
      status: "Certified",
      icon: (props: any) => <span {...props} />,
      link: "https://cert.example.com",
    },
    {
      title: "AI Cert",
      text: "AI cert description",
      color: "FFF8E7",
      status: "In Progress",
      icon: (props: any) => <span {...props} />,
      link: "https://ai.example.com",
    },
  ],
}));

vi.mock("../src/data/storyIcons", () => ({
  storyIcons: [
    {
      id: "music",
      icon: (props: any) => <span data-testid="story-icon-music" {...props} />,
      color: "text-[#C77B58]",
      gradient: "from-[#E8F3E0]",
      label: "I'm a Musician!",
      position: "top-1/6 left-12",
    },
    {
      id: "coffee",
      icon: (props: any) => <span data-testid="story-icon-coffee" {...props} />,
      color: "text-[#F5C563]",
      gradient: "from-[#FFF8E7]",
      label: "I love coffee!",
      position: "top-32 right-8",
    },
  ],
}));

describe("About", () => {
  it("renders the page heading", async () => {
    const screen = await render(<About />);
    const heading = screen.getByRole("heading", { level: 1 });
    await expect.element(heading).toHaveTextContent("About Me");
  });

  it("renders the page description", async () => {
    const screen = await render(<About />);
    await expect
      .element(
        screen.getByText(
          "Get to know more about my journey, skills, and what drives me as a developer.",
        ),
      )
      .toBeInTheDocument();
  });

  it("renders the profession section", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("section-profession"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-header-My Professional Journey"))
      .toBeInTheDocument();
  });

  it("renders all skill cards", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("skill-card-Backend Development"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("skill-card-System Design"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("skill-card-Performance Optimization"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("skill-card-Coffee Consumption"))
      .toBeInTheDocument();
  });

  it("renders skill cards with correct colors", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("skill-card-Backend Development"))
      .toHaveAttribute("data-color", "green");
    await expect
      .element(screen.getByTestId("skill-card-System Design"))
      .toHaveAttribute("data-color", "maple");
    await expect
      .element(screen.getByTestId("skill-card-Performance Optimization"))
      .toHaveAttribute("data-color", "yellow");
    await expect
      .element(screen.getByTestId("skill-card-Coffee Consumption"))
      .toHaveAttribute("data-color", "brown");
  });

  it("renders the certifications section", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("section-certifications"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-header-Certifications"))
      .toBeInTheDocument();
  });

  it("renders all certification cards", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("cert-card-AWS Cert"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("cert-card-AI Cert"))
      .toBeInTheDocument();
  });

  it("renders certification statuses correctly", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("cert-card-AWS Cert"))
      .toHaveAttribute("data-status", "Certified");
    await expect
      .element(screen.getByTestId("cert-card-AI Cert"))
      .toHaveAttribute("data-status", "In Progress");
  });

  it("renders the experience section", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("section-experience"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-header-Experience & Education"))
      .toBeInTheDocument();
  });

  it("renders all experience cards", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("exp-card-Senior Dev"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("exp-card-Junior Dev"))
      .toBeInTheDocument();
  });

  it("renders experience card details", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByText("Tech Corp"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("2022 - Present"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Startup Inc"))
      .toBeInTheDocument();
  });

  it("renders the story section", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("section-story"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-header-My Story"))
      .toBeInTheDocument();
  });

  it("renders sections with correct backgrounds", async () => {
    const screen = await render(<About />);
    await expect
      .element(screen.getByTestId("section-profession"))
      .toHaveAttribute("data-background", "white");
    await expect
      .element(screen.getByTestId("section-certifications"))
      .toHaveAttribute("data-background", "cream");
    await expect
      .element(screen.getByTestId("section-experience"))
      .toHaveAttribute("data-background", "white");
    await expect
      .element(screen.getByTestId("section-story"))
      .toHaveAttribute("data-background", "cream");
  });

  it("renders the About Me heading as h1", async () => {
    const screen = await render(<About />);
    const heading = screen.getByRole("heading", { level: 1 });
    await expect.element(heading).toHaveTextContent("About Me");
  });

  it("renders professional journey paragraphs", async () => {
    const screen = await render(<About />);
    await expect
      .element(
        screen.getByText(/passionate Backend Developer/),
      )
      .toBeInTheDocument();
    await expect
      .element(
        screen.getByText(/modern backend frameworks/),
      )
      .toBeInTheDocument();
  });
});
