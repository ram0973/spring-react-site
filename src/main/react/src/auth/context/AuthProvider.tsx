import React, {PropsWithChildren, useMemo} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {useLocalStorage} from "./useLocalStorage.tsx";

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const key = "webapp.auth"
  const [person, setPerson] = useLocalStorage(key, null);

  const login = React.useCallback((data: object) => {
    setPerson(data);
  }, [setPerson]);

  const logout = React.useCallback(() => {
    setPerson(null);
  }, [setPerson]);

  const value = useMemo(
    () => ({
      person: person,
      login,
      logout,
    }),
    [login, logout, person]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
