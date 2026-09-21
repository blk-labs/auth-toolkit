import { beforeEach, describe, expect, it } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { authManager } from "./auth";
import { navigateTo } from "./navigation";

describe("admin demo auth flow", () => {
  beforeEach(() => {
    authManager.logout();
    window.history.replaceState(null, "", "/login");
    window.sessionStorage.clear();
  });

  it("opens the dashboard with demo access and closes it after logout", async () => {
    const user = userEvent.setup();
    render(<App />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /enter as demo admin/i }));
    });
    await waitFor(() => expect(screen.getByRole("heading", { name: /who's in/i })).toBeTruthy());
    expect(window.location.pathname).toBe("/dashboard");
    expect(authManager.getState().status).toBe("authenticated");

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /log out/i }));
    });
    await waitFor(() => expect(window.location.pathname).toBe("/login"));
    expect(authManager.getState()).toEqual({ status: "unauthenticated", user: null });
    expect(screen.getByRole("heading", { name: /admin dashboard preview/i })).toBeTruthy();

    act(() => navigateTo("/dashboard"));
    await waitFor(() => expect(window.location.pathname).toBe("/login"));
    expect(screen.queryByRole("heading", { name: /who's in/i })).toBeNull();
  });
});
