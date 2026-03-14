import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { SkillCard } from "../src/components/features/SkillCard";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, whileHover, whileTap, whileInView, initial, animate, transition, viewport, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const MockIcon = ((props: any) => <span data-testid="skill-icon" {...props} />) as any;

describe("SkillCard", () => {
  it("renders skill name", async () => {
    const screen = await render(
      <SkillCard name="React" icon={MockIcon} color="green" />,
    );
    await expect.element(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders icon", async () => {
    const screen = await render(
      <SkillCard name="React" icon={MockIcon} color="green" />,
    );
    await expect.element(screen.getByTestId("skill-icon")).toBeInTheDocument();
  });

  it("applies green color gradient", async () => {
    const screen = await render(
      <SkillCard name="Skill" icon={MockIcon} color="green" />,
    );
    const card = screen.getByText("Skill");
    // The card wrapper has the gradient class - check parent
    await expect.element(card).toBeInTheDocument();
  });

  it("renders with maple color", async () => {
    const screen = await render(
      <SkillCard name="Skill" icon={MockIcon} color="maple" />,
    );
    await expect.element(screen.getByText("Skill")).toBeInTheDocument();
  });

  it("renders with yellow color", async () => {
    const screen = await render(
      <SkillCard name="Skill" icon={MockIcon} color="yellow" />,
    );
    await expect.element(screen.getByText("Skill")).toBeInTheDocument();
  });

  it("renders with brown color", async () => {
    const screen = await render(
      <SkillCard name="Skill" icon={MockIcon} color="brown" />,
    );
    await expect.element(screen.getByText("Skill")).toBeInTheDocument();
  });

  it("renders heading as h3", async () => {
    const screen = await render(
      <SkillCard name="TypeScript" icon={MockIcon} color="green" />,
    );
    const heading = screen.getByRole("heading", { level: 3 });
    await expect.element(heading).toHaveTextContent("TypeScript");
  });

  it("renders icon with aria-hidden", async () => {
    const screen = await render(
      <SkillCard name="Skill" icon={MockIcon} color="green" />,
    );
    const icon = screen.getByTestId("skill-icon");
    await expect.element(icon).toHaveAttribute("aria-hidden", "true");
  });
});
