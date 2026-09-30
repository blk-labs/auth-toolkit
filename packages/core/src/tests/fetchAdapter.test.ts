import { describe, it, expect, vi } from "vitest";
import { createHttpClient } from "../https.js";
import { MemoryTokenStore } from "../storage/MemoryTokenStore.js";
import { defaultFetchAdapter, createFetchAdapter } from "../fetch-adapter.js";

describe("Fetch Adapter", () => {
  it("uses global fetch by default", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ status: 200 });
    vi.stubGlobal("fetch", mockFetch);

    const store = new MemoryTokenStore();
    const client = createHttpClient({
      baseUrl: "https://api.example.com",
      storage: store,
      onRefresh: vi.fn(),
      onLogout: vi.fn(),
    });

    await client.request("/test");
    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/test", expect.any(Object));
  });

  it("uses custom fetch adapter when provided", async () => {
    const customFetch = vi.fn().mockResolvedValue({ status: 200 });

    const store = new MemoryTokenStore();
    const client = createHttpClient({
      baseUrl: "https://api.example.com",
      storage: store,
      onRefresh: vi.fn(),
      onLogout: vi.fn(),
      fetchAdapter: customFetch,
    });

    await client.request("/test");
    expect(customFetch).toHaveBeenCalledWith("https://api.example.com/test", expect.any(Object));
  });

  it("throws error when no fetch is available and no adapter provided", async () => {
    vi.stubGlobal("fetch", undefined);

    const store = new MemoryTokenStore();
    const client = createHttpClient({
      baseUrl: "https://api.example.com",
      storage: store,
      onRefresh: vi.fn(),
      onLogout: vi.fn(),
    });

    await expect(client.request("/test")).rejects.toThrow("No fetch implementation found");
  });

  it("createFetchAdapter returns the provided function", () => {
    const customFetch = vi.fn();
    const adapter = createFetchAdapter(customFetch);
    expect(adapter).toBe(customFetch);
  });
});