import type { Meta, StoryObj } from "@storybook/react";
import { SidebarLayout } from "./SidebarLayout";
import { PageHeader } from "../PageHeader/PageHeader";
import { Container } from "../Container/Container";

const meta: Meta<typeof SidebarLayout> = {
  title: "Layout/SidebarLayout",
  component: SidebarLayout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarLayout>;

export const Default: Story = {
  render: () => (
    <SidebarLayout
      sidebar={
        <div className="p-6 space-y-4">
          <div className="font-semibold text-lg">Logo</div>
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
      </Container>
    </SidebarLayout>
  ),
};