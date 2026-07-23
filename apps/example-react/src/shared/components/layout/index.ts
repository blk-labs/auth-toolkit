export { Container } from "./Container";
export type { ContainerProps } from "./Container";

export { Stack } from "./Stack";
export type { StackProps } from "./Stack";

export { Grid } from "./Grid";
export type { GridProps } from "./Grid";

export { PageHeader } from "./PageHeader";
export type { PageHeaderProps } from "./PageHeader";

export { SidebarLayout } from "./SidebarLayout";
export type { SidebarLayoutProps } from "./SidebarLayout";

export { default as AppLayout } from "./AppLayout";

//This file serves as a central export point for all layout components, allowing for cleaner and more organized imports throughout the application. Each component and its corresponding types are exported here, making it easier to manage and maintain the layout components in one place.
//Now i can import any of the layout components or their types from this file, rather than having to import them individually from their respective files. For example, I can now import the Container component and its props like this:
// import {
//   Container,
//   Stack,
//   Grid,
//   PageHeader,
//   SidebarLayout,
//   AppLayout,
// } from "@/shared/components/layout";