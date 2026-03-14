import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import Contact from "../src/pages/Contact";

vi.mock("../src/components", () => ({
  Section: ({ children, id, background, className }: any) => (
    <section data-testid={`section-${id}`} data-background={background} className={className}>
      {children}
    </section>
  ),
  SectionHeader: ({ title, subtitle, align }: any) => (
    <div data-testid="section-header" data-align={align}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  ),
}));

vi.mock("lucide-react", () => ({
  Mail: (props: any) => <span data-testid="mail-icon" {...props} />,
  Send: (props: any) => <span data-testid="send-icon" {...props} />,
}));

vi.mock("../src/constants/strings", () => ({
  strings: {
    social: {
      email: "test@example.com",
      github: "https://github.com/test",
      linkedin: "https://linkedin.com/in/test",
    },
    name: "Test User",
    initials: "TU",
  },
}));

describe("Contact", () => {
  it("renders the page header", async () => {
    const screen = await render(<Contact />);
    await expect.element(screen.getByText("Get in Touch")).toBeInTheDocument();
    await expect
      .element(
        screen.getByText(
          "Fill out the form below and I'll get back to you as soon as possible.",
        ),
      )
      .toBeInTheDocument();
  });

  it("renders all form fields", async () => {
    const screen = await render(<Contact />);
    await expect.element(screen.getByLabelText("Name")).toBeInTheDocument();
    await expect.element(screen.getByLabelText("Email")).toBeInTheDocument();
    await expect.element(screen.getByLabelText("Subject")).toBeInTheDocument();
    await expect.element(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders form fields with correct placeholders", async () => {
    const screen = await render(<Contact />);
    await expect
      .element(screen.getByPlaceholder("Your name"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByPlaceholder("your.email@example.com"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByPlaceholder("What's this about?"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByPlaceholder("Tell me about your project or idea..."))
      .toBeInTheDocument();
  });

  it("renders submit button with default state", async () => {
    const screen = await render(<Contact />);
    const submitButton = screen.getByRole("button", { name: /send message/i });
    await expect.element(submitButton).toBeInTheDocument();
  });

  it("renders all form fields as required", async () => {
    const screen = await render(<Contact />);
    await expect
      .element(screen.getByLabelText("Name"))
      .toHaveAttribute("aria-required", "true");
    await expect
      .element(screen.getByLabelText("Email"))
      .toHaveAttribute("aria-required", "true");
    await expect
      .element(screen.getByLabelText("Subject"))
      .toHaveAttribute("aria-required", "true");
    await expect
      .element(screen.getByLabelText("Message"))
      .toHaveAttribute("aria-required", "true");
  });

  it("shows name validation error on blur with empty value", async () => {
    const screen = await render(<Contact />);
    const nameInput = screen.getByLabelText("Name");
    await nameInput.fill("x");
    await nameInput.fill("");
    await screen.getByLabelText("Email").click(); // blur name
    await expect
      .element(screen.getByText("Name is required"))
      .toBeInTheDocument();
  });

  it("shows name length validation error", async () => {
    const screen = await render(<Contact />);
    const nameInput = screen.getByLabelText("Name");
    await nameInput.click();
    await nameInput.fill("A");
    await screen.getByLabelText("Email").click(); // blur
    await expect
      .element(screen.getByText("Name must be at least 2 characters"))
      .toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const screen = await render(<Contact />);
    const emailInput = screen.getByLabelText("Email");
    await emailInput.click();
    await emailInput.fill("notanemail");
    await screen.getByLabelText("Subject").click(); // blur
    await expect
      .element(screen.getByText("Please enter a valid email address"))
      .toBeInTheDocument();
  });

  it("shows email required error on empty blur", async () => {
    const screen = await render(<Contact />);
    const emailInput = screen.getByLabelText("Email");
    await emailInput.fill("x");
    await emailInput.fill("");
    await screen.getByLabelText("Subject").click(); // blur
    await expect
      .element(screen.getByText("Email is required"))
      .toBeInTheDocument();
  });

  it("shows subject validation error for short subject", async () => {
    const screen = await render(<Contact />);
    const subjectInput = screen.getByLabelText("Subject");
    await subjectInput.click();
    await subjectInput.fill("Hi");
    await screen.getByLabelText("Message").click(); // blur
    await expect
      .element(screen.getByText("Subject must be at least 3 characters"))
      .toBeInTheDocument();
  });

  it("shows message validation error for short message", async () => {
    const screen = await render(<Contact />);
    const messageInput = screen.getByLabelText("Message");
    await messageInput.click();
    await messageInput.fill("Short");
    await screen.getByLabelText("Name").click(); // blur
    await expect
      .element(screen.getByText("Message must be at least 10 characters"))
      .toBeInTheDocument();
  });

  it("clears validation error when input becomes valid", async () => {
    const screen = await render(<Contact />);
    const nameInput = screen.getByLabelText("Name");
    await nameInput.click();
    await nameInput.fill("A");
    await screen.getByLabelText("Email").click(); // blur to trigger error
    await expect
      .element(screen.getByText("Name must be at least 2 characters"))
      .toBeInTheDocument();
    // Now fix the name
    await nameInput.click();
    await nameInput.fill("Valid Name");
    await expect
      .element(screen.getByText("Name must be at least 2 characters"))
      .not.toBeInTheDocument();
  });

  it("renders alternative contact section", async () => {
    const screen = await render(<Contact />);
    await expect
      .element(screen.getByText("Or reach out directly at"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("test@example.com"))
      .toBeInTheDocument();
  });

  it("renders email link in alternative contact", async () => {
    const screen = await render(<Contact />);
    const emailLink = screen.getByText("test@example.com");
    await expect
      .element(emailLink)
      .toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders the form inside a Section with correct props", async () => {
    const screen = await render(<Contact />);
    await expect
      .element(screen.getByTestId("section-contact-form"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-contact-form"))
      .toHaveAttribute("data-background", "cream");
  });

  it("renders name input with correct type", async () => {
    const screen = await render(<Contact />);
    await expect
      .element(screen.getByLabelText("Name"))
      .toHaveAttribute("type", "text");
  });

  it("renders email input with correct type", async () => {
    const screen = await render(<Contact />);
    await expect
      .element(screen.getByLabelText("Email"))
      .toHaveAttribute("type", "email");
  });
});
