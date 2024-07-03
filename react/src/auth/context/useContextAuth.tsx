import React from "react";
import {AuthContext} from "./AuthContext.tsx";
import {AuthContextType} from "./AuthContextType";

export const useContextAuth = () => {
  const context = React.useContext<AuthContextType>(AuthContext)
  if (!context) {
    throw new Error('useContextAuth must be used within an AuthProvider')
  }
  return context
}
