import { AuthManager, MemoryTokenStore } from "@auth-toolkit/core";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
};

export const demoAdmin: AdminUser = {
  id: "admin-001",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  role: "admin",
};

// Keep one manager for both routes. Replace this mock renewal handler when a
// backend refresh endpoint is available.
export const authManager = new AuthManager<AdminUser>(new MemoryTokenStore(), {
  onRefresh: async () => ({ accessToken: `demo-renewed-${crypto.randomUUID()}` }),
});
