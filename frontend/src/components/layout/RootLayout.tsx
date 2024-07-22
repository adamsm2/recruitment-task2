import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar.tsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position={"top-center"} />
      <Outlet />
    </>
  );
};

export default RootLayout;