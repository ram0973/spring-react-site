import React from "react";
import AuthContext from "./AuthContext.tsx";
import useResponseInterceptor from "../axios/useResponseInterceptor.ts";

const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const key = "webapp.auth"
  const [user, setUser] = React.useState<string | null>(getStoredUser(key))
  const isAuthenticated = !!user

  // const interceptorReady = useResponseInterceptor(function(response) {
  //   return response;
  // }, function(error) {
  //   if (user && error.response.status === 403) {
  //     logout();
  //   }
  //   throw(error);
  // }, [user]);

  function getStoredUser(key: string) {
    return localStorage.getItem(key)
  }

  function setStoredUser(user: string | null) {
    if (user) {
      localStorage.setItem(key, user)
    }
    localStorage.removeItem(key)
  }

  const logout = React.useCallback(() => {
    setStoredUser(null)
    setUser(null)
  }, [])

  const login = React.useCallback( (username: string) => {
    setStoredUser(username)
    setUser(username)
  }, [])

  React.useEffect(() => {
    setUser(getStoredUser(key))
  }, [])

  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;