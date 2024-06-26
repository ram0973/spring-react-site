import React from "react";
import AuthContext from "./AuthContext.tsx";

export function AuthProvider({children}: { children: React.ReactNode }) {
  const key = "webapp.auth"
  const [user, setUser] = React.useState<string | null>(getStoredUser(key))
  const isAuthenticated = !!user

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function getStoredUser(key: string) {
    return localStorage.getItem(key)
  }

  function setStoredUser(user: string | null) {
    if (user) {
      localStorage.setItem(key, user)
    } else {
      localStorage.removeItem(key)
    }
  }

  const logout = React.useCallback(async () => {
    await sleep(250)
    setStoredUser(null)
    setUser(null)
  }, [])

  const login = React.useCallback(async (username: string) => {
    await sleep(500)

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