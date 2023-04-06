import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const router = createBrowserRouter([{
    path: "/",
    element: <App />
}, {
    path: "/login",
    element: <Login />
}, {
    path: "/register",
    element: <Register />
}, 
{
    path: "/profile",
    element: <Profile/>
}])

export default router