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
import Profile from "../pages/Dashboard/NormalUser/Profile";
import AddContest from "../pages/Dashboard/ContestCreator/AddContest";
import CreatedContests from "../pages/Dashboard/ContestCreator/CreatedContests";
import SubmittedTasks from "../pages/Dashboard/ContestCreator/SubmittedTasks";
import EditContest from "../pages/Dashboard/ContestCreator/EditContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";

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
        element: <ContestDetails></ContestDetails>,
      },
      {
        path: "/extra-section",
        element: <ExtraSection></ExtraSection>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>
      }
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
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/participated",
        element: <Participated></Participated>,
      },
      {
        path: "/dashboard/winnings",
        element: <Winnings></Winnings>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/add-contest",
        element: <AddContest></AddContest>,
      },
      {
        path: "/dashboard/created-contests",
        element: <CreatedContests></CreatedContests>,
      },
      {
        path: "/dashboard/submitted-tasks",
        element: <SubmittedTasks></SubmittedTasks>,
      },
      {
        path: "/dashboard/edit-contest",
        element: <EditContest></EditContest>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/manage-contests",
        element: <ManageContests></ManageContests>,
      },
    ],
  },
]);
