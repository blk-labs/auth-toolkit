import { forwardRef } from "react";
import type { InputProps } from "./Input.types";
import { classNames } from "../utils/classNames";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, disabled, className, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 text-sm font-medium text-neutral-700">{label}</label>}
        <input
          ref={ref}
          className={classNames(
            "px-3 py-2 rounded-md border text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
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

Input.displayName = "Input";

export default Input;