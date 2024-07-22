import { useContext, useEffect } from "react";
import { AuthContext } from "./store/AuthContextProvider.tsx";
import router from "./router/router.tsx";
import { RouterProvider } from "react-router-dom";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const initAuth = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        authContext.login(accessToken);
      }
    };
    initAuth();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
