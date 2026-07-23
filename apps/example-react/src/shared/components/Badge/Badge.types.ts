export interface BadgeProps {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "danger" | "neutral";
  className?: string;
}