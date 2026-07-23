import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Badge" } };
export const Primary: Story = { args: { children: "Primary", color: "primary" } };
export const Secondary: Story = { args: { children: "Secondary", color: "secondary" } };
export const Success: Story = { args: { children: "Success", color: "success" } };
export const Danger: Story = { args: { children: "Danger", color: "danger" } };
export const Neutral: Story = { args: { children: "Neutral", color: "neutral" } };