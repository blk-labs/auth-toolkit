import { forwardRef } from "react";
import type { EmptyStateProps } from "./EmptyState.types";
import { classNames } from "../utils/classNames";

/**
 * @component
 * A centered message component displayed when there is no data to show.
 *
 * The EmptyState component provides a visually centered layout for displaying
 * a message when a list, table, or section has no content. It supports an optional
 * icon, title, and description with flexible customization.
 *
 * @param {Object} props - Component props
 * @param {string} [props.title="No data available"] - The main heading text displayed in the empty state.
 *   Default is "No data available".
 * @param {string} [props.description] - Optional descriptive text displayed below the title
 * @param {React.ReactNode} [props.icon] - Optional icon or element to display above the title.
 *   Can be any React component or element.
 * @param {string} [props.className] - Optional CSS class name for additional styling
 *
 * @example
 * // Basic empty state with default title
 * <EmptyState />
 *
 * @example
 * // Empty state with custom title and description
 * <EmptyState
 *   title="No results found"
 *   description="Try adjusting your search filters or criteria"
 * />
 *
 * @example
 * // Empty state with icon (using an SVG or icon component)
 * <EmptyState
 *   icon={<EmptyBoxIcon size={48} />}
 *   title="No items"
 *   description="Your shopping cart is empty. Start adding items!"
 * />
 *
 * @example
 * // Empty state with custom styling
 * <EmptyState
 *   title="No data available"
 *   description="Come back later"
 *   className="min-h-screen"
 * />
 *
 * @returns {React.ReactElement} The rendered empty state component
 */
const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title = "No data available", description, icon, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "flex flex-col items-center justify-center p-6 text-center",
          className
        )}
        {...props}
      >
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-neutral-600">{description}</p>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export default EmptyState;