import { AuthManager, MemoryTokenStore } from "@auth-toolkit/core";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
};

export const demoAdmin: DemoUser = {
  id: "admin-001",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  role: "admin",
};

export const demoMember: DemoUser = {
  id: "member-001",
  name: "Maya Chen",
  email: "maya.chen@example.com",
  role: "member",
};

// Keep one manager for both routes. Replace this mock renewal handler when a
// backend refresh endpoint is available.
export const authManager = new AuthManager<DemoUser>(new MemoryTokenStore(), {
  onRefresh: async () => ({ accessToken: `demo-renewed-${crypto.randomUUID()}` }),
});
