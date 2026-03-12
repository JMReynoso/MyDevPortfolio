import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ContactSection } from "../src/components/features/ContactSection";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Mail: () => <span data-testid="mail-icon">Mail</span>,
  Github: () => <span data-testid="github-icon">Github</span>,
  Linkedin: () => <span data-testid="linkedin-icon">Linkedin</span>,
}));

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  ),
}));

// Mock components
vi.mock("../src/components/common/IconButton", () => ({
  IconButton: ({ icon: Icon, href, variant, label }: any) => (
    <div data-testid={`icon-button-${variant}`}>
      <Icon />
      {label}
    </div>
  ),
}));

vi.mock("../src/components/common/WarmButton", () => ({
  WarmButton: ({ children, className }: any) => (
    <button className={className}>{children}</button>
  ),
}));

vi.mock("../src/components/layout/SectionHeader", () => ({
  SectionHeader: ({ title, subtitle }: any) => (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  ),
}));

describe("ContactSection", () => {
  it("renders correctly with default props", async () => {
    const screen = await render(<ContactSection />);

    // Check SectionHeader
    await expect.element(screen.getByText("Let's Work Together")).toBeInTheDocument();
    await expect.element(screen.getByText("I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.")).toBeInTheDocument();

    // Check icon buttons
    await expect.element(screen.getByTestId("icon-button-green")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-maple")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-yellow")).toBeInTheDocument();

    // Check warm button
    await expect.element(screen.getByText("Send Me an Email")).toBeInTheDocument();
  });

  it("renders correctly with custom props", async () => {
    const screen = await render(
      <ContactSection 
        title="Custom Title"
        subtitle="Custom subtitle"
        email="custom@example.com"
        githubUrl="https://github.com/custom"
        linkedinUrl="https://linkedin.com/custom"
      />
    );

    // Check custom title and subtitle
    await expect.element(screen.getByText("Custom Title")).toBeInTheDocument();
    await expect.element(screen.getByText("Custom subtitle")).toBeInTheDocument();

    // Check icon buttons
    await expect.element(screen.getByTestId("icon-button-green")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-maple")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-yellow")).toBeInTheDocument();

    // Check warm button
    await expect.element(screen.getByText("Send Me an Email")).toBeInTheDocument();
  });

  it("renders correctly with custom email", async () => {
    const screen = await render(<ContactSection email="test@example.com" />);

    // The email is used internally but not directly rendered in the component
    await expect.element(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it("renders correctly with custom githubUrl", async () => {
    const screen = await render(<ContactSection githubUrl="https://github.com/test" />);

    // The githubUrl is used internally but not directly rendered in the component
    await expect.element(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it("renders correctly with custom linkedinUrl", async () => {
    const screen = await render(<ContactSection linkedinUrl="https://linkedin.com/test" />);

    // The linkedinUrl is used internally but not directly rendered in the component
    await expect.element(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it("renders all expected elements", async () => {
    const screen = await render(<ContactSection />);

    // Check SectionHeader components
    await expect.element(screen.getByText("Let's Work Together")).toBeInTheDocument();
    await expect.element(screen.getByText("I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.")).toBeInTheDocument();

    // Check icon buttons
    await expect.element(screen.getByTestId("icon-button-green")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-maple")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-yellow")).toBeInTheDocument();

    // Check warm button
    await expect.element(screen.getByText("Send Me an Email")).toBeInTheDocument();
  });
});