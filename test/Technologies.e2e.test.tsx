import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page, userEvent, type Locator } from "vitest/browser";
import { render, screen } from "vitest-browser-react";
import { Technologies } from "../src/components/features/Technologies";
// Load the site's real stylesheet so the bubbles lay out as they do for visitors.
import "../src/index.css";

type RenderedTechnologies = Awaited<ReturnType<typeof render>>;

// Names of the Technology cards currently shown, in display order.
const cardNames = (screen: RenderedTechnologies) =>
    Array.from(
        screen.getByTestId("technology-grid").element().querySelectorAll("a")
    ).map((card) => card.textContent);

// The browser keeps its mouse pointer between tests, and hovering a Bubble
// selects its Technology Category. A pointer left over a Bubble by an earlier
// click would select that Bubble as soon as the next test renders it, instead
// of the default Front-end. Parking the pointer on the body first stops that.
beforeEach(async () => {
    await userEvent.unhover(document.body);
});

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
        await expect.element(screen.getByText("DevOps")).toBeInTheDocument();
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
        await expect
            .element(screen.getByTestId("category-bubble-frontend"))
            .toBeInTheDocument();

        const labels = Array.from(
            screen
                .getByTestId("category-bubbles")
                .element()
                .querySelectorAll("button")
        ).map((bubble) => bubble.textContent);

        expect(labels).toEqual(["Front-end", "Back-end", "DevOps", "Tools"]);
    });

    it("opens on Front-end", async () => {
        const screen = await render(<Technologies />);

        await expect
            .element(screen.getByTestId("category-bubble-frontend"))
            .toHaveAttribute("aria-pressed", "true");
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

// Master Resume Technologies that joined the section, checked through the real
// category data.
describe("Technologies E2E - Master Resume Technologies", () => {
    it("shows .NET Core under Back-end, with no plain .NET card left", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-backend").click();

        await expect
            .element(screen.getByTestId("tech-card-.NET Core"))
            .toBeInTheDocument();
        expect(screen.getByTestId("tech-card-.NET").elements()).toHaveLength(0);
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

            const names = cardNames(screen);

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

        const names = cardNames(screen);

        expect(names[names.length - 1]).toBe("ComfyUI");
    });

    const newTechnologyLinks = [
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

    for (const [category, name, href] of newTechnologyLinks) {
        it(`links ${name} to the expected URL`, async () => {
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

// DevOps bubble, checked through the real category data. Its Technologies are
// the ones under the Master Resume's "Cloud & DevOps" heading, in the Master
// Resume's order.
describe("Technologies E2E - DevOps bubble", () => {
    const devOpsTechnologies = [
        "AWS",
        "Azure",
        "Docker",
        "Docker Compose",
        "GitLab CI/CD",
        "GitHub Actions",
        "Nginx",
        "Cloudflare Tunnel / Zero Trust",
        "Swagger / OpenAPI",
        "Turborepo",
        "Datadog",
    ];

    const interactions = [
        ["hover", (bubble: Locator) => bubble.hover()],
        ["click", (bubble: Locator) => bubble.click()],
        ["keyboard focus", async (bubble: Locator) => bubble.element().focus()],
    ] as const;

    it.each(interactions)(
        "selects DevOps and lists its 11 Technologies on %s",
        async (_interaction, interact) => {
            const screen = await render(<Technologies />);
            const devOps = screen.getByTestId("category-bubble-devops");

            await interact(devOps);

            await expect
                .element(devOps)
                .toHaveAttribute("aria-pressed", "true");
            await expect
                .poll(() => cardNames(screen))
                .toEqual(devOpsTechnologies);
        }
    );

    // Hovers every bubble in turn and returns the card names shown under each.
    const namesByCategory = async (screen: RenderedTechnologies) => {
        const result: Record<string, (string | null)[]> = {};
        for (const id of ["frontend", "backend", "devops", "tools"]) {
            const bubble = screen.getByTestId(`category-bubble-${id}`);
            await bubble.hover();
            await expect
                .element(bubble)
                .toHaveAttribute("aria-pressed", "true");
            result[id] = cardNames(screen);
        }
        return result;
    };

    it("shows no Technology under more than one bubble", async () => {
        const screen = await render(<Technologies />);

        const names = Object.values(await namesByCategory(screen)).flat();

        expect(names.length).toBeGreaterThan(0);
        expect(names.filter((name, i) => names.indexOf(name) !== i)).toEqual(
            []
        );
    });

    it("shows 11 Front-end, 22 Back-end, 11 DevOps and 19 Tools Technologies", async () => {
        const screen = await render(<Technologies />);

        const byCategory = await namesByCategory(screen);

        expect({
            frontend: byCategory.frontend.length,
            backend: byCategory.backend.length,
            devops: byCategory.devops.length,
            tools: byCategory.tools.length,
        }).toEqual({ frontend: 11, backend: 22, devops: 11, tools: 19 });
    });

    it("moves the DevOps Technologies out of Back-end and Tools", async () => {
        const screen = await render(<Technologies />);

        const byCategory = await namesByCategory(screen);

        // Covers the spot checks that Docker isn't under Tools and AWS isn't under
        // Back-end. AWS Lambda is not part of the move: the Master Resume keeps it
        // in Back-end.
        expect(byCategory.backend).toContain("AWS Lambda");
        for (const name of devOpsTechnologies) {
            expect(byCategory.devops).toContain(name);
            expect(byCategory.backend).not.toContain(name);
            expect(byCategory.tools).not.toContain(name);
        }
    });

    it("shows Cloudflare Tunnel / Zero Trust under DevOps, with no Cloudflare Zero Trust card left", async () => {
        const screen = await render(<Technologies />);

        await screen.getByTestId("category-bubble-devops").click();

        await expect
            .element(
                screen.getByTestId("tech-card-Cloudflare Tunnel / Zero Trust")
            )
            .toBeInTheDocument();
        expect(
            screen.getByTestId("tech-card-Cloudflare Zero Trust").elements()
        ).toHaveLength(0);
    });

    // Moved Technologies keep their links; the two new ones get these.
    const devOpsLinks = [
        ["AWS", "https://aws.amazon.com/"],
        ["Azure", "https://azure.microsoft.com/"],
        ["Docker", "https://www.docker.com/"],
        ["Docker Compose", "https://docs.docker.com/compose/"],
        ["GitLab CI/CD", "https://docs.gitlab.com/ci/"],
        ["GitHub Actions", "https://github.com/features/actions"],
        ["Nginx", "https://nginx.org/"],
        [
            "Cloudflare Tunnel / Zero Trust",
            "https://www.cloudflare.com/zero-trust/",
        ],
        ["Swagger / OpenAPI", "https://swagger.io/"],
        ["Turborepo", "https://turborepo.dev/"],
        ["Datadog", "https://www.datadoghq.com/"],
    ] as const;

    for (const [name, href] of devOpsLinks) {
        it(`links ${name} to the expected URL`, async () => {
            const screen = await render(<Technologies />);

            await screen.getByTestId("category-bubble-devops").click();

            await expect
                .element(screen.getByTestId(`tech-card-${name}`))
                .toHaveAttribute("href", href);
        });
    }
});

describe("Technologies E2E - Bubble layout", () => {
    // Sub-pixel rounding and the active Bubble's scale shouldn't matter, so
    // positions within this many pixels count as the same side or the same row.
    const TOLERANCE_PX = 2;

    const originalViewport = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    afterEach(async () => {
        await page.viewport(originalViewport.width, originalViewport.height);
    });

    // The centre point of a Bubble.
    type Centre = { x: number; y: number };

    // Horizontal (x) and vertical (y) centre of every Bubble, in the order they
    // appear on the page. The centre is used because the active Bubble is scaled
    // up around it.
    const bubbleCentres = (container: Element): Centre[] =>
        Array.from(
            container.querySelectorAll<HTMLElement>(
                '[data-testid^="category-bubble-"]'
            )
        ).map((bubble) => {
            const box = bubble.getBoundingClientRect();
            return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
        });

    // Groups Bubbles into rows by vertical centre, so Bubbles on the same line
    // share a row. The top edge can't be used: the active Bubble's 5% scale moves
    // it by about 3px, more than the tolerance. Rows come out in the order their
    // first Bubble appears in the DOM, and each row keeps DOM order.
    const rowsOf = (centres: Centre[]) => {
        const rows: Centre[][] = [];
        for (const centre of centres) {
            const row = rows.find(
                ([first]) => Math.abs(first.y - centre.y) <= TOLERANCE_PX
            );
            if (row) {
                row.push(centre);
            } else {
                rows.push([centre]);
            }
        }
        return rows;
    };

    // 768px is where the desktop layout starts, so it is tested as well as a
    // wider screen.
    it.each([768, 1024])(
        "alternates Bubbles left and right on desktop at %ipx, starting on the left",
        async (width) => {
            await page.viewport(width, 768);
            const screen = await render(<Technologies />);
            await expect
                .element(screen.getByTestId("category-bubble-frontend"))
                .toBeInTheDocument();

            const xs = bubbleCentres(screen.container).map(({ x }) => x);

            expect(xs).toHaveLength(4);
            xs.slice(0, -1).forEach((x, index) => {
                const next = xs[index + 1];
                // Even positions sit left of their neighbours, odd positions right.
                if (index % 2 === 0) {
                    expect(x).toBeLessThan(next - TOLERANCE_PX);
                } else {
                    expect(x).toBeGreaterThan(next + TOLERANCE_PX);
                }
            });
        }
    );

    // Phones are everything below 768px, so 767px is the widest one. Two Bubbles
    // and the gap between them take 240px, which fits even at 320px.
    it.each([320, 375, 767])(
        "shows Bubbles two per row, each row centred, on phones at %ipx",
        async (width) => {
            await page.viewport(width, 800);
            const screen = await render(<Technologies />);
            await expect
                .element(screen.getByTestId("category-bubble-frontend"))
                .toBeInTheDocument();

            const centres = bubbleCentres(screen.container);
            const rows = rowsOf(centres);
            const container = screen
                .getByTestId("technologies-container")
                .element()
                .getBoundingClientRect();
            const containerCentre = container.left + container.width / 2;

            // Guards against passing with no Bubbles to check.
            expect(centres.length).toBeGreaterThan(0);

            // As many rows as half the Bubbles, rounded up, and none holds more
            // than two.
            expect(rows).toHaveLength(Math.ceil(centres.length / 2));
            rows.forEach((row) => expect(row.length).toBeLessThanOrEqual(2));

            // Bubbles follow the DOM order: left before right within a row, and
            // each row below the one before.
            expect(rows.flat()).toEqual(centres);
            rows.forEach((row) =>
                row.slice(1).forEach((centre, index) => {
                    expect(centre.x).toBeGreaterThan(
                        row[index].x + TOLERANCE_PX
                    );
                })
            );
            rows.slice(1).forEach((row, index) => {
                expect(row[0].y).toBeGreaterThan(
                    rows[index][0].y + TOLERANCE_PX
                );
            });

            // Each row's midpoint sits at the centre of the whole section, so the
            // block is centred there and not just within itself.
            rows.forEach((row) => {
                const xs = row.map(({ x }) => x);
                const midpoint = (Math.min(...xs) + Math.max(...xs)) / 2;
                expect(
                    Math.abs(midpoint - containerCentre)
                ).toBeLessThanOrEqual(TOLERANCE_PX);
            });
        }
    );
});
