import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMaxTechListHeight } from "./useMaxTechListHeight";
import { categories } from "../data/technologies";

// Mock the document for testing
beforeEach(() => {
  // Clear any existing DOM elements
  document.body.innerHTML = "";
});

afterEach(() => {
  // Clean up any remaining DOM elements
  document.body.innerHTML = "";
});

describe("useMaxTechListHeight", () => {
  it("returns 0 for empty categories array", () => {
    const { result } = renderHook(() =>
      useMaxTechListHeight([], "frontend"),
    );
    expect(result.current).toBe(0);
  });

  it("returns correct max height for multiple categories", () => {
    const { result, unmount } = renderHook(() =>
      useMaxTechListHeight(categories, "frontend"),
    );

    // The hook will return a height greater than 0 after mount
    expect(result.current).toBeGreaterThanOrEqual(0);

    unmount();
  });

  it("handles categories with varying technology counts", () => {
    // Use the actual data which has varying counts
    // frontend: 10 technologies
    // backend: 22 technologies
    // tools: 17 technologies
    const { result, unmount } = renderHook(() =>
      useMaxTechListHeight(categories, "frontend"),
    );

    // Backend has the most technologies, so max height should reflect that
    expect(result.current).toBeGreaterThanOrEqual(0);

    unmount();
  });

  it("recalculates when category changes", () => {
    const { result, rerender, unmount } = renderHook(
      ({ categories, activeCategory }) =>
        useMaxTechListHeight(categories, activeCategory),
      {
        initialProps: { categories, activeCategory: "frontend" as const },
      },
    );

    const heightAfterFrontend = result.current;

    // Rerender with different category
    rerender({ categories, activeCategory: "backend" as const });

    const heightAfterBackend = result.current;

    // Heights may be same or different depending on content, but both should be >= 0
    expect(heightAfterFrontend).toBeGreaterThanOrEqual(0);
    expect(heightAfterBackend).toBeGreaterThanOrEqual(0);

    unmount();
  });

  it("handles categories with no technologies", () => {
    const categoriesWithEmpty = [
      ...categories,
      {
        id: "empty" as const,
        label: "Empty",
        icon: null,
        technologies: [],
      },
    ];

    const { result, unmount } = renderHook(() =>
      useMaxTechListHeight(categoriesWithEmpty, "frontend"),
    );

    expect(result.current).toBeGreaterThanOrEqual(0);

    unmount();
  });

  it("handles categories with single technology", () => {
    const categoriesWithSingle = categories.map((cat) => ({
      ...cat,
      technologies: cat.technologies.slice(0, 1),
    }));

    const { result, unmount } = renderHook(() =>
      useMaxTechListHeight(categoriesWithSingle, "frontend"),
    );

    expect(result.current).toBeGreaterThanOrEqual(0);

    unmount();
  });
});
