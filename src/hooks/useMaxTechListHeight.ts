import { useEffect, useState } from "react";
import { TechnologyCategory } from "../data/technologies";

/**
 * Hook to calculate the maximum height required across all category technology lists.
 * Creates temporary DOM elements to measure each category's technology list height
 * and returns the maximum height to be used as min-height on the technology grid container.
 *
 * @param categories - Array of technology categories
 * @param activeCategory - The currently active category ID
 * @returns The maximum height across all categories
 */
export function useMaxTechListHeight(
  categories: TechnologyCategory[],
  activeCategory: string,
) {
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    // Only run in browser environment
    if (typeof document === "undefined") {
      return;
    }

    // Create a temporary container to measure heights
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.visibility = "hidden";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
    container.style.gap = "10px";
    container.style.padding = "0";
    container.style.margin = "0";
    container.style.width = "0";
    container.style.height = "0";

    let maxHeightValue = 0;

    categories.forEach((category) => {
      // Create a temporary grid item for each category
      const gridItem = document.createElement("div");
      gridItem.style.display = "contents";

      category.technologies.forEach((tech) => {
        const techItem = document.createElement("a");
        techItem.href = tech.link || "#";
        techItem.rel = "noopener noreferrer";
        techItem.className =
          "flex flex-row items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 border-[var(--border)] bg-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:border-[var(--sage-green)] focus-visible:scale-105 focus-visible:shadow-lg focus-visible:border-[var(--sage-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage-green)] focus-visible:ring-offset-2 cursor-pointer";
        techItem.style.opacity = "0";

        // Create icon element - handle ReactNode by creating a placeholder
        const iconDiv = document.createElement("div");
        iconDiv.className = "text-[var(--sage-green)] flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center";
        // For measurement purposes, we just need the layout to be consistent
        // The actual icon content doesn't affect height measurement significantly

        // Create name span
        const nameSpan = document.createElement("span");
        nameSpan.className = "text-sm md:text-base lg:text-lg";
        nameSpan.textContent = tech.name;

        techItem.appendChild(iconDiv);
        techItem.appendChild(nameSpan);
        gridItem.appendChild(techItem);
      });

      container.appendChild(gridItem);
      document.body.appendChild(container);

      // Measure the height after render
      const height = container.scrollHeight;

      if (height > maxHeightValue) {
        maxHeightValue = height;
      }

      // Remove the grid item for this category from container
      // but keep container in body for next category
      while (gridItem.lastChild) {
        gridItem.removeChild(gridItem.lastChild);
      }
      container.removeChild(gridItem);
    });

    setMaxHeight(maxHeightValue);

    // Cleanup
    return () => {
      if (container.parentNode) {
        document.body.removeChild(container);
      }
    };
  }, [categories, activeCategory]);

  return maxHeight;
}
