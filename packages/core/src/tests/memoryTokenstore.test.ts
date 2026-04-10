import { MemoryTokenStore } from "../storage/MemoryTokenStore.js";
import { describe, it, expect } from "vitest";

describe("Memory Token Store", () => {
  it("should get and set an access token", () => {
    const store = new MemoryTokenStore();
    store.setAccessToken("test");
    expect(store.getAccessToken()).toBe("test");
  });

  it("should return null if no access token is set", () => {
    const store = new MemoryTokenStore();
    expect(store.getAccessToken()).toBeNull();
  });

  it("should clear the access token", () => {
    const store = new MemoryTokenStore();
    store.setAccessToken("test");
    store.clear();
    expect(store.getAccessToken()).toBeNull();
  });
});
