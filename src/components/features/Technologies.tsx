import { useCallback, useState } from "react";
import { categories, type TechnologyCategory } from "../../data/technologies";
import { useMaxTechListHeight } from "../../hooks/useMaxTechListHeight";

export function Technologies() {
    const [activeCategory, setActiveCategory] = useState<
        TechnologyCategory["id"]
    >("frontend");

    const activeData = categories.find((cat) => cat.id === activeCategory);

    const handleCategoryChange = useCallback(
        (id: TechnologyCategory["id"]) => setActiveCategory(id),
        []
    );

    // Calculate max height across all category technology lists
    const maxHeight = useMaxTechListHeight(categories, activeCategory);

    return (
        <div className="w-full" data-testid="technologies-container">
            <div className="grid md:grid-cols-[320px_1fr] gap-6 md:gap-8 lg:gap-12">
                {/* Left side - Category bubbles */}
                {/* max-w-[240px] is two w-28 Bubbles (2x112px) plus one gap-4
                    (16px), so phones get two Bubbles per row. */}
                <div
                    className="relative flex flex-row flex-wrap md:flex-col max-w-[240px] md:max-w-none max-md:mx-auto gap-4 md:gap-8 justify-center items-center md:items-stretch"
                    data-testid="category-bubbles"
                >
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            data-testid={`category-bubble-${category.id}`}
                            onClick={() => handleCategoryChange(category.id)}
                            onMouseEnter={() =>
                                handleCategoryChange(category.id)
                            }
                            onFocus={() => handleCategoryChange(category.id)}
                            aria-pressed={activeCategory === category.id}
                            className={`
                relative flex flex-col items-center justify-center gap-1.5 md:gap-2
                w-28 h-28 md:w-44 md:h-44
                rounded-full
                transition-all duration-300 ease-out
                ${
                    activeCategory === category.id
                        ? "bg-gradient-to-br from-[var(--sage-green)] to-[var(--forest-green)] text-white shadow-[0_8px_24px_rgba(74,103,65,0.3),inset_0_2px_8px_rgba(255,255,255,0.2),inset_0_-4px_12px_rgba(0,0,0,0.1)] scale-105"
                        : "bg-gradient-to-br from-[var(--soft-beige)] to-[#E5D4BB] text-[var(--warm-brown)] shadow-[0_4px_16px_rgba(139,111,71,0.15),inset_0_2px_6px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(139,111,71,0.2),inset_0_2px_6px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.08)] hover:scale-102"
                }
                ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}
              `}
                        >
                            <div
                                className="relative z-10 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
                                aria-hidden="true"
                            >
                                {category.icon}
                            </div>
                            <span className="text-sm md:text-lg lg:text-xl font-medium relative z-10">
                                {category.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right side - Technology grid */}
                <div
                    className="min-h-[250px] md:min-h-[400px]"
                    data-testid="technology-grid"
                    style={{ minHeight: `${maxHeight}px` }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                        {activeData?.technologies.map((tech, index) => (
                            <a
                                href={tech.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={`${activeCategory}-${tech.name}`}
                                data-testid={`tech-card-${tech.name}`}
                                className="
                  flex flex-row items-center gap-3 md:gap-4
                  p-3 md:p-4 rounded-xl border-2 border-[var(--border)]
                  bg-white
                  transition-all duration-300 ease-out
                  hover:scale-105 hover:shadow-lg hover:border-[var(--sage-green)]
                  focus-visible:scale-105 focus-visible:shadow-lg focus-visible:border-[var(--sage-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage-green)] focus-visible:ring-offset-2
                  cursor-pointer
                "
                                style={{
                                    animation: `fadeIn 0.4s ease-out ${index * 0.05}s both`,
                                }}
                            >
                                <div
                                    className="text-[var(--sage-green)] flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
                                    aria-hidden="true"
                                >
                                    {tech.icon}
                                </div>
                                <span className="text-sm md:text-base lg:text-lg">
                                    {tech.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
