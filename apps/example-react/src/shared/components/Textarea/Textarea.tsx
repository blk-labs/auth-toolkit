import { forwardRef } from "react";
import type { TextareaProps } from "./Textarea.types";
import { classNames } from "../utils/classNames";

/**
 * @component
 * A multi-line text input field with optional label and error display.
 *
 * The Textarea component provides a form input for capturing multi-line text
 * with integrated label and error messaging. It supports all standard textarea
 * HTML attributes and includes disabled state styling.
 *
 * @param {Object} props - Component props extending TextareaHTMLAttributes
 * @param {string} [props.label] - Optional label text displayed above the textarea
 * @param {string} [props.error] - Optional error message displayed below the textarea in red.
 *   When provided, the textarea border color changes to danger color.
 * @param {boolean} [props.disabled] - If true, disables the textarea input and reduces opacity
 * @param {string} [props.className] - Optional CSS class name for additional styling
 * @param {any} [props...] - All standard TextareaHTMLAttributes are supported
 *   (e.g., placeholder, rows, cols, onChange, onFocus, etc.)
 *
 * @example
 * // Basic textarea with label
 * <Textarea label="Comments" placeholder="Enter your comments here..." />
 *
 * @example
 * // Textarea with error message
 * <Textarea
 *   label="Description"
 *   error="This field is required"
 *   placeholder="Please provide a description"
 * />
 *
 * @example
 * // Disabled textarea
 * <Textarea
 *   label="Notes"
 *   disabled
 *   defaultValue="This field is disabled"
 * />
 *
 * @example
 * // With custom rows and onChange handler
 * <Textarea
 *   label="Feedback"
 *   placeholder="Share your feedback..."
 *   rows={5}
 *   onChange={(e) => handleChange(e.target.value)}
 * />
 *
 * @returns {React.ReactElement} The rendered textarea component
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, disabled, className, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 text-sm font-medium text-neutral-700">{label}</label>}
        <textarea
          ref={ref}
          className={classNames(
            "px-3 py-2 rounded-md border text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none",
            error ? "border-danger-500" : "border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
            className
          )}
          disabled={disabled}
          {...props}
        />
        {error && <span className="mt-1 text-xs text-danger-500">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;