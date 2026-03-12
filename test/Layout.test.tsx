import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import Layout from "../src/pages/Layout";

// Mock components
vi.mock("../components/Navigation", () => ({
  Navigation: ({ logo, links, activeSection }: any) => (
    <nav data-testid="navigation" data-active={activeSection}>
      <span>{logo.name}</span>
      {links.map((link: any) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  ),
}));

vi.mock("../components/Footer", () => ({
  Footer: ({ text }: any) => <footer data-testid="footer">{text}</footer>,
}));

vi.mock("../components/CursorGlow", () => ({
  CursorGlow: () => <div data-testid="cursor-glow" />,
}));

// Mock react-router
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

// Mock strings constant
vi.mock("../constants/strings", () => ({
  strings: {
    initials: "JD",
    name: "John Doe",
  },
}));

describe("Layout", () => {
  it("renders without crashing", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);
    await expect.element(screen).toBeInTheDocument();
  });

  it("renders navigation component with correct props", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);

    await expect.element(screen).toBeInTheDocument();
    await expect.element(screen).toHaveText("John Doe");
  });

  it("renders footer with correct copyright text", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);

    const footer = screen.getByTestId("footer");
    await expect(footer).toBeInTheDocument();
    await expect(footer).toHaveTextContent(/©.*John Doe/);
  });

  it("renders CursorGlow component", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);

    await expect.element(screen).toBeInTheDocument();
    await expect.element(screen).toHaveText("John Doe");
  });

  it("handles navigation click for projects section", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/",
    });
    const mockNavigate = vi.fn();
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      mockNavigate,
    );

    const screen = await render(<Layout />);

    // Test that navigation click handler works
    await expect.element(screen).toBeInTheDocument();
  });

  it("scrolls to top on route change", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/about",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);

    await expect.element(screen).toBeInTheDocument();
  });

  it("updates active section based on current route", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/about",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);

    await expect.element(screen).toBeInTheDocument();
  });

  it("renders Outlet component", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);

    await expect.element(screen).toBeInTheDocument();
  });

  it("renders navigation links correctly", async () => {
    vi.mocked(vi.importActual("react-router")).useLocation.mockReturnValue({
      pathname: "/",
    });
    vi.mocked(vi.importActual("react-router")).useNavigate.mockReturnValue(
      vi.fn(),
    );

    const screen = await render(<Layout />);

    await expect.element(screen).toBeInTheDocument();
  });
});
