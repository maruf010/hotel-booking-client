import { createBrowserRouter } from "react-router";
import Root from "../MainLayout/Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import UpdateProfile from "../Pages/updateProfile";
import ForgetPassword from "../Pages/ForgetPassword";
import AllRooms from "../Pages/AllRooms";
import AddRooms from "../Pages/AddRooms";
import RoomDetails from "../Pages/RoomDetails";
import MyBooking from "../Pages/MyBooking";
import MyAddRooms from "../Pages/MyAddRooms";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "../Contexts/PrivateRoute";
import Loading from "../components/Loading";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
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
                element: <AllRooms></AllRooms>
            },
            {
                path: '/rooms/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_baseurl}/rooms/${params.id}`),
                element: <RoomDetails></RoomDetails>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/addRooms',
                element: (
                    <PrivateRoute>
                        <AddRooms></AddRooms>
                    </PrivateRoute>
                ),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/myBooking',
                element: (
                    <PrivateRoute>
                        <MyBooking></MyBooking>
                    </PrivateRoute>
                ),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/myAddRooms',
                element: (
                    <PrivateRoute>
                        <MyAddRooms></MyAddRooms>
                    </PrivateRoute>
                ),
                hydrateFallbackElement: <Loading></Loading>
            }
        ]
    },
]);