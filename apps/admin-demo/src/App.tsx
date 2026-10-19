import {
  AuthProvider,

} from "@blk-auth-toolkit/react";
import { RouterProvider } from "react-router-dom";
import { authManager } from "./auth";
import { router } from "./routes";
import QueryProvider from "./providers/QueryProvider";

export function App() {
  return (
    <AuthProvider authManager={authManager}>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </AuthProvider>
  );
}