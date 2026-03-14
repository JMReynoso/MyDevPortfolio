import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { CertificationCard } from "../src/components/features/CertificationCard";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, whileTap, whileInView, initial, animate, transition, viewport, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

vi.mock("../src/components/common/WarmBadge", () => ({
  WarmBadge: ({ children, variant }: any) => (
    <span data-testid={`badge-${variant}`}>{children}</span>
  ),
}));

const MockIcon = ((props: any) => <span data-testid="cert-icon" {...props} />) as any;

describe("CertificationCard", () => {
  const defaultProps = {
    title: "AWS Certification",
    text: "Cloud practitioner certification",
    status: "Certified",
    delay: 0,
    icon: MockIcon,
    link: "https://aws.amazon.com/cert",
  };

  it("renders title and description", async () => {
    const screen = await render(<CertificationCard {...defaultProps} />);
    await expect.element(screen.getByText("AWS Certification")).toBeInTheDocument();
    await expect.element(screen.getByText("Cloud practitioner certification")).toBeInTheDocument();
  });

  it("renders as a link with correct attributes", async () => {
    const screen = await render(<CertificationCard {...defaultProps} />);
    const link = screen.getByRole("link");
    await expect.element(link).toHaveAttribute("href", "https://aws.amazon.com/cert");
    await expect.element(link).toHaveAttribute("target", "_blank");
    await expect.element(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders icon", async () => {
    const screen = await render(<CertificationCard {...defaultProps} />);
    await expect.element(screen.getByTestId("cert-icon")).toBeInTheDocument();
  });

  it("renders Certified status with success badge", async () => {
    const screen = await render(<CertificationCard {...defaultProps} />);
    await expect.element(screen.getByTestId("badge-success")).toBeInTheDocument();
    await expect.element(screen.getByText("Certified")).toBeInTheDocument();
  });

  it("renders non-Certified status with accent badge", async () => {
    const screen = await render(
      <CertificationCard {...defaultProps} status="In Progress" />,
    );
    await expect.element(screen.getByTestId("badge-accent")).toBeInTheDocument();
    await expect.element(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders heading as h3", async () => {
    const screen = await render(<CertificationCard {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 3 });
    await expect.element(heading).toHaveTextContent("AWS Certification");
  });
});
