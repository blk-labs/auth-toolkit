import type { Meta, StoryObj } from "@storybook/react";
import EmptyState from "./EmptyState";
import Badge from "../Badge";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = { args: {} };
export const WithDescription: Story = {
  args: { description: "There is currently nothing to display here." },
};
export const WithIcon: Story = {
  args: { icon: <Badge color="secondary">Icon</Badge> },
};
export const CustomTitle: Story = { args: { title: "Nothing Found" } };