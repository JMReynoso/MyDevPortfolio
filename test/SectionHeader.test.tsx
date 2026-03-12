import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { SectionHeader } from "../src/components/layout/SectionHeader";

describe("SectionHeader", () => {
  it("renders without crashing", async () => {
    const screen = await render(<SectionHeader title="Test Title" />);

    await expect.element(screen).toBeInTheDocument();
  });

  it("renders title correctly", async () => {
    const screen = await render(<SectionHeader title="Test Title" />);

    await expect.element(screen).toHaveText("Test Title");
  });

  it("renders subtitle when provided", async () => {
    const screen = await render(
      <SectionHeader title="Test Title" subtitle="Test Subtitle" />,
    );

    await expect.element(screen).toHaveText("Test Subtitle");
  });

  it("applies default left alignment", async () => {
    const screen = await render(<SectionHeader title="Test Title" />);

    await expect.element(screen).toHaveClass("text-left");
    await expect.element(screen).toHaveClass("items-start");
  });

  it("applies center alignment when specified", async () => {
    const screen = await render(
      <SectionHeader title="Test Title" align="center" />,
    );

    await expect.element(screen).toHaveClass("text-center");
    await expect.element(screen).toHaveClass("items-center");
  });

  it("renders divider with correct styling", async () => {
    const screen = await render(<SectionHeader title="Test Title" />);

    await expect.element(screen).toHaveClass("w-20");
    await expect.element(screen).toHaveClass("h-1");
    await expect.element(screen).toHaveClass("bg-gradient-to-r");
  });

  it("applies custom className", async () => {
    const screen = await render(
      <SectionHeader title="Test Title" className="custom-header-class" />,
    );

    await expect.element(screen).toHaveClass("custom-header-class");
  });

  it("renders with only title and no subtitle", async () => {
    const screen = await render(<SectionHeader title="Test Title" />);

    await expect.element(screen).toHaveText("Test Title");
    // Should not have subtitle text
    await expect.element(screen).not.toHaveText("");
  });

  it("renders with empty subtitle", async () => {
    const screen = await render(
      <SectionHeader title="Test Title" subtitle={null as any} />,
    );

    await expect.element(screen).toHaveText("Test Title");
  });

  it("applies correct divider alignment for center alignment", async () => {
    const screen = await render(
      <SectionHeader title="Test Title" align="center" />,
    );

    await expect.element(screen).toHaveClass("mx-auto");
  });

  it("applies correct divider alignment for left alignment", async () => {
    const screen = await render(
      <SectionHeader title="Test Title" align="left" />,
    );

    await expect.element(screen).not.toHaveClass("mx-auto");
  });
});
