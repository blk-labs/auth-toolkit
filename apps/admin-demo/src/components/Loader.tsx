export interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  color?: "primary" | "coral" | "mint" | "lilac" | "yellow";
  label?: string;
  className?: string;
}

export function Loader({
  size = "md",
  variant = "spinner",
  color = "primary",
  label,
  className = "",
}: LoaderProps): React.ReactElement {
  const sizeClasses = {
    sm: "loader-sm",
    md: "loader-md",
    lg: "loader-lg",
  };

  const colorClasses = {
    primary: "loader-primary",
    coral: "loader-coral",
    mint: "loader-mint",
    lilac: "loader-lilac",
    yellow: "loader-yellow",
  };

  const variantClasses = {
    spinner: "loader-spinner",
    dots: "loader-dots",
    pulse: "loader-pulse",
  };

  const baseClasses = `loader ${sizeClasses[size]} ${colorClasses[color]} ${variantClasses[variant]} ${className}`;

  if (variant === "spinner") {
    return (
      <div className={baseClasses} role="status" aria-live="polite" aria-label={label || "Loading"}>
        <svg className="loader-svg" viewBox="0 0 50 50" aria-hidden="true">
          <circle className="loader-track" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
          <circle className="loader-fill" cx="25" cy="25" r="20" fill="none" strokeWidth="4" strokeLinecap="round" />
        </svg>
        {label && <span className="loader-label">{label}</span>}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={baseClasses} role="status" aria-live="polite" aria-label={label || "Loading"}>
        <span className="loader-dot" aria-hidden="true" />
        <span className="loader-dot" aria-hidden="true" />
        <span className="loader-dot" aria-hidden="true" />
        {label && <span className="loader-label">{label}</span>}
      </div>
    );
  }

  return (
    <div className={baseClasses} role="status" aria-live="polite" aria-label={label || "Loading"}>
      <span className="loader-pulse-ring" aria-hidden="true" />
      <span className="loader-pulse-ring" aria-hidden="true" />
      <span className="loader-pulse-ring" aria-hidden="true" />
      {label && <span className="loader-label">{label}</span>}
    </div>
  );
}

export function PageLoader({ label = "Loading…" }: { label?: string }): React.ReactElement {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label={label}>
      <Loader size="lg" variant="spinner" color="primary" label={label} />
    </div>
  );
}

export function InlineLoader({ label }: { label?: string }): React.ReactElement {
  return <Loader size="sm" variant="spinner" color="primary" label={label} />;
}

export function ButtonLoader({ label = "Loading…" }: { label?: string }): React.ReactElement {
  return <Loader size="sm" variant="spinner" color="primary" label={label} />;
}