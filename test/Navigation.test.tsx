import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Navigation } from "../src/components/layout/Navigation";

vi.mock("../src/components/ui/use-mobile", () => ({
  useIsMobile: vi.fn(() => false),
}));

vi.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <a {...props}>{children}</a>,
    span: ({ children, whileHover, whileTap, initial, animate, transition, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, to, onClick, ...props }: any) => (
    <a
      href={to}
      onClick={(e: any) => {
        e.preventDefault();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));

vi.mock("../src/components/figma/ImageWithFallback", () => ({
  ImageWithFallback: (props: any) => <img {...props} />,
}));

vi.mock("lucide-react", () => ({
  Home: (props: any) => <span data-testid="icon-home" {...props} />,
  User: (props: any) => <span data-testid="icon-user" {...props} />,
  Briefcase: (props: any) => <span data-testid="icon-briefcase" {...props} />,
  Mail: (props: any) => <span data-testid="icon-mail" {...props} />,
}));

describe("Navigation", () => {
  const mockLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "/contact" },
  ];

  it("renders without crashing", async () => {
    const screen = await render(
      <Navigation links={mockLinks} activeSection="home" />,
    );
    await expect.element(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders default logo name", async () => {
    const screen = await render(
      <Navigation links={mockLinks} activeSection="home" />,
    );
    await expect.element(screen.getByText("Your Name")).toBeInTheDocument();
  });

  it("renders custom logo", async () => {
    const screen = await render(
      <Navigation
        links={mockLinks}
        activeSection="home"
        logo={{ initials: "JS", name: "John Smith" }}
      />,
    );
    await expect.element(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("renders all navigation link labels", async () => {
    const screen = await render(
      <Navigation links={mockLinks} activeSection="home" />,
    );
    await expect.element(screen.getByText("Home")).toBeInTheDocument();
    await expect.element(screen.getByText("About")).toBeInTheDocument();
    await expect.element(screen.getByText("Projects")).toBeInTheDocument();
    await expect.element(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders profile picture", async () => {
    const screen = await render(
      <Navigation links={mockLinks} activeSection="home" />,
    );
    await expect.element(screen.getByAltText("Profile Picture")).toBeInTheDocument();
  });

  it("renders with empty links array", async () => {
    const screen = await render(
      <Navigation links={[]} activeSection="home" />,
    );
    await expect.element(screen.getByText("Your Name")).toBeInTheDocument();
  });

  it("calls onSectionChange when link is clicked", async () => {
    const mockOnSectionChange = vi.fn();
    const screen = await render(
      <Navigation
        links={mockLinks}
        activeSection="home"
        onSectionChange={mockOnSectionChange}
      />,
    );
    await screen.getByText("About").click();
    expect(mockOnSectionChange).toHaveBeenCalledWith("about");
  });

  it("calls onNavigationClick when link is clicked", async () => {
    const mockOnNavigationClick = vi.fn();
    const screen = await render(
      <Navigation
        links={mockLinks}
        activeSection="home"
        onNavigationClick={mockOnNavigationClick}
      />,
    );
    await screen.getByText("About").click();
    expect(mockOnNavigationClick).toHaveBeenCalledWith("/about", "about");
  });
});
