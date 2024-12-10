import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Instructor from "../pages/Instructor/Instructor";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Login from "../pages/User/Login";
import SignUp from "../pages/User/SignUp";
import SignleClass from "../pages/Classes/SignleClass";
import DashboardLayout from "../layout/DashboardLayout";
import MangeUser from "../pages/Admin/MangeUser";
import StudentDashboard from "../pages/Dashboard/student/StudentDashboard";
import ErrolledClasses from "../pages/Dashboard/student/ErrolledClasses";
import SelectedClass from "../pages/Dashboard/student/SelectedClass";
import ApplyInstructor from "../pages/Dashboard/student/ApplyInstructor";
import Payment from "../pages/Dashboard/student/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/student/Payment/PaymentHistory";
import InstructorHome from "../pages/Dashboard/instructor/InstructorHome";
import AddClass from "../pages/Dashboard/instructor/AddClass";
import InstructorClassese from "../pages/Dashboard/instructor/InstructorClassese";
import AdminHome from "../pages/Admin/AdminHome";

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
        element: <AdminHome />,
        index: true,
      },
      //admin
      { path: "/dashboard/manage-user", element: <MangeUser /> },

      //user
      { path: "/dashboard/student-cp", element: <StudentDashboard /> },
      { path: "/dashboard/my-errol", element: <ErrolledClasses /> },
      { path: "/dashboard/my-selected", element: <SelectedClass /> },
      { path: "/dashboard/my-payment", element: <PaymentHistory /> },
      { path: "/dashboard/apply-instructor", element: <ApplyInstructor /> },
      { path: "/dashboard/user/payment", element: <Payment /> },

      //instructor
      { path: "/dashboard/instructor-cp", element: <InstructorHome /> },
      { path: "/dashboard/add-class", element: <AddClass /> },
      { path: "/dashboard/my-classese", element: <InstructorClassese /> },
    ],
  },
]);
