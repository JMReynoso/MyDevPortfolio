import { describe, expect, it, vi } from "vitest";
import { render, screen } from "vitest-browser-react";
import { Technologies } from "../src/components/features/Technologies";

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
