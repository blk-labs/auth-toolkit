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

  it("throws error when fetch is not available and no adapter provided", () => {
    // Create a custom adapter that simulates missing fetch
    const failingAdapter: FetchAdapter = () => {
      throw new Error("No fetch implementation found. Provide a fetchAdapter to createHttpClient or ensure global fetch is available (Node 18+, Cloudflare Workers, Bun, modern browsers).");
    };
    
    expect(() => failingAdapter("https://api.example.com/test")).toThrow("No fetch implementation found. Provide a fetchAdapter");
  });

  it("createFetchAdapter returns the provided function", () => {
    const customFetch = vi.fn();
    const adapter = createFetchAdapter(customFetch);
    expect(adapter).toBe(customFetch);
  });
});