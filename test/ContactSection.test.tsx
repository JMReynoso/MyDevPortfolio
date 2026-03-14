import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ContactSection } from "../src/components/features/ContactSection";

vi.mock("lucide-react", () => ({
  Mail: (props: any) => <span data-testid="icon-mail" {...props} />,
  Github: (props: any) => <span data-testid="icon-github" {...props} />,
  Linkedin: (props: any) => <span data-testid="icon-linkedin" {...props} />,
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
}));

vi.mock("../src/components/common/IconButton", () => ({
  IconButton: ({ label, variant, href }: any) => (
    <div data-testid={`icon-button-${variant}`} data-href={href}>{label}</div>
  ),
}));

vi.mock("../src/components/common/WarmButton", () => ({
  WarmButton: ({ children, className }: any) => (
    <button className={className}>{children}</button>
  ),
}));

vi.mock("../src/components/layout/SectionHeader", () => ({
  SectionHeader: ({ title, subtitle }: any) => (
    <div data-testid="section-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  ),
}));

describe("ContactSection", () => {
  it("renders with default props", async () => {
    const screen = await render(<ContactSection />);
    await expect.element(screen.getByText("Let's Work Together")).toBeInTheDocument();
    await expect.element(screen.getByText("Send Me an Email")).toBeInTheDocument();
  });

  it("renders default subtitle", async () => {
    const screen = await render(<ContactSection />);
    await expect.element(
      screen.getByText("I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."),
    ).toBeInTheDocument();
  });

  it("renders all three icon buttons", async () => {
    const screen = await render(<ContactSection />);
    await expect.element(screen.getByTestId("icon-button-green")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-maple")).toBeInTheDocument();
    await expect.element(screen.getByTestId("icon-button-yellow")).toBeInTheDocument();
  });

  it("renders with custom title and subtitle", async () => {
    const screen = await render(
      <ContactSection title="Custom Title" subtitle="Custom subtitle" />,
    );
    await expect.element(screen.getByText("Custom Title")).toBeInTheDocument();
    await expect.element(screen.getByText("Custom subtitle")).toBeInTheDocument();
  });

  it("renders email CTA button", async () => {
    const screen = await render(<ContactSection />);
    const button = screen.getByText("Send Me an Email");
    await expect.element(button).toBeInTheDocument();
  });

  it("renders icon button labels", async () => {
    const screen = await render(<ContactSection />);
    await expect.element(screen.getByText("Send email")).toBeInTheDocument();
    await expect.element(screen.getByText("View GitHub profile")).toBeInTheDocument();
    await expect.element(screen.getByText("View LinkedIn profile")).toBeInTheDocument();
  });
});
