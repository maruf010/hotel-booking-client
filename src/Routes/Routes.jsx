import { createBrowserRouter } from "react-router";
import Root from "../MainLayout/Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import UpdateProfile from "../Pages/updateProfile";
import ForgetPassword from "../Pages/ForgetPassword";
import AllRooms from "../Pages/AllRooms";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/profile',
                Component: Profile
            },
            {
                path: '/updateProfile',
                Component: UpdateProfile
            },
            {
                path: '/forget-password',
                Component: ForgetPassword
            },
            {
                path: '/allRooms',
                Component: AllRooms
            }
        ]
    },
]);