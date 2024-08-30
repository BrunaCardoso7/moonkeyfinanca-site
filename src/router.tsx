import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register";
import DashboardPage from "./pages/dashboad";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/signIn",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <Register />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
