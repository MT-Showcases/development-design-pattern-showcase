/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components - Navigation
 *
 * ROLE:
 * - Display breadcrumb navigation based on current route
 * - Show hierarchy: Home > Theory > Category > Pattern
 *
 * PATTERNS USED:
 * - Ant Design Breadcrumb component
 * - Dynamic breadcrumb generation from pathname
 *
 * NOTES FOR CONTRIBUTORS:
 * - Automatically generates breadcrumb from URL segments
 * - Handles pattern name formatting (kebab-case to Title Case)
 */

"use client";

import { Breadcrumb as AntBreadcrumb, Select } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { PATTERN_CATEGORIES } from "@/lib/patternTheory";
import { getPatternsByCategory } from "@/lib/utils/patternHelpers";
import "./Breadcrumb.scss";

export default function Breadcrumb() {
    const pathname = usePathname();
    const router = useRouter();
    const isTheorySection = pathname.startsWith("/theory");

    // Add/remove 'has-breadcrumb' class to document element
    useEffect(() => {
        if (isTheorySection) {
            document.documentElement.classList.add("has-breadcrumb");
        } else {
            document.documentElement.classList.remove("has-breadcrumb");
        }

        return () => {
            document.documentElement.classList.remove("has-breadcrumb");
        };
    }, [isTheorySection]);

    // Don't show breadcrumb if not in theory section
    if (!isTheorySection) {
        return null;
    }

    const generateBreadcrumbs = () => {
        const segments = pathname.split("/").filter(Boolean);
        const breadcrumbs = [
            {
                title: (
                    <Link href="/">
                        <HomeOutlined /> Home
                    </Link>
                ),
            },
        ];

        if (segments.length === 0) return breadcrumbs;

        // /theory
        if (segments[0] === "theory") {
            breadcrumbs.push({
                title:
                    segments.length === 1 ? (
                        <span>Teoria Design Patterns</span>
                    ) : (
                        <Link href="/">Teoria Design Patterns</Link>
                    ),
            });

            // /theory/category
            if (segments[1]) {
                const category = segments[1] as keyof typeof PATTERN_CATEGORIES;
                const categoryInfo = PATTERN_CATEGORIES[category];

                breadcrumbs.push({
                    title:
                        segments.length === 2 ? (
                            <span>
                                {categoryInfo.icon} {categoryInfo.name}
                            </span>
                        ) : (
                            <Link href={`/theory/${category}`}>
                                {categoryInfo.icon} {categoryInfo.name}
                            </Link>
                        ),
                });

                // /theory/category/pattern
                if (segments[2]) {
                    const patternId = segments[2];
                    const patterns = getPatternsByCategory(category);

                    breadcrumbs.push({
                        title: (
                            <Select
                                value={patternId}
                                onChange={(value) =>
                                    router.push(`/theory/${category}/${value}`)
                                }
                                variant="outlined"
                                size="middle"
                                className="breadcrumb__pattern-select"
                            >
                                {patterns.map((pattern) => (
                                    <Select.Option key={pattern.id} value={pattern.id}>
                                        {pattern.icon && (
                                            <span style={{ marginRight: 8 }}>
                                                {pattern.icon}
                                            </span>
                                        )}
                                        {pattern.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        ),
                    });
                }
            }
        }

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
        <div className="breadcrumb">
            <div className="breadcrumb__container">
                <AntBreadcrumb items={breadcrumbs} />
            </div>
        </div>
    );
}
