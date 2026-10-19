import { afterEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { render, screen } from "vitest-browser-react";
import { Technologies } from "../src/components/features/Technologies";
// Load the site's real stylesheet so the bubbles lay out as they do for visitors.
import "../src/index.css";

// E2E tests for the layout shift fix in Technologies component
// These tests verify the fix works correctly in the browser environment
describe("Technologies E2E - Layout Shift Fix", () => {
    it("renders the Technologies component with all category bubbles", async () => {
        const screen = await render(<Technologies />);
        await expect
            .element(screen.getByTestId("technologies-container"))
            .toBeInTheDocument();
        await expect.element(screen.getByText("Front-end")).toBeInTheDocument();
        await expect.element(screen.getByText("Back-end")).toBeInTheDocument();
        await expect.element(screen.getByText("Tools")).toBeInTheDocument();
    });

    it("switches between categories on click", async () => {
        const screen = await render(<Technologies />);

        // Verify initial state (frontend active)
        const frontendBubble = screen.getByTestId("category-bubble-frontend");
        await expect.element(frontendBubble).toBeInTheDocument();

        // Click backend bubble
        const backendBubble = screen.getByTestId("category-bubble-backend");
        await backendBubble.click();
        await expect.element(backendBubble).toBeInTheDocument();
        await expect.element(screen.getByText("Node.js")).toBeInTheDocument();

        // Click tools bubble
        const toolsBubble = screen.getByTestId("category-bubble-tools");
        await toolsBubble.click();
        await expect.element(toolsBubble).toBeInTheDocument();
        await expect
            .element(screen.getByText("Figma", { exact: true }))
            .toBeInTheDocument();
    });

    it("displays bubbles in correct order", async () => {
        const screen = await render(<Technologies />);

        // Get all bubble buttons
        const frontendBubble = screen.getByTestId("category-bubble-frontend");
        const backendBubble = screen.getByTestId("category-bubble-backend");
        const toolsBubble = screen.getByTestId("category-bubble-tools");

        // Verify bubbles exist
        await expect.element(frontendBubble).toBeInTheDocument();
        await expect.element(backendBubble).toBeInTheDocument();
        await expect.element(toolsBubble).toBeInTheDocument();
    });

    it("handles rapid category switching without errors", async () => {
        const screen = await render(<Technologies />);

        // Rapidly click between categories
        await screen.getByTestId("category-bubble-frontend").click();
        await screen.getByTestId("category-bubble-backend").click();
        await screen.getByTestId("category-bubble-tools").click();
        await screen.getByTestId("category-bubble-frontend").click();

        // Should still be on frontend
        const frontendBubble = screen.getByTestId("category-bubble-frontend");
        expect(frontendBubble).not.toBeNull();
    });
});

// Master Resume Technologies added by spec #52 (ticket #55), checked through
// the real category data.
describe("Technologies E2E - Master Resume Technologies", () => {
    it("shows React Hook Form under Front-end", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-frontend").click();

        await expect
            .element(screen.getByTestId("tech-card-React Hook Form"))
            .toBeInTheDocument();
    });

    it("shows .NET Core under Back-end, with no plain .NET card left", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-backend").click();

        await expect
            .element(screen.getByTestId("tech-card-.NET Core"))
            .toBeInTheDocument();
        expect(screen.getByTestId("tech-card-.NET").elements()).toHaveLength(
            0
        );
    });

    it("shows Hangfire under Back-end", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-backend").click();

        await expect
            .element(screen.getByTestId("tech-card-Hangfire"))
            .toBeInTheDocument();
    });

    it("shows Selenium under Tools", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-tools").click();

        await expect
            .element(screen.getByTestId("tech-card-Selenium"))
            .toBeInTheDocument();
    });

    // Each new Technology goes right after its closest relative.
    const placements = [
        {
            category: "frontend",
            pairs: [["React Router", "React Hook Form"]],
        },
        {
            category: "backend",
            pairs: [
                ["Express", "Fastify"],
                [".NET Core", ".NET Framework"],
                ["Entity Framework Core", "Hangfire"],
                ["Prisma", "knex.js"],
                ["Java", "C"],
            ],
        },
        {
            category: "tools",
            pairs: [
                ["Figma", "Figma Make"],
                ["JIRA", "Confluence"],
                ["Postman", "SSMS"],
                ["NUnit", "Moq"],
                ["Testcontainers", "Selenium"],
                ["Claude Code", "Claude Design"],
                ["Claude API", "Perplexity API"],
            ],
        },
    ] as const;

    for (const { category, pairs } of placements) {
        it(`places each new ${category} Technology right after its closest relative`, async () => {
            const screen = await render(<Technologies />);

            await screen.getByTestId(`category-bubble-${category}`).click();
            await expect
                .element(screen.getByTestId(`tech-card-${pairs[0][1]}`))
                .toBeInTheDocument();

            const names = Array.from(
                screen
                    .getByTestId("technology-grid")
                    .element()
                    .querySelectorAll("a")
            ).map((card) => card.textContent);

            for (const [relative, added] of pairs) {
                expect(names.indexOf(added)).toBe(names.indexOf(relative) + 1);
            }
        });
    }

    it("puts ComfyUI last under Tools", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-tools").click();
        await expect
            .element(screen.getByTestId("tech-card-ComfyUI"))
            .toBeInTheDocument();

        const cards = screen
            .getByTestId("technology-grid")
            .element()
            .querySelectorAll("a");

        expect(cards[cards.length - 1].textContent).toBe("ComfyUI");
    });

    const officialSites = [
        ["frontend", "React Hook Form", "https://react-hook-form.com/"],
        ["backend", "Fastify", "https://fastify.dev/"],
        [
            "backend",
            ".NET Framework",
            "https://learn.microsoft.com/en-us/dotnet/framework/",
        ],
        ["backend", "Hangfire", "https://www.hangfire.io/"],
        ["backend", "knex.js", "https://knexjs.org/"],
        ["backend", "C", "https://www.iso.org/standard/82075.html"],
        ["tools", "Figma Make", "https://www.figma.com/make/"],
        [
            "tools",
            "Confluence",
            "https://www.atlassian.com/software/confluence",
        ],
        ["tools", "SSMS", "https://learn.microsoft.com/en-us/ssms/"],
        ["tools", "Moq", "https://github.com/devlooped/moq"],
        ["tools", "Selenium", "https://www.selenium.dev/"],
        ["tools", "Claude Design", "https://claude.com/product/design"],
        ["tools", "Perplexity API", "https://docs.perplexity.ai/"],
        ["tools", "ComfyUI", "https://www.comfy.org/"],
    ] as const;

    for (const [category, name, href] of officialSites) {
        it(`links ${name} to its official site`, async () => {
            const screen = await render(<Technologies />);

            await screen.getByTestId(`category-bubble-${category}`).click();

            await expect
                .element(screen.getByTestId(`tech-card-${name}`))
                .toHaveAttribute("href", href);
        });
    }

    it("keeps the .NET Core link unchanged", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-backend").click();

        await expect
            .element(screen.getByTestId("tech-card-.NET Core"))
            .toHaveAttribute("href", "https://dotnet.microsoft.com/");
    });
});

