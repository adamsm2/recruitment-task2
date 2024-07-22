import { FC, PropsWithChildren, useContext } from "react";
import { AuthContext } from "../store/AuthContextProvider.tsx";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute: FC<PropsWithChildren> = () => {
  const authContext = useContext(AuthContext);

  if (authContext.accessToken === "") {
    return <Outlet />;
  } else {
    return <Navigate to={"/user/tasks"} />;
  }
};

export default AuthRoute;