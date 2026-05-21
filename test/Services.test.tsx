import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import Services from "../src/pages/Services";

vi.mock("../src/components", () => ({
  Section: ({ children, id, background }: any) => (
    <section data-testid={`section-${id}`} data-background={background}>
      {children}
    </section>
  ),
  SectionHeader: ({ title, subtitle }: any) => (
    <div data-testid={`section-header-${title}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  ),
  Grid: ({ children }: any) => <div data-testid="grid">{children}</div>,
  ServiceCard: ({ service }: any) => (
    <div data-testid={`service-card-${service.title}`}>
      <span>{service.title}</span>
      <span data-testid={`status-${service.title}`}>{service.status}</span>
      {service.price && (
        <span data-testid={`price-${service.title}`}>{service.price}</span>
      )}
      {service.tags.map((tag: string) => (
        <span key={tag} data-testid={`tag-${tag}`}>
          {tag}
        </span>
      ))}
    </div>
  ),
}));

vi.mock("../src/data/services", () => ({
  productizedServices: [
    {
      icon: () => null,
      title: "Backend Performance Audit",
      description: "Audit description",
      tags: ["Node.js", "NestJS", ".NET", "REST"],
      color: "green",
      price: "Price TBD",
      status: "coming_soon",
    },
    {
      icon: () => null,
      title: "API Health Check",
      description: "Health check description",
      tags: ["Node.js", "NestJS", ".NET", "REST"],
      color: "maple",
      price: "Price TBD",
      status: "coming_soon",
    },
  ],
  batchProductizedServices: [
    {
      icon: () => null,
      title: "Enterprise Performance Audit",
      description: "Enterprise audit description",
      tags: ["Node.js", "NestJS", ".NET", "REST"],
      color: "maple",
      price: "Price TBD",
      status: "coming_soon",
    },
  ],
  retainerPlans: [
    {
      icon: () => null,
      title: "Monitoring and Maintenance",
      description: "Monitoring description",
      tags: ["Feature Development", "Iterative Improvements", "Priority Support"],
      color: "yellow",
      price: "Price TBD",
      status: "coming_soon",
    },
    {
      icon: () => null,
      title: "Backend Developer",
      description: "Backend developer description",
      tags: ["Endpoint Creation", "Refactoring", "Performance Optimization"],
      color: "brown",
      price: "Price TBD",
      status: "coming_soon",
    },
    {
      icon: () => null,
      title: "Lead Backend Developer",
      description: "Lead developer description",
      tags: ["Code Review", "Refactoring", "Architectural Guidance"],
      color: "green",
      price: "Price TBD",
      status: "coming_soon",
    },
  ],
  customProjects: [
    {
      icon: () => null,
      title: "Tailored Backend Solution",
      description: "Tailored solution description",
      tags: ["Custom Architecture", "Scoping", "End-to-End Delivery"],
      color: "green",
      price: "Price TBD",
      status: "coming_soon",
    },
    {
      icon: () => null,
      title: "Third-Party Integration",
      description: "Integration description",
      tags: ["API Integration", "Webhooks", "Data Sync"],
      color: "maple",
      price: "Price TBD",
      status: "coming_soon",
    },
    {
      icon: () => null,
      title: "Legacy Modernization",
      description: "Modernization description",
      tags: ["Migration", "Refactoring", "Modernization"],
      color: "brown",
      price: "Price TBD",
      status: "coming_soon",
    },
  ],
}));

describe("Services", () => {
  it("renders the page heading", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByRole("heading", { name: "Services", exact: true, level: 1 }))
      .toBeInTheDocument();
  });

  it("renders the page subtitle", async () => {
    const screen = await render(<Services />);
    await expect
      .element(
        screen.getByText(
          "What I can build for you — from a single API to a full production deployment.",
        ),
      )
      .toBeInTheDocument();
  });

  it("renders the availability note", async () => {
    const screen = await render(<Services />);
    await expect
      .element(
        screen.getByText(
          "Some services may be unavailable due to high demand or resource constraints.",
          { exact: false },
        ),
      )
      .toBeInTheDocument();
  });

  it("renders the Productized Services section", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("section-productized"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-header-Productized Services"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Productized Services", { exact: true }))
      .toBeInTheDocument();
  });

  it("renders the Batch Productized Services section", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("section-batchProductized"))
      .toBeInTheDocument();
    await expect
      .element(
        screen.getByTestId("section-header-Productized Services in batches"),
      )
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Productized Services in batches"))
      .toBeInTheDocument();
  });

  it("renders the Retainer Plans section", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("section-retainer"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-header-Retainer Plans"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Retainer Plans"))
      .toBeInTheDocument();
  });

  it("renders the Custom Projects section", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("section-customProjects"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("section-header-Custom Projects"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Custom Projects"))
      .toBeInTheDocument();
  });

  it("renders sections with correct backgrounds", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("section-productized"))
      .toHaveAttribute("data-background", "white");
    await expect
      .element(screen.getByTestId("section-batchProductized"))
      .toHaveAttribute("data-background", "cream");
    await expect
      .element(screen.getByTestId("section-retainer"))
      .toHaveAttribute("data-background", "white");
    await expect
      .element(screen.getByTestId("section-customProjects"))
      .toHaveAttribute("data-background", "cream");
  });

  it("renders all productized service cards", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("service-card-Backend Performance Audit"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("service-card-API Health Check"))
      .toBeInTheDocument();
  });

  it("renders the batch productized service card", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("service-card-Enterprise Performance Audit"))
      .toBeInTheDocument();
  });

  it("renders all retainer plan cards", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("service-card-Monitoring and Maintenance"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("service-card-Backend Developer"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("service-card-Lead Backend Developer"))
      .toBeInTheDocument();
  });

  it("renders all custom project cards", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("service-card-Tailored Backend Solution"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("service-card-Third-Party Integration"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("service-card-Legacy Modernization"))
      .toBeInTheDocument();
  });

  it("renders service cards with correct statuses", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("status-Backend Performance Audit"))
      .toHaveTextContent("coming_soon");
    await expect
      .element(screen.getByTestId("status-API Health Check"))
      .toHaveTextContent("coming_soon");
    await expect
      .element(screen.getByTestId("status-Monitoring and Maintenance"))
      .toHaveTextContent("coming_soon");
  });

  it("renders service cards with tags", async () => {
    const screen = await render(<Services />);
    // unique tags — one per card, no duplicate testIds in the DOM
    await expect
      .element(screen.getByTestId("tag-Code Review"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("tag-Architectural Guidance"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("tag-Endpoint Creation"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("tag-Feature Development"))
      .toBeInTheDocument();
  });

  it("renders service cards with prices", async () => {
    const screen = await render(<Services />);
    await expect
      .element(screen.getByTestId("price-Backend Performance Audit"))
      .toHaveTextContent("Price TBD");
    await expect
      .element(screen.getByTestId("price-Lead Backend Developer"))
      .toHaveTextContent("Price TBD");
  });
});