describe("Technologies E2E - Bubble zig-zag", () => {
    const originalViewport = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    afterEach(async () => {
        await page.viewport(originalViewport.width, originalViewport.height);
    });

    // Horizontal centre of every bubble, in the order they appear on the page.
    // The centre is used because the active bubble is scaled up around it.
    const bubbleCentres = (container: Element) =>
        Array.from(
            container.querySelectorAll<HTMLElement>(
                '[data-testid^="category-bubble-"]'
            )
        ).map((bubble) => {
            const box = bubble.getBoundingClientRect();
            return box.left + box.width / 2;
        });

    it("alternates bubbles left and right on desktop, starting on the left", async () => {
        await page.viewport(1024, 768);
        const screen = await render(<Technologies />);
        await expect
            .element(screen.getByTestId("category-bubble-frontend"))
            .toBeInTheDocument();

        const centres = bubbleCentres(screen.container);

        expect(centres.length).toBeGreaterThan(1);
        centres.slice(0, -1).forEach((centre, index) => {
            const next = centres[index + 1];
            // Even positions sit left of their neighbours, odd positions right.
            if (index % 2 === 0) {
                expect(centre).toBeLessThan(next);
            } else {
                expect(centre).toBeGreaterThan(next);
            }
        });
    });

    it("keeps the bubbles in one centred column on phones", async () => {
        await page.viewport(375, 800);
        const screen = await render(<Technologies />);
        await expect
            .element(screen.getByTestId("category-bubble-frontend"))
            .toBeInTheDocument();

        const centres = bubbleCentres(screen.container);

        expect(centres.length).toBeGreaterThan(1);
        centres.forEach((centre) => expect(centre).toBeCloseTo(centres[0], 0));
    });
});
