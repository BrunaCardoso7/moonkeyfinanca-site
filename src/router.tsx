import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register";

export const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <Login/>,
  },
  {
    path: "/signUp",
    element: <Register/>,
  },
]);

export default function Router() {
    return <RouterProvider router={router} />
  }