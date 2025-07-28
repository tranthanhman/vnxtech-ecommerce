import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layout/main-layout";

const NotFound = lazy(() => import("@/pages/NotFound"));
const DashboardPage = lazy(() => import("@/features/dashboard/DashboardPage"));
const LoginPage = lazy(() => import("@/features/auth/views/LoginPage"));
const UserListPage = lazy(() => import("@/features/users/views/UserListPage"));
const ProfilePage = lazy(() => import("@/features/settings/views/ProfilePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
      {
        path: "/users",
        Component: UserListPage,
      },
       {
        path: "/settings",
        children:[
          {
            index:true,
            Component: ProfilePage,
          },
          {
            index:true,
            Component: ProfilePage,
          }
        ]
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
