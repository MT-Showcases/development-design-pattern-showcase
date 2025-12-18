/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components - Theory
 *
 * ROLE:
 * - Reusable overview page component for pattern categories
 * - Displays category description and pattern cards
 *
 * PATTERNS USED:
 * - Presentational Component - Pure display logic
 * - Composition Pattern - Reusable across all categories
 *
 * NOTES FOR CONTRIBUTORS:
 * - Used by all category overview pages (creational, structural, behavioral)
 * - All styles in CategoryOverview.scss with BEM naming
 */

"use client";

import { Card, Typography, Row, Col } from 'antd';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import type { PatternTheory } from '@/lib/patternTheory';
import type { CategoryKey } from '@/lib/types';
import { PATTERN_CATEGORIES } from '@/lib/patternTheory';
import './CategoryOverview.scss';

const { Title, Paragraph } = Typography;

type PatternCategory = typeof PATTERN_CATEGORIES[keyof typeof PATTERN_CATEGORIES];

interface CategoryOverviewProps {
  category: PatternCategory;
  patterns: PatternTheory[];
  categoryKey: CategoryKey;
}

export default function CategoryOverview({ category, patterns, categoryKey }: CategoryOverviewProps) {
  return (
    <div className="category-overview">
      <div className="category-overview__container">
        <div className="category-overview__header">
          <div className="category-overview__icon">{category.icon}</div>
          <Title level={1} className="title-category !text-yellow-primary mb-3">
            {category.name.toUpperCase()} - PANORAMICA
          </Title>
          <Paragraph className="description-category !text-white">
            {category.description}
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {patterns.map((pattern) => (
            <Col xs={24} sm={24} md={12} lg={12} key={pattern.id}>
              <Link 
                href={`/theory/${categoryKey}/${pattern.id}`} 
                className="category-overview__card"
              >
                <Card hoverable>
                  <Card.Meta
                    title={
                      <span className="title-card !text-navy-dark flex items-center gap-2 mb-0">
                        {pattern.icon && <span>{pattern.icon}</span>}
                        {pattern.name}
                      </span>
                    }
                    description={
                      <>
                        <Paragraph className="description-card !text-gray-700">
                          {pattern.intent}
                        </Paragraph>
                        <div className="category-overview__card-cta">
                          <ArrowRightOutlined /> Approfondisci
                        </div>
                      </>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
