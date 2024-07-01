import React, {useMemo} from "react";
import AuthContext from "./AuthContext.tsx";
import useLocalStorage from "./useLocalStorage.tsx";

const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const key = "webapp.auth"
  const [user, setUser] = useLocalStorage(key, null);

  const login = React.useCallback((data) => {
    setUser(data);
  }, [setUser]);

  const logout = React.useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;