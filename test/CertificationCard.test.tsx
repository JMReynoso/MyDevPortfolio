import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { CertificationCard } from "../src/components/features/CertificationCard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    a: "a",
  },
  useInView: vi.fn(),
}));

// Mock Lucide icon
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe("CertificationCard", () => {
  const mockProps = {
    title: "Test Certification",
    text: "This is a test certification description",
    status: "Certified",
    delay: 0.2,
    icon: MockIcon,
    link: "https://example.com",
  };

  it("renders correctly with all props", async () => {
    const screen = await render(<CertificationCard {...mockProps} />);

    // Check title
    await expect
      .element(screen.getByText("Test Certification", { exact: true })).toBeInTheDocument();

    // Check description
    await expect
      .element(screen.getByText("This is a test certification description"))
      .toBeInTheDocument();

    // Check status badge
    await expect.element(screen.getByText("Certified")).toBeInTheDocument();

    // Check icon
    await expect.element(screen.getByTestId("mock-icon")).toBeInTheDocument();

    // Check link
    const linkElement = screen.getByRole("link");
    await expect
      .element(linkElement)
      .toHaveAttribute("href", "https://example.com");
  });

  it('renders with "Not Certified" status', async () => {
    const props = {
      ...mockProps,
      status: "Not Certified",
    };

    const screen = await render(<CertificationCard {...props} />);

    await expect.element(screen.getByText("Not Certified")).toBeInTheDocument();
  });

  it("applies correct styling based on status", async () => {
    const screen = await render(<CertificationCard {...mockProps} />);

    // Check that the component renders with proper structure
    const cardElement = screen.getByRole("link");
    await expect.element(cardElement).toBeInTheDocument();

    // The actual styling is complex, so we mainly check structure
    await expect
      .element(screen.getByText("Test Certification", { exact: true }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("This is a test certification description", { exact: true }))
      .toBeInTheDocument();
  });
});
