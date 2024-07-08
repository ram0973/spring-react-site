import {Navigate, useLocation} from "react-router-dom";
import {useContextAuth} from "../auth/context/useContextAuth.tsx";
import React, {PropsWithChildren} from "react";

const ProtectedRoute: React.FC<PropsWithChildren> = ({children}) => {
  const context = useContextAuth();
  const location = useLocation();

  if (!context.person) {
    return <Navigate to={"/login"} replace state={{from: location}} />
  }
  return children;
};

export default ProtectedRoute;