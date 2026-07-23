import React from "react";
import { classNames } from "../../utils/classNames";

export interface SidebarLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  sidebarWidth?: string; // optional override
}

export function SidebarLayout({
  sidebar,
  sidebarWidth = "w-64",
  className,
  children,
  ...props
}: SidebarLayoutProps) {
  return (
    <div
      className={classNames(
        "flex min-h-screen bg-neutral-50",
        className
      )}
      {...props}
    >
      {/* Sidebar */}
      <aside
        className={classNames(
          "hidden md:flex flex-col border-r border-neutral-200 bg-white",
          sidebarWidth
        )}
      >
        {sidebar}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}