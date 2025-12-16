import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllContests from "../pages/AllContests/AllContests";
import ExtraSection from "../pages/ExtraSection/ExtraSection";
import ErrorPage from "../components/Shared/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import Participated from "../pages/Dashboard/NormalUser/Participated";
import Winnings from "../pages/Dashboard/NormalUser/Winnings";
import AddContest from "../pages/Dashboard/ContestCreator/AddContest";
import CreatedContests from "../pages/Dashboard/ContestCreator/CreatedContests";
import SubmittedTasks from "../pages/Dashboard/ContestCreator/SubmittedTasks";
import EditContest from "../pages/Dashboard/ContestCreator/EditContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import Profile from "../pages/Dashboard/ForAll/Profile";
import PrivateRoute from "./PrivateRoute";
import CreatorRoute from "./CreatorRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contests",
        element: <AllContests></AllContests>,
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails></ContestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/extra-section",
        element: <ExtraSection></ExtraSection>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div className="flex justify-center items-center text-primary font-bold text-5xl">
            Welcome to DashBoard
          </div>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/participated",
        element: (
          <PrivateRoute>
            <Participated></Participated>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/winnings",
        element: (
          <PrivateRoute>
            <Winnings></Winnings>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/add-contest",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <AddContest></AddContest>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/created-contests",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <CreatedContests></CreatedContests>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/submitted-tasks",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <SubmittedTasks></SubmittedTasks>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/edit-contest",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <EditContest></EditContest>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-contests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageContests></ManageContests>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
