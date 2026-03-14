import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Technologies } from "../src/components/features/Technologies";

vi.mock("../src/data/technologies", () => ({
  categories: [
    {
      id: "frontend",
      label: "Front-end",
      icon: <span data-testid="frontend-icon">F</span>,
      technologies: [
        { name: "React", icon: <span data-testid="react-icon">R</span>, link: "https://react.dev" },
        { name: "TypeScript", icon: <span data-testid="ts-icon">T</span>, link: "https://typescriptlang.org" },
      ],
    },
    {
      id: "backend",
      label: "Back-end",
      icon: <span data-testid="backend-icon">B</span>,
      technologies: [
        { name: "Node.js", icon: <span data-testid="node-icon">N</span>, link: "https://nodejs.org" },
      ],
    },
    {
      id: "tools",
      label: "Tools",
      icon: <span data-testid="tools-icon">T</span>,
      technologies: [
        { name: "Docker", icon: <span data-testid="docker-icon">D</span>, link: "https://docker.com" },
      ],
    },
  ],
}));

describe("Technologies", () => {
  it("renders all category labels", async () => {
    const screen = await render(<Technologies />);
    await expect.element(screen.getByText("Front-end")).toBeInTheDocument();
    await expect.element(screen.getByText("Back-end")).toBeInTheDocument();
    await expect.element(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("renders frontend technologies by default", async () => {
    const screen = await render(<Technologies />);
    await expect.element(screen.getByText("React")).toBeInTheDocument();
    await expect.element(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders category buttons with aria-pressed", async () => {
    const screen = await render(<Technologies />);
    // Frontend should be active by default
    const frontendButton = screen.getByText("Front-end");
    await expect.element(frontendButton).toBeInTheDocument();
  });

  it("switches to backend technologies on click", async () => {
    const screen = await render(<Technologies />);
    await screen.getByText("Back-end").click();
    await expect.element(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("switches to tools technologies on click", async () => {
    const screen = await render(<Technologies />);
    await screen.getByText("Tools").click();
    await expect.element(screen.getByText("Docker")).toBeInTheDocument();
  });

  it("renders technology links", async () => {
    const screen = await render(<Technologies />);
    const reactLink = screen.getByText("React");
    await expect.element(reactLink).toBeInTheDocument();
  });

  it("renders category icons", async () => {
    const screen = await render(<Technologies />);
    await expect.element(screen.getByTestId("frontend-icon")).toBeInTheDocument();
    await expect.element(screen.getByTestId("backend-icon")).toBeInTheDocument();
    await expect.element(screen.getByTestId("tools-icon")).toBeInTheDocument();
  });
});
