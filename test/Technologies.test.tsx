import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Technologies } from "../src/components/features/Technologies";

// Mock categories data
const mockCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <div data-testid="frontend-icon">F</div>,
    technologies: [
      { name: "React", icon: <div data-testid="react-icon">R</div>, link: "/react" },
      { name: "TypeScript", icon: <div data-testid="ts-icon">T</div>, link: "/typescript" }
    ]
  },
  {
    id: "backend",
    label: "Backend",
    icon: <div data-testid="backend-icon">B</div>,
    technologies: [
      { name: "Node.js", icon: <div data-testid="node-icon">N</div>, link: "/node" }
    ]
  },
  {
    id: "tools",
    label: "Tools",
    icon: <div data-testid="tools-icon">T</div>,
    technologies: [
      { name: "Git", icon: <div data-testid="git-icon">G</div>, link: "/git" }
    ]
  }
];

// Mock the data import
vi.mock("../src/data/technologies", () => ({
  categories: mockCategories
}));

describe("Technologies Component", () => {
  it("renders correctly with default state", async () => {
    const screen = await render(<Technologies />);

    // Check that category bubbles are rendered
    expect(screen.getByTestId("frontend-icon")).toBeInTheDocument();
    expect(screen.getByTestId("backend-icon")).toBeInTheDocument();
    expect(screen.getByTestId("tools-icon")).toBeInTheDocument();

    // Check that the default active category is frontend
    const frontendBubble = screen.getByText("Frontend").parentElement;
    expect(frontendBubble).toHaveClass("bg-gradient-to-br");
    expect(frontendBubble).toHaveClass("from-[var(--sage-green)]");

    // Check that technologies for frontend are rendered
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("switches categories correctly", async () => {
    const screen = await render(<Technologies />);

    // Click on backend category
    const backendBubble = screen.getByText("Backend").parentElement;
    backendBubble?.click();

    // Check that backend is now active
    expect(backendBubble).toHaveClass("bg-gradient-to-br");
    expect(backendBubble).toHaveClass("from-[var(--sage-green)]");

    // Check that backend technologies are rendered
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders all categories and their technologies", async () => {
    const screen = await render(<Technologies />);

    // Check all category labels
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();

    // Check that all technologies are rendered
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Git")).toBeInTheDocument();
  });

  it("handles empty technology lists", async () => {
    // Mock categories with empty technology lists
    const emptyCategories = [
      {
        id: "frontend",
        label: "Frontend",
        icon: <div data-testid="frontend-icon">F</div>,
        technologies: []
      }
    ];

    vi.mock("../src/data/technologies", () => ({
      categories: emptyCategories
    }));

    const screen = await render(<Technologies />);
    
    // Check that the component renders without errors
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("handles special characters in technology names", async () => {
    const specialCharsCategories = [
      {
        id: "frontend",
        label: "Frontend",
        icon: <div data-testid="frontend-icon">F</div>,
        technologies: [
          { name: "React & Co.", icon: <div data-testid="react-icon">R</div>, link: "/react" }
        ]
      }
    ];

    vi.mock("../src/data/technologies", () => ({
      categories: specialCharsCategories
    }));

    const screen = await render(<Technologies />);
    
    // Check that special characters are handled
    expect(screen.getByText("React & Co.")).toBeInTheDocument();
  });
});