import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.tsx";
import AuthRoute from "./AuthRoute.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import TasksPage from "../pages/TasksPage.tsx";
import RootLayout from "../components/layout/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/auth",
        element: (
          <AuthRoute>
          </AuthRoute>
        ),
        children: [
          { path: "/auth/login", element: <LoginPage /> },
        ],
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute>
          </ProtectedRoute>
        ),
        children: [
          { path: "/user/tasks", element: <TasksPage /> },
        ],
      },
      { path: "/", element: <Navigate to="/auth/login" /> },
      { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },
]);

export default router;