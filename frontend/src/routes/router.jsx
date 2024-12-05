import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Instructor from "../pages/Instructor/Instructor";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Login from "../pages/User/Login";
import SignUp from "../pages/User/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
    ],
  },
]);
