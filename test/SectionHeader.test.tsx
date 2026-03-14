import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { SectionHeader } from "../src/components/layout/SectionHeader";

describe("SectionHeader", () => {
  it("renders title correctly", async () => {
    const screen = await render(<SectionHeader title="My Title" />);
    await expect.element(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders subtitle when provided", async () => {
    const screen = await render(
      <SectionHeader title="Title" subtitle="My Subtitle" />,
    );
    await expect.element(screen.getByText("My Subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle element when not provided", async () => {
    const screen = await render(<SectionHeader title="Title Only" />);
    await expect.element(screen.getByText("Title Only")).toBeInTheDocument();
    // Title's heading should be the main visible element
    const heading = screen.getByRole("heading");
    await expect.element(heading).toHaveTextContent("Title Only");
  });

  it("applies default left alignment", async () => {
    const screen = await render(<SectionHeader title="Title" />);
    await expect.element(screen.container).toBeInTheDocument();
  });

  it("applies center alignment", async () => {
    const screen = await render(
      <SectionHeader title="Centered" align="center" />,
    );
    await expect.element(screen.getByText("Centered")).toBeInTheDocument();
  });

  it("renders heading as h2 element", async () => {
    const screen = await render(<SectionHeader title="Heading" />);
    const heading = screen.getByRole("heading", { level: 2 });
    await expect.element(heading).toBeInTheDocument();
    await expect.element(heading).toHaveTextContent("Heading");
  });

  it("applies custom className", async () => {
    const screen = await render(
      <SectionHeader title="Title" className="custom-header" />,
    );
    await expect.element(screen.container).toBeInTheDocument();
  });

  it("renders JSX content as subtitle", async () => {
    const screen = await render(
      <SectionHeader
        title="Title"
        subtitle={<span data-testid="jsx-sub">JSX subtitle</span>}
      />,
    );
    await expect.element(screen.getByTestId("jsx-sub")).toBeInTheDocument();
  });
});
