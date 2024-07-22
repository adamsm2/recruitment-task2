import { createContext, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { AuthContextType } from "./AuthContext.types.ts";

export const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  login: () => "",
  logout: () => "",
});

const AuthContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [accessToken, setAccessToken] = useState("");

  const login = useCallback((token: string) => {
    setAccessToken(token);
  }, []);

  const logout = useCallback(() => {
    setAccessToken("");
  }, []);

  const contextValue = useMemo(() => ({
    accessToken,
    login,
    logout,
  }), [accessToken, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;