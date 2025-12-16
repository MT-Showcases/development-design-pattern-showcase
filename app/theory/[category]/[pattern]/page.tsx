/**
 * DYNAMIC ROUTE: Pattern Detail
 * PATH: /theory/[category]/[pattern]
 * 
 * ROLE:
 * - Dynamic route for all pattern detail pages
 * - Uses PatternLayout component
 * - Generates static pages for all patterns at build time
 *
 * PATTERNS USED:
 * - Nested Dynamic Route Segments (Next.js 15)
 * - Static Site Generation with generateStaticParams
 */

import { notFound } from 'next/navigation';
import { getPatternsByCategory, getPatternById } from '@/lib/utils/patternHelpers';
import PatternLayout from '@/components/theory/PatternLayout/PatternLayout';
import type { CategoryKey } from '@/lib/types';

interface PageProps {
  params: Promise<{
    category: string;
    pattern: string;
  }>;
}

// Generate static pages for all patterns at build time
export function generateStaticParams() {
  const categories: CategoryKey[] = ['creational', 'structural', 'behavioral', 'antipattern'];
  const paths: { category: string; pattern: string }[] = [];

  categories.forEach((category) => {
    const patterns = getPatternsByCategory(category);
    patterns.forEach((pattern) => {
      paths.push({
        category,
        pattern: pattern.id,
      });
    });
  });

  return paths;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { pattern: patternId } = await params;
  const pattern = getPatternById(patternId);
  
  if (!pattern) {
    return {
      title: 'Pattern non trovato',
    };
  }

  return {
    title: `${pattern.name} - ${pattern.category.charAt(0).toUpperCase() + pattern.category.slice(1)} Pattern`,
    description: pattern.intent,
  };
}

export default async function PatternPage({ params }: PageProps) {
  const { category, pattern: patternId } = await params;
  const categoryKey = category as CategoryKey;
  
  // Validate category exists
  if (!['creational', 'structural', 'behavioral', 'antipattern'].includes(categoryKey)) {
    notFound();
  }

  const pattern = getPatternById(patternId);

  // Validate pattern exists and matches category
  if (!pattern || pattern.category !== categoryKey) {
    notFound();
  }

  return <PatternLayout pattern={pattern} />;
}
