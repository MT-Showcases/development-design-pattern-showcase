/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display category selection button with icon and label
 * - Handle selected state with visual feedback
 * - Provide hover effects for better UX
 *
 * PATTERNS USED:
 * - Presentational component (props only)
 * - Tailwind CSS for layout and basic styling
 * - SCSS + BEM only for complex hover/selected states
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep this component stateless (no internal state)
 * - Use Tailwind for 80% of styling
 * - SCSS only for multi-property hover states
 * - Icon from Ant Design icons
 */

import React from "react";
import "./CategoryButton.scss";

interface CategoryButtonProps {
    icon: React.ReactNode;
    label: string;
    selected?: boolean;
    onClick: () => void;
    fullWidth?: boolean;
}

export default function CategoryButton({
    icon,
    label,
    selected = false,
    onClick,
    fullWidth = false,
}: CategoryButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                category-button
                ${selected ? "category-button--selected" : ""}
                ${fullWidth ? "col-span-full" : ""}
                flex flex-col items-center gap-2 p-6
                font-semibold text-base text-navy-dark
                bg-white border-2 border-navy-light rounded-lg
                cursor-pointer transition-all
            `}
        >
            <div className="category-button__icon text-2xl text-yellow-primary">
                {icon}
            </div>
            <span>{label}</span>
        </button>
    );
}
