import { forwardRef } from "react";
import type { ButtonProps, ButtonVariant } from "./Button.types";
import Spinner from "../Spinner/Spinner"; 
import { classNames } from "../utils/classNames";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-500  text-neutral-50 hover:bg-primary-600",
  secondary: "bg-secondary-500 text-neutral-50 hover:bg-secondary-600",
  outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
  ghost: "bg-transparent text-primary-500 hover:bg-primary-50",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", loading = false, disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          "px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner size="sm" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;