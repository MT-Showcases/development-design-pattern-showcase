/**
 * COMPONENT TYPE: Container
 * SECTION: UI Components - Navigation
 *
 * ROLE:
 * - Global navigation bar with dropdown menus for pattern categories
 * - Links to home, theory sections, and quiz game
 * - Responsive design for mobile and desktop
 *
 * PATTERNS USED:
 * - Ant Design Menu with SubMenu for dropdowns
 * - Next.js Link for client-side navigation
 * - BEM Convention for clean CSS naming
 *
 * NOTES FOR CONTRIBUTORS:
 * - Menu items dynamically generated from PATTERN_CATEGORIES
 * - Active route highlighting
 * - Sticky navbar on scroll
 * - All styles in Navbar.scss with BEM naming
 */

"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
    HomeOutlined,
    BookOutlined,
    TrophyOutlined,
    BuildOutlined,
    ToolOutlined,
    ThunderboltOutlined,
    AppstoreOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PATTERN_CATEGORIES } from "@/lib/patternTheory";
import { useState, useEffect } from "react";
import "./Navbar.scss";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    const [mobileSubmenuView, setMobileSubmenuView] = useState<string | null>(null);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset submenu view when dropdown closes
    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
        if (!keys.includes('theory')) {
            setMobileSubmenuView(null);
        }
    };

    const categoryIcons = {
        creational: <BuildOutlined />,
        structural: <ToolOutlined />,
        behavioral: <ThunderboltOutlined />,
    };

    // Generate menu items from pattern categories
    const theoryMenuItems = Object.entries(PATTERN_CATEGORIES).map(([key, category]) => ({
        key: `theory-${key}`,
        label: isMobile ? (
            <span onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileSubmenuView(key);
            }}>{category.name}</span>
        ) : (
            category.name
        ),
        icon: categoryIcons[key as keyof typeof categoryIcons],
        children: isMobile ? undefined : [
            // "Tutti i pattern" come primo elemento
            {
                key: `all-patterns-${key}`,
                label: (
                    <Link href={`/theory/${key}`}>
                        <AppstoreOutlined /> Tutti i pattern
                    </Link>
                ),
            },
            ...category.patterns.map((patternId) => ({
                key: `pattern-${patternId}`,
                label: (
                    <Link href={`/theory/${key}/${patternId}`}>
                        {patternId
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                    </Link>
                ),
            })),
        ],
    }));

    // Mobile: show pattern list when category is selected
    const getMobileTheoryItems = () => {
        if (!mobileSubmenuView) {
            return [
                {
                    key: "all-categories",
                    label: (
                        <Link href="/theory">
                            <AppstoreOutlined /> Tutte le categorie
                        </Link>
                    ),
                },
                ...theoryMenuItems,
            ];
        }

        // Show patterns for selected category
        const category = PATTERN_CATEGORIES[mobileSubmenuView as keyof typeof PATTERN_CATEGORIES];
        return [
            {
                key: "back",
                label: (
                    <span onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMobileSubmenuView(null);
                    }}>
                        <ArrowLeftOutlined /> Indietro
                    </span>
                ),
            },
            {
                key: `all-patterns-${mobileSubmenuView}`,
                label: (
                    <Link href={`/theory/${mobileSubmenuView}`}>
                        <AppstoreOutlined /> Tutti i pattern
                    </Link>
                ),
            },
            ...category.patterns.map((patternId) => ({
                key: `pattern-${patternId}`,
                label: (
                    <Link href={`/theory/${mobileSubmenuView}/${patternId}`}>
                        {patternId
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                    </Link>
                ),
            })),
        ];
    };

    const menuItems: MenuProps["items"] = [
        {
            key: "home",
            icon: <HomeOutlined />,
            label: <Link href="/">Home</Link>,
        },
        {
            key: "theory",
            icon: <BookOutlined />,
            label: "Teoria",
            children: isMobile ? getMobileTheoryItems() : [
                {
                    key: "all-categories",
                    label: (
                        <Link href="/theory">
                            <AppstoreOutlined /> Tutte le categorie
                        </Link>
                    ),
                },
                ...theoryMenuItems,
            ],
        },
        {
            key: "quiz",
            icon: <TrophyOutlined />,
            label: <Link href="/">Quiz Game</Link>,
        },
    ];

    // Determine selected key based on pathname
    const getSelectedKey = () => {
        if (pathname === "/") return "home";
        if (pathname.startsWith("/theory")) {
            const segments = pathname.split("/");
            if (segments.length === 4) {
                // /theory/category/pattern
                return `pattern-${segments[3]}`;
            }
            if (segments.length === 3) {
                // /theory/category - on mobile also select the category item
                if (isMobile && !mobileSubmenuView) {
                    return `theory-${segments[2]}`;
                }
                return `all-patterns-${segments[2]}`;
            }
            if (segments.length === 2) {
                // /theory
                return "all-categories";
            }
        }
        return "home";
    };

    return (
        <div className="navbar">
            <div className="navbar__container">
                <Menu
                    mode="horizontal"
                    selectedKeys={[getSelectedKey()]}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                    items={menuItems}
                    className="navbar__menu"
                    triggerSubMenuAction={isMobile ? "click" : "hover"}
                />
            </div>
        </div>
    );
}
