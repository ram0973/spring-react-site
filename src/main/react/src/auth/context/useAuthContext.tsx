import React from "react";
import {AuthContext} from "./AuthContext.tsx";
import {AuthContextType} from "./AuthContextType";

export const useAuthContext = () => {
  const context = React.useContext<AuthContextType>(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
