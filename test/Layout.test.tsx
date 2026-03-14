import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import Layout from "../src/pages/Layout";

const mockNavigate = vi.fn();
let mockPathname = "/";

vi.mock("react-router", () => ({
  useLocation: () => ({ pathname: mockPathname }),
  useNavigate: () => mockNavigate,
  Outlet: () => <div data-testid="outlet">Page Content</div>,
}));

vi.mock("../src/components", () => ({
  Navigation: ({ logo, links, activeSection, onSectionChange, onNavigationClick }: any) => (
    <nav data-testid="navigation">
      <span data-testid="logo-initials">{logo.initials}</span>
      <span data-testid="logo-name">{logo.name}</span>
      <span data-testid="active-section">{activeSection}</span>
      {links.map((link: any) => (
        <a
          key={link.label}
          data-testid={`nav-link-${link.label}`}
          href={link.href}
          onClick={() => {
            onSectionChange(link.label.toLowerCase());
            if (onNavigationClick) {
              onNavigationClick(link.href, link.label.toLowerCase());
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  ),
  Footer: ({ text }: any) => <footer data-testid="footer">{text}</footer>,
  CursorGlow: () => <div data-testid="cursor-glow" />,
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

describe("Layout", () => {
  it("renders the Navigation component", async () => {
    const screen = await render(<Layout />);
    await expect.element(screen.getByTestId("navigation")).toBeInTheDocument();
  });

  it("renders the Outlet for page content", async () => {
    const screen = await render(<Layout />);
    await expect.element(screen.getByTestId("outlet")).toBeInTheDocument();
    await expect.element(screen.getByText("Page Content")).toBeInTheDocument();
  });

  it("renders the Footer component", async () => {
    const screen = await render(<Layout />);
    await expect.element(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the CursorGlow component", async () => {
    const screen = await render(<Layout />);
    await expect.element(screen.getByTestId("cursor-glow")).toBeInTheDocument();
  });

  it("passes correct logo props to Navigation", async () => {
    const screen = await render(<Layout />);
    await expect
      .element(screen.getByTestId("logo-initials"))
      .toHaveTextContent("TU");
    await expect
      .element(screen.getByTestId("logo-name"))
      .toHaveTextContent("Test User");
  });

  it("renders all navigation links", async () => {
    const screen = await render(<Layout />);
    await expect
      .element(screen.getByTestId("nav-link-Home"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("nav-link-About"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("nav-link-Projects"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("nav-link-Contact"))
      .toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", async () => {
    const screen = await render(<Layout />);
    await expect
      .element(screen.getByTestId("nav-link-Home"))
      .toHaveAttribute("href", "/");
    await expect
      .element(screen.getByTestId("nav-link-About"))
      .toHaveAttribute("href", "/about");
    await expect
      .element(screen.getByTestId("nav-link-Projects"))
      .toHaveAttribute("href", "/?scrollTo=projects");
    await expect
      .element(screen.getByTestId("nav-link-Contact"))
      .toHaveAttribute("href", "/contact");
  });

  it("sets home as the default active section", async () => {
    mockPathname = "/";
    const screen = await render(<Layout />);
    await expect
      .element(screen.getByTestId("active-section"))
      .toHaveTextContent("home");
  });

  it("renders footer with copyright text including the user name", async () => {
    const screen = await render(<Layout />);
    const footer = screen.getByTestId("footer");
    await expect.element(footer).toBeInTheDocument();
    const year = new Date().getFullYear().toString();
    const footerEl = footer.element();
    expect(footerEl.textContent).toContain(year);
    expect(footerEl.textContent).toContain("Test User");
  });

  it("renders min-h-screen container", async () => {
    const screen = await render(<Layout />);
    const container = screen.getByTestId("navigation").element().parentElement;
    expect(container?.classList.contains("min-h-screen")).toBe(true);
  });
});
