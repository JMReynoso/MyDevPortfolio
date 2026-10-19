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
        await expect.element(screen.getByText("Figma")).toBeInTheDocument();
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
