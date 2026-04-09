import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.ts";

export function useAuth<User = unknown>() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
        "Wrap your application with <AuthProvider>."
    );
  }

  return context as typeof context & { user: User | null };
}