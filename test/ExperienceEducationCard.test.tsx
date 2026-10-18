import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ExperienceEducationCard } from "../src/components/features/ExperienceEducationCard";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
  motion: {
    div: ({ children, whileHover, whileTap, initial, animate, exit, transition, ...props }: any) => <div {...props}>{children}</div>,
    li: ({ children, initial, animate, exit, transition, ...props }: any) => <li {...props}>{children}</li>,
  },
}));

vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children }: any) => (
    <span data-testid={`warm-badge-${children}`}>{children}</span>
  ),
}));

vi.mock("../src/components/common/WarmButton", () => ({
  WarmButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
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

  describe("Highlights toggle", () => {
    const highlights = (count: number) =>
      Array.from({ length: count }, (_, i) => `Highlight ${i + 1}`);

    const renderCard = (count: number) =>
      render(
        <ExperienceEducationCard
          {...defaultProps}
          description={highlights(count)}
        />,
      );

    it("renders all highlights and no toggle when there are six or fewer", async () => {
      const screen = await renderCard(6);
      for (const item of highlights(6)) {
        await expect.element(screen.getByText(item)).toBeInTheDocument();
      }
      await expect.element(screen.getByRole("button")).not.toBeInTheDocument();
    });

    it("renders only the first six highlights and a collapsed Show N more toggle when there are more", async () => {
      const screen = await renderCard(9);
      for (const item of highlights(6)) {
        await expect.element(screen.getByText(item, { exact: true })).toBeInTheDocument();
      }
      for (const item of highlights(9).slice(6)) {
        await expect.element(screen.getByText(item, { exact: true })).not.toBeInTheDocument();
      }
      const toggle = screen.getByRole("button");
      await expect.element(toggle).toHaveTextContent("Show 3 more");
      await expect.element(toggle).toHaveAttribute("aria-expanded", "false");
    });

    it("points the toggle's aria-controls at the highlights list id", async () => {
      const screen = await renderCard(9);
      const listId = screen.getByRole("list").element().id;
      expect(listId).not.toBe("");
      await expect
        .element(screen.getByRole("button"))
        .toHaveAttribute("aria-controls", listId);
    });

    it("keeps the Skills label and tags visible when collapsed and expanded", async () => {
      const screen = await renderCard(9);
      const expectSkillsVisible = async () => {
        await expect.element(screen.getByText("Skills:")).toBeInTheDocument();
        for (const tag of defaultProps.tags) {
          await expect.element(screen.getByTestId(`warm-badge-${tag}`)).toBeInTheDocument();
        }
      };

      await expectSkillsVisible();
      await screen.getByRole("button").click();
      await expectSkillsVisible();
    });

    it("expands each card on its own", async () => {
      const screen = await render(
        <>
          <ExperienceEducationCard
            {...defaultProps}
            title="First"
            description={highlights(9)}
          />
          <ExperienceEducationCard
            {...defaultProps}
            title="Second"
            description={highlights(9)}
          />
        </>,
      );
      const toggles = screen.getByRole("button");
      await toggles.first().click();

      await expect.element(toggles.first()).toHaveAttribute("aria-expanded", "true");
      await expect.element(toggles.last()).toHaveAttribute("aria-expanded", "false");
    });

    it("shows every highlight and Show fewer when expanded, and goes back to six when clicked again", async () => {
      const screen = await renderCard(9);
      const toggle = screen.getByRole("button");

      await toggle.click();
      for (const item of highlights(9)) {
        await expect.element(screen.getByText(item, { exact: true })).toBeInTheDocument();
      }
      await expect.element(toggle).toHaveTextContent("Show fewer");
      await expect.element(toggle).toHaveAttribute("aria-expanded", "true");

      await toggle.click();
      for (const item of highlights(9).slice(6)) {
        await expect.element(screen.getByText(item, { exact: true })).not.toBeInTheDocument();
      }
      await expect.element(toggle).toHaveTextContent("Show 3 more");
      await expect.element(toggle).toHaveAttribute("aria-expanded", "false");
    });
  });
});
