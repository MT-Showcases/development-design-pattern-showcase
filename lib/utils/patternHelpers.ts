/**
 * COMPONENT TYPE: Utility
 * SECTION: Data Helpers
 *
 * ROLE:
 * - Provide helper functions for pattern data retrieval
 * - Filter patterns by category
 * - Get pattern details by ID
 * - Extract category from pattern ID
 *
 * PATTERNS USED:
 * - Pure Functions - No side effects, deterministic
 * - Type Safety - Strong typing for all inputs/outputs
 *
 * NOTES FOR CONTRIBUTORS:
 * - All functions are pure and testable
 * - Import patterns from patternTheory.ts
 * - Add new helper functions here as needed
 */

import { patterns, type PatternTheory } from "@/lib/patternTheory";
import type { CategoryKey } from "@/lib/types";

/**
 * Get all patterns belonging to a specific category
 * @param category - The pattern category (creational, structural, behavioral, antipattern)
 * @returns Array of patterns in that category
 */
export function getPatternsByCategory(category: CategoryKey): PatternTheory[] {
    return Object.values(patterns).filter((p) => p.category === category);
}

/**
 * Get a single pattern by its ID
 * @param id - The pattern ID (e.g., "singleton", "factory-method")
 * @returns The pattern object or undefined if not found
 */
export function getPatternById(id: string): PatternTheory | undefined {
    return patterns[id];
}

/**
 * Extract the category from a pattern ID
 * @param id - The pattern ID
 * @returns The category string or undefined if pattern not found
 */
export function getCategoryFromPatternId(id: string): CategoryKey | undefined {
    const pattern = patterns[id];
    return pattern?.category;
}

/**
 * Get all patterns as an array
 * @returns Array of all patterns
 */
export function getAllPatterns(): PatternTheory[] {
    return Object.values(patterns);
}

/**
 * Check if a pattern ID exists
 * @param id - The pattern ID to check
 * @returns True if pattern exists, false otherwise
 */
export function patternExists(id: string): boolean {
    return id in patterns;
}

/**
 * Get pattern count by category
 * @param category - The pattern category
 * @returns Number of patterns in that category
 */
export function getPatternCountByCategory(category: CategoryKey): number {
    return getPatternsByCategory(category).length;
}

/**
 * Convert pattern name to URL slug
 * @param patternName - The pattern name (e.g., "Factory Method", "Singleton")
 * @returns URL-safe slug (e.g., "factory-method", "singleton")
 */
export function patternNameToSlug(patternName: string): string {
    return patternName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Get pattern by name (case-insensitive)
 * @param name - The pattern name (e.g., "Factory Method", "Singleton")
 * @returns The pattern object or undefined if not found
 */
export function getPatternByName(name: string): PatternTheory | undefined {
    const slug = patternNameToSlug(name);
    return patterns[slug];
}
