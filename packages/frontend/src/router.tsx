import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import DefaultLayout from "./layouts/Default";
import Logout from "./pages/Logout";
import Landing from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

export default router;
