import { WebStorageTokenStore } from "../storage/WebStorageTokenStore.js";
import { describe, it, expect, vi } from "vitest";

describe("Web Storage Token Store", () => {
  const createMockStorage = () => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  });

  it("should interact with the provided storage engine", () => {
    const mockStorage = createMockStorage();
    const store = new WebStorageTokenStore("auth_key", mockStorage);

    store.setAccessToken("jwt-content");
    expect(mockStorage.setItem).toHaveBeenCalledWith("auth_key", "jwt-content");

    mockStorage.getItem.mockReturnValue("jwt-content");
    expect(store.getAccessToken()).toBe("jwt-content");
  });

  it("should handle token removal", () => {
    const mockStorage = createMockStorage();
    const store = new WebStorageTokenStore("auth_key", mockStorage);

    store.clear();
    expect(mockStorage.removeItem).toHaveBeenCalledWith("auth_key");
  });

  it("should return null when storage throws an error", () => {
    const mockStorage = createMockStorage();
    mockStorage.getItem.mockImplementation(() => {
      throw new Error("Security Error");
    });

    const store = new WebStorageTokenStore("auth_key", mockStorage);
    expect(store.getAccessToken()).toBeNull();
  });
});
