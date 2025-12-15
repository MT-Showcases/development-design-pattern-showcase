/**
 * DYNAMIC ROUTE: Category Overview
 * PATH: /theory/[category]
 * 
 * ROLE:
 * - Dynamic route for all pattern categories (creational, structural, behavioral)
 * - Uses CategoryOverview component
 * - Generates static pages for all categories at build time
 *
 * PATTERNS USED:
 * - Dynamic Route Segments (Next.js 15)
 * - Static Site Generation with generateStaticParams
 */

import { notFound } from 'next/navigation';
import { PATTERN_CATEGORIES, getPatternsByCategory } from '@/lib/patternTheory';
import CategoryOverview from '@/components/theory/CategoryOverview/CategoryOverview';
import type { CategoryKey } from '@/lib/types';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static pages for all categories at build time
export function generateStaticParams() {
  return [
    { category: 'creational' },
    { category: 'structural' },
    { category: 'behavioral' },
    { category: 'antipattern' },
  ];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const categoryKey = category as CategoryKey;
  const categoryData = PATTERN_CATEGORIES[categoryKey];
  
  if (!categoryData) {
    return {
      title: 'Categoria non trovata',
    };
  }

  return {
    title: `${categoryData.name} - Design Pattern Showcase`,
    description: categoryData.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryKey = category as CategoryKey;
  
  // Validate category exists
  if (!['creational', 'structural', 'behavioral', 'antipattern'].includes(categoryKey)) {
    notFound();
  }

  const categoryData = PATTERN_CATEGORIES[categoryKey];
  const patterns = getPatternsByCategory(categoryKey);

  return (
    <CategoryOverview 
      category={categoryData}
      patterns={patterns}
      categoryKey={categoryKey}
    />
  );
}
