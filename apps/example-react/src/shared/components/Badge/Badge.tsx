import { forwardRef } from "react";
import type { BadgeProps } from "./Badge.types";
import { classNames } from "../utils/classNames";

const colorMap: Record<NonNullable<BadgeProps["color"]>, string> = {
  primary: "bg-primary-500 text-neutral-50",
  secondary: "bg-secondary-500 text-neutral-50",
  success: "bg-success-500 text-neutral-50",
  danger: "bg-danger-500 text-neutral-50",
  neutral: "bg-neutral-300 text-neutral-900",
};

/**
 * @component
 * A small, inline label component for tagging, categorizing, or highlighting items.
 *
 * The Badge component renders as a styled span element with color variants and
 * supports custom styling through className prop.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to display inside the badge
 * @param {"primary" | "secondary" | "success" | "danger" | "neutral"} [props.color="primary"] -
 *   The color variant of the badge. Default is "primary".
 * @param {string} [props.className] - Optional CSS class name for additional styling
 *
 * @example
 * // Basic usage with default primary color
 * <Badge>New</Badge>
 *
 * @example
 * // Using different color variants
 * <Badge color="success">Active</Badge>
 * <Badge color="danger">Archived</Badge>
 * <Badge color="secondary">Draft</Badge>
 *
 * @example
 * // With custom className
 * <Badge color="primary" className="custom-style">Featured</Badge>
 *
 * @returns {React.ReactElement} The rendered badge component
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, color = "primary", className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={classNames(
          "px-2 py-0.5 rounded-full text-xs font-semibold",
          colorMap[color],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;