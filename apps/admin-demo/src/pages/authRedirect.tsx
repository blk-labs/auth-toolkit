import { PageLoader } from "../components/Loader";
import useSession from "../hooks/useSession";
import { Navigate } from "react-router-dom";

export default function AuthRedirect() {
  const { session, isLoading, error } = useSession();

  

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <Navigate to={"/login"} replace />;
  }

  if (session) {
    if (session.role === "admin") {
      return <Navigate to={"/dashboard"} replace />;
    }

    return <Navigate to={"/user"} replace />;
  }

  return null;
}
