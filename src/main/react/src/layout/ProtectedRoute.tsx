import {Navigate, useLocation} from "react-router-dom";
import {useAuthContext} from "../auth/context/useAuthContext.tsx";
import React, {PropsWithChildren} from "react";
import {useAxiosInterceptor} from "../services/axios/useAxiosInterceptor.tsx";

const ProtectedRoute: React.FC<PropsWithChildren> = ({children}) => {
  const context = useAuthContext();
  const location = useLocation();

  useAxiosInterceptor();

  if (!context.person) {
    return <Navigate to={"/login"} replace state={{from: location}} />
  }
  return children;
};

export default ProtectedRoute;