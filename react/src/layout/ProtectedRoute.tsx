import {Navigate, useLocation} from "react-router-dom";
import {useContextAuth} from "../auth/context/useContextAuth.tsx";

const ProtectedRoute = ({children}) => {
  const context = useContextAuth();
  const location = useLocation();

  if (!context.person) {
    return <Navigate to={"/login"} replace state={{from: location}} />
  }
  return children;
};

export default ProtectedRoute;