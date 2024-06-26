import React from "react";

export interface AuthContext {
  isAuthenticated: boolean
  login: (username: string) => Promise<void>
  logout: () => Promise<void>
  user: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

export default AuthContext;