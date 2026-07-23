import React from "react";
import { SidebarLayout } from "./SidebarLayout";
import { Container } from "./Container";
import { PageHeader } from "./PageHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarLayout
      sidebar={
        <div className="p-6 space-y-4">
          <div className="text-xl font-semibold">App</div>
          <div className="text-neutral-600">Dashboard</div>
          <div className="text-neutral-600">Users</div>
          <div className="text-neutral-600">Settings</div>
        </div>
      }
    >
      <Container>
        <PageHeader
          title="Dashboard"
          description="Overview of your application"
        />
        {children}
      </Container>
    </SidebarLayout>
  );
}