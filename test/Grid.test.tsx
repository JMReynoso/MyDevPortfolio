import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Grid } from "../src/components/layout/Grid";

describe("Grid", () => {
  it("renders children correctly", async () => {
    const screen = await render(
      <Grid>
        <div data-testid="child-element">Test Content</div>
      </Grid>,
    );

    expect.element(screen).toHaveText("Test Content");
  });

  it("applies default grid classes", async () => {
    const screen = await render(
      <Grid>
        <div>Content</div>
      </Grid>,
    );

    expect.element(screen).toHaveClass("grid");
    expect.element(screen).toHaveClass("md:grid-cols-2");
    expect.element(screen).toHaveClass("lg:grid-cols-3");
    expect.element(screen).toHaveClass("gap-8");
  });

  it("applies custom cols configuration", async () => {
    const screen = await render(
      <Grid cols={{ default: 1, sm: 2, md: 3, lg: 4 }}>
        <div>Content</div>
      </Grid>,
    );

    expect.element(screen).toHaveClass("grid-cols-1");
    expect.element(screen).toHaveClass("sm:grid-cols-2");
    expect.element(screen).toHaveClass("md:grid-cols-3");
    expect.element(screen).toHaveClass("lg:grid-cols-4");
  });

  it("applies custom gap class", async () => {
    const screen = await render(
      <Grid gap="sm">
        <div>Content</div>
      </Grid>,
    );

    expect.element(screen).toHaveClass("gap-4");
  });

  it("applies custom className", async () => {
    const screen = await render(
      <Grid className="custom-grid-class">
        <div>Content</div>
      </Grid>,
    );

    expect.element(screen).toHaveClass("custom-grid-class");
  });

  it("applies all custom properties together", async () => {
    const screen = await render(
      <Grid cols={{ sm: 1, md: 2 }} gap="xl" className="custom-class">
        <div>Content</div>
      </Grid>,
    );

    expect.element(screen).toHaveClass("sm:grid-cols-1");
    expect.element(screen).toHaveClass("md:grid-cols-2");
    expect.element(screen).toHaveClass("gap-12");
    expect.element(screen).toHaveClass("custom-class");
  });

  it("handles partial cols configuration", async () => {
    const screen = await render(
      <Grid cols={{ md: 3 }}>
        <div>Content</div>
      </Grid>,
    );

    expect.element(screen).toHaveClass("md:grid-cols-3");
    expect.element(screen).not.toHaveClass("sm:grid-cols-");
    expect.element(screen).not.toHaveClass("lg:grid-cols-");
  });
});
