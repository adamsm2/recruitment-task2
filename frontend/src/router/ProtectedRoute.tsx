import { FC, PropsWithChildren, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider.tsx";

const ProtectedRoute: FC<PropsWithChildren> = () => {
  const authContext = useContext(AuthContext);

  if (authContext.accessToken !== "") {
    return <Outlet />;
  } else {
    return <Navigate to={"/auth/login"} />;
  }
};

export default ProtectedRoute;