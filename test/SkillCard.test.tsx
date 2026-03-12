import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { SkillCard } from "../src/components/features/SkillCard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("SkillCard Component", () => {
  const defaultProps = {
    name: "Test Skill",
    icon: vi.fn(),
    color: "green",
  };

  it("renders correctly with all props", async () => {
    const screen = await render(<SkillCard {...defaultProps} />);

    // Check skill name
    await expect.element(screen.getByText("Test Skill")).toBeInTheDocument();

    // Check that the component has correct classes for green color
    const cardElement = screen.getByText("Test Skill").parentElement;
    await expect.element(cardElement).toHaveClass("bg-gradient-to-br");
    await expect.element(cardElement).toHaveClass("from-[#E8F3E0]");
    await expect.element(cardElement).toHaveClass("to-white");
  });

  it("renders correctly with different colors", async () => {
    const mapleProps = { ...defaultProps, color: "maple" };
    const yellowProps = { ...defaultProps, color: "yellow" };
    const brownProps = { ...defaultProps, color: "brown" };

    // Test maple color
    const screenMaple = await render(<SkillCard {...mapleProps} />);
    const mapleElement = screenMaple.getByText("Test Skill").parentElement;
    await expect.element(mapleElement).toHaveClass("from-[#F5E6D3]");

    // Test yellow color
    const screenYellow = await render(<SkillCard {...yellowProps} />);
    const yellowElement = screenYellow.getByText("Test Skill").parentElement;
    await expect.element(yellowElement).toHaveClass("from-[#FFF8E7]");

    // Test brown color
    const screenBrown = await render(<SkillCard {...brownProps} />);
    const brownElement = screenBrown.getByText("Test Skill").parentElement;
    await expect.element(brownElement).toHaveClass("from-[#F0EAE0]");
  });

  it("renders correctly with different skill names", async () => {
    const skillNames = ["JavaScript", "React", "Node.js", "Python"];

    for (const name of skillNames) {
      const props = { ...defaultProps, name };
      const screen = await render(<SkillCard {...props} />);
      await expect.element(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("handles special characters in skill name", async () => {
    const specialCharsProps = {
      ...defaultProps,
      name: "Skill with 'quotes' and \"double quotes\" & Co.",
    };

    const screen = await render(<SkillCard {...specialCharsProps} />);

    // Check that special characters are handled
    await expect
      .element(
        screen.getByText("Skill with 'quotes' and \"double quotes\" & Co."),
      )
      .toBeInTheDocument();
  });
});
