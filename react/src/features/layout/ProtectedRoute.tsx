import {useAuth} from "../context/auth/useAuth.tsx";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const context = useAuth();
  const location = useLocation();

  if (!context.user) {
    return <Navigate to={"/login"} replace state={{from: location}} />
  }
  return children;
};

export default ProtectedRoute;