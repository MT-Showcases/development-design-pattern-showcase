/**
 * COMPONENT TYPE: Page
 * SECTION: Home
 *
 * ROLE:
 * - Home page showing pattern categories overview
 * - Entry point for exploring design patterns
 * - Display design principles, GoF patterns, and anti-patterns
 *
 * PATTERNS USED:
 * - Grid layout for category cards
 * - Static rendering (no client state)
 *
 * NOTES FOR CONTRIBUTORS:
 * - Main entry point of the application
 * - Shows all pattern categories with counts
 */

"use client";

import { Typography } from "antd";
import CategoryCard from "@/components/theory/CategoryCard/CategoryCard";
import { PATTERN_CATEGORIES } from "@/lib/patternTheory";

const { Title, Paragraph } = Typography;

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-120px)] bg-navy-dark py-20 px-6 md:py-16 md:px-4">
            <div className="max-w-screen-xl mx-auto">
                {/* Design Principles Section */}
                <div className="text-center mb-16 md:mb-10">
                    <Title className="title-primary !text-yellow-primary mb-4">
                        Principi di Progettazione
                    </Title>
                    <Paragraph className="subtitle !text-white m-0">
                        SOLID, DRY, KISS, YAGNI • Le fondamenta del buon codice
                    </Paragraph>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-12 md:gap-4">
                    <CategoryCard
                        name="Principi di Progettazione"
                        description={PATTERN_CATEGORIES.principles.description}
                        icon={PATTERN_CATEGORIES.principles.icon}
                        patternCount={PATTERN_CATEGORIES.principles.patterns.length}
                        href="/theory/principles"
                        color="#1890ff"
                    />
                </div>

                {/* Design Patterns Section */}
                <div className="text-center mb-16 mt-16 md:mb-10">
                    <Title className="title-primary !text-yellow-primary mb-4">Design Patterns</Title>
                    <Paragraph className="subtitle !text-white m-0">
                        Gang of Four • 23 Pattern Classici
                    </Paragraph>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
                    <CategoryCard
                        name="Creational"
                        description={PATTERN_CATEGORIES.creational.description}
                        icon={PATTERN_CATEGORIES.creational.icon}
                        patternCount={PATTERN_CATEGORIES.creational.patterns.length}
                        href="/theory/creational"
                        color="#ffc107"
                    />
                    <CategoryCard
                        name="Structural"
                        description={PATTERN_CATEGORIES.structural.description}
                        icon={PATTERN_CATEGORIES.structural.icon}
                        patternCount={PATTERN_CATEGORIES.structural.patterns.length}
                        href="/theory/structural"
                        color="#ffc107"
                    />
                    <CategoryCard
                        name="Behavioral"
                        description={PATTERN_CATEGORIES.behavioral.description}
                        icon={PATTERN_CATEGORIES.behavioral.icon}
                        patternCount={PATTERN_CATEGORIES.behavioral.patterns.length}
                        href="/theory/behavioral"
                        color="#ffc107"
                    />
                </div>

                {/* Anti-Patterns Section */}
                <div className="text-center mb-16 mt-16 md:mb-10">
                    <Title className="title-primary !text-yellow-primary mb-4">Anti-Pattern</Title>
                    <Paragraph className="subtitle !text-white m-0">
                        Cosa NON fare • Errori comuni da evitare
                    </Paragraph>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-12 md:gap-4">
                    <CategoryCard
                        name="Anti-Pattern"
                        description={PATTERN_CATEGORIES.antipattern.description}
                        icon={PATTERN_CATEGORIES.antipattern.icon}
                        patternCount={PATTERN_CATEGORIES.antipattern.patterns.length}
                        href="/theory/antipattern"
                        color="#ff1744"
                    />
                </div>
            </div>
        </div>
    );
}
