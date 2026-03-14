import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ExperienceEducationCard } from "../src/components/features/EperienceEducationCard";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children }: any) => (
    <span data-testid={`warm-badge-${children}`}>{children}</span>
  ),
}));

describe("ExperienceEducationCard", () => {
  const defaultProps = {
    title: "Frontend Developer",
    company: "Tech Corp",
    date: "2020 - 2023",
    description: [
      "Built responsive web applications",
      "Collaborated with design team",
    ],
    tags: ["React", "TypeScript", "CSS"],
  };

  it("renders title", async () => {
    const screen = await render(<ExperienceEducationCard {...defaultProps} />);
    await expect.element(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders company and date", async () => {
    const screen = await render(<ExperienceEducationCard {...defaultProps} />);
    await expect.element(screen.getByText("Tech Corp · 2020 - 2023")).toBeInTheDocument();
  });

  it("renders all description items", async () => {
    const screen = await render(<ExperienceEducationCard {...defaultProps} />);
    await expect.element(screen.getByText("Built responsive web applications")).toBeInTheDocument();
    await expect.element(screen.getByText("Collaborated with design team")).toBeInTheDocument();
  });

  it("renders skills label", async () => {
    const screen = await render(<ExperienceEducationCard {...defaultProps} />);
    await expect.element(screen.getByText("Skills:")).toBeInTheDocument();
  });

  it("renders all tags as badges", async () => {
    const screen = await render(<ExperienceEducationCard {...defaultProps} />);
    for (const tag of defaultProps.tags) {
      await expect.element(screen.getByTestId(`warm-badge-${tag}`)).toBeInTheDocument();
    }
  });

  it("renders with empty description", async () => {
    const screen = await render(
      <ExperienceEducationCard {...defaultProps} description={[]} />,
    );
    await expect.element(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders with empty tags", async () => {
    const screen = await render(
      <ExperienceEducationCard {...defaultProps} tags={[]} />,
    );
    await expect.element(screen.getByText("Frontend Developer")).toBeInTheDocument();
    await expect.element(screen.getByText("Skills:")).toBeInTheDocument();
  });

  it("renders with single description item", async () => {
    const screen = await render(
      <ExperienceEducationCard {...defaultProps} description={["Single item"]} />,
    );
    await expect.element(screen.getByText("Single item")).toBeInTheDocument();
  });

  it("renders with special characters in props", async () => {
    const screen = await render(
      <ExperienceEducationCard
        title="Dev & Designer"
        company="A&B Co."
        date="2024"
        description={["Worked on A&B"]}
        tags={["C#"]}
      />,
    );
    await expect.element(screen.getByText("Dev & Designer")).toBeInTheDocument();
    await expect.element(screen.getByText("A&B Co. · 2024")).toBeInTheDocument();
  });
});
