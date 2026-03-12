import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ExperienceEducationCard } from "../src/components/features/EperienceEducationCard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock WarmBadge component
vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children, variant }: any) => (
    <span data-testid={`warm-badge-${variant || 'default'}`}>{children}</span>
  ),
}));

describe("ExperienceEducationCard", () => {
  const mockProps = {
    title: "Frontend Developer",
    company: "Tech Corp",
    date: "2020 - 2023",
    description: [
      "Developed responsive web applications using React and TypeScript",
      "Collaborated with design team to implement user-friendly interfaces",
      "Optimized application performance and reduced load times by 40%"
    ],
    tags: ["React", "TypeScript", "CSS", "HTML"]
  };

  it("renders correctly with all props", async () => {
    const screen = await render(<ExperienceEducationCard {...mockProps} />);

    // Check title
    await expect.element(screen.getByText("Frontend Developer")).toBeInTheDocument();

    // Check company and date
    await expect.element(screen.getByText("Tech Corp · 2020 - 2023")).toBeInTheDocument();

    // Check description items
    await expect.element(screen.getByText("Developed responsive web applications using React and TypeScript")).toBeInTheDocument();
    await expect.element(screen.getByText("Collaborated with design team to implement user-friendly interfaces")).toBeInTheDocument();
    await expect.element(screen.getByText("Optimized application performance and reduced load times by 40%")).toBeInTheDocument();

    // Check skills label
    await expect.element(screen.getByText("Skills:")).toBeInTheDocument();

    // Check tags
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("React");
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("TypeScript");
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("CSS");
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("HTML");
  });

  it("renders correctly with minimal props", async () => {
    const minimalProps = {
      title: "Title",
      company: "Company",
      date: "Date",
      description: ["Description item"],
      tags: ["Tag"]
    };

    const screen = await render(<ExperienceEducationCard {...minimalProps} />);

    // Check basic elements
    await expect.element(screen.getByText("Title")).toBeInTheDocument();
    await expect.element(screen.getByText("Company · Date")).toBeInTheDocument();
    await expect.element(screen.getByText("Description item")).toBeInTheDocument();
    await expect.element(screen.getByText("Skills:")).toBeInTheDocument();
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("Tag");
  });

  it("renders correctly with empty description", async () => {
    const propsWithEmptyDesc = {
      ...mockProps,
      description: []
    };

    const screen = await render(<ExperienceEducationCard {...propsWithEmptyDesc} />);

    // Check that the component renders without errors
    await expect.element(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders correctly with empty tags", async () => {
    const propsWithEmptyTags = {
      ...mockProps,
      tags: []
    };

    const screen = await render(<ExperienceEducationCard {...propsWithEmptyTags} />);

    // Check that the component renders without errors
    await expect.element(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders correctly with single description item", async () => {
    const singleDescProps = {
      ...mockProps,
      description: ["Single description item"]
    };

    const screen = await render(<ExperienceEducationCard {...singleDescProps} />);

    // Check that the single description item is rendered
    await expect.element(screen.getByText("Single description item")).toBeInTheDocument();
  });

  it("renders correctly with single tag", async () => {
    const singleTagProps = {
      ...mockProps,
      tags: ["Single Tag"]
    };

    const screen = await render(<ExperienceEducationCard {...singleTagProps} />);

    // Check that the single tag is rendered
    await expect.element(screen.getByTestId("warm-badge-default")).toHaveTextContent("Single Tag");
  });

  it("renders correctly with special characters in props", async () => {
    const specialCharsProps = {
      title: "Title with 'quotes' and \"double quotes\"",
      company: "Company & Co.",
      date: "2020 - 2023",
      description: ["Description with special chars: @#$%^&*()"],
      tags: ["Tag with special chars: @#$%^&*()"]
    };

    const screen = await render(<ExperienceEducationCard {...specialCharsProps} />);

    // Check that special characters are handled
    await expect.element(screen.getByText("Title with 'quotes' and \"double quotes\"")).toBeInTheDocument();
    await expect.element(screen.getByText("Company & Co. · 2020 - 2023")).toBeInTheDocument();
    await expect.element(screen.getByText("Description with special chars: @#$%^&*()")).toBeInTheDocument();
  });
});