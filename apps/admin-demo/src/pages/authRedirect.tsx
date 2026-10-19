import { useAuth } from "@blk-auth-toolkit/react";
import { PageLoader } from "../components/Loader";
import { Navigate } from "react-router-dom";

export default function AuthRedirect() {
  const { user, status } = useAuth<User>();


  if(status === "loading"){
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (user.role === "admin") {
    return <Navigate to={"/admin"} replace />;
  }

  return <Navigate to={"/user"} replace />;
}
