import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Grid } from "../src/components/layout/Grid";

describe("Grid", () => {
  it("renders children correctly", async () => {
    const screen = await render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    );
    await expect.element(screen.getByText("Item 1")).toBeInTheDocument();
    await expect.element(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies default grid classes (md:2, lg:3, gap-8)", async () => {
    const screen = await render(<Grid>Content</Grid>);
    const grid = screen.getByText("Content");
    await expect.element(grid).toHaveClass("grid");
    await expect.element(grid).toHaveClass("md:grid-cols-2");
    await expect.element(grid).toHaveClass("lg:grid-cols-3");
    await expect.element(grid).toHaveClass("gap-8");
  });

  it("applies custom cols configuration", async () => {
    const screen = await render(
      <Grid cols={{ default: 1, sm: 2, md: 3, lg: 4 }}>Content</Grid>,
    );
    const grid = screen.getByText("Content");
    await expect.element(grid).toHaveClass("grid-cols-1");
    await expect.element(grid).toHaveClass("sm:grid-cols-2");
    await expect.element(grid).toHaveClass("md:grid-cols-3");
    await expect.element(grid).toHaveClass("lg:grid-cols-4");
  });

  it("applies partial cols (only md)", async () => {
    const screen = await render(<Grid cols={{ md: 3 }}>Content</Grid>);
    const grid = screen.getByText("Content");
    await expect.element(grid).toHaveClass("grid");
    await expect.element(grid).toHaveClass("md:grid-cols-3");
  });

  it("applies sm gap", async () => {
    const screen = await render(<Grid gap="sm">Content</Grid>);
    await expect.element(screen.getByText("Content")).toHaveClass("gap-4");
  });

  it("applies md gap", async () => {
    const screen = await render(<Grid gap="md">Content</Grid>);
    await expect.element(screen.getByText("Content")).toHaveClass("gap-6");
  });

  it("applies xl gap", async () => {
    const screen = await render(<Grid gap="xl">Content</Grid>);
    await expect.element(screen.getByText("Content")).toHaveClass("gap-12");
  });

  it("applies custom className", async () => {
    const screen = await render(<Grid className="custom-grid">Content</Grid>);
    const grid = screen.getByText("Content");
    await expect.element(grid).toHaveClass("custom-grid");
    await expect.element(grid).toHaveClass("grid");
  });
});
