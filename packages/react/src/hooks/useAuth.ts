import { useContext } from "react";
import { AuthContext, AuthContextValue } from "../context/AuthContext";

export function useAuth<User = unknown>() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
        "Wrap your application with <AuthProvider>."
    );
  }

  return context as AuthContextValue<User>;
}