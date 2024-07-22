import { AuthContext } from "../../store/AuthContextProvider.tsx";
import { useContext } from "react";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    authContext.logout();
  };

  if (authContext.accessToken === "") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between py-2 px-8 backdrop-blur-lg shadow-lg"
        aria-label="Global">
        <div className="flex flex-1 justify-end">
          <button onClick={handleLogout}
                  className="text-sm font-semibold text-gray-500 leading-6 hover:text-aquaGreen-100">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;