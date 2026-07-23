import { forwardRef } from "react";
import type { SelectProps } from "./Select.types";
import { classNames } from "../utils/classNames";

/**
 * @component
 * A dropdown select input field with optional label and error display.
 *
 * The Select component provides a form input for selecting from predefined options
 * with integrated label and error messaging. It supports all standard select
 * HTML attributes and includes disabled state styling.
 *
 * @param {Object} props - Component props extending SelectHTMLAttributes
 * @param {Option[]} props.options - Array of options to display in the dropdown.
 *   Each option must have 'value' and 'label' properties.
 * @param {string} [props.label] - Optional label text displayed above the select
 * @param {string} [props.error] - Optional error message displayed below the select in red.
 *   When provided, the select border color changes to danger color.
 * @param {boolean} [props.disabled] - If true, disables the select input and reduces opacity
 * @param {string} [props.className] - Optional CSS class name for additional styling
 * @param {any} [props...] - All standard SelectHTMLAttributes are supported
 *   (e.g., value, onChange, onFocus, defaultValue, etc.)
 *
 * @example
 * // Basic select with options
 * const options = [
 *   { value: "option1", label: "Option 1" },
 *   { value: "option2", label: "Option 2" },
 *   { value: "option3", label: "Option 3" }
 * ];
 * <Select label="Choose an option" options={options} />
 *
 * @example
 * // Select with error message
 * <Select
 *   label="Status"
 *   options={statusOptions}
 *   error="Please select a valid status"
 * />
 *
 * @example
 * // Select with onChange handler
 * <Select
 *   label="Category"
 *   options={categoryOptions}
 *   onChange={(e) => handleCategoryChange(e.target.value)}
 *   value={selectedCategory}
 * />
 *
 * @example
 * // Disabled select
 * <Select
 *   label="Read-only field"
 *   options={options}
 *   disabled
 *   value="option1"
 * />
 *
 * @returns {React.ReactElement} The rendered select component
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, disabled, className, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 text-sm font-medium text-neutral-700">{label}</label>}
        <select
          ref={ref}
          className={classNames(
            "px-3 py-2 rounded-md border text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-danger-500" : "border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
            className
          )}
          disabled={disabled}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="mt-1 text-xs text-danger-500">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;