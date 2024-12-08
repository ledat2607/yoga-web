import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Instructor from "../pages/Instructor/Instructor";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Login from "../pages/User/Login";
import SignUp from "../pages/User/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignleClass from "../pages/Classes/SignleClass";
import DashboardLayout from "../layout/DashboardLayout";
import MangeUser from "../pages/Admin/MangeUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      { path: "/instructor", element: <Instructor /> },
      { path: "/classes", element: <Classes /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },

      {
        path: "/class/:id",
        element: <SignleClass />,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/class/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/admin-home",
        element: <Dashboard />,
        index: true,
      },
      { path: "/dashboard/manage-user", element: <MangeUser /> },
    ],
  },
]);
