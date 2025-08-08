import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layout/main-layout";

const NotFound = lazy(() => import("@/pages/NotFound"));
const DashboardPage = lazy(() => import("@/features/dashboard"));
const LoginPage = lazy(() => import("@/features/auth/login"));
const UserListPage = lazy(() => import("@/features/users/views/user-list"));
const ProfilePage = lazy(() => import("@/features/settings/views/ProfilePage"));
const ProductListPage = lazy(() => import("@/features/products/components/product-list"));
const ProductDetailPage = lazy(() => import("@/features/products/components/product-detail"));
const MediaPage = lazy(() => import("@/features/media"));

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
        path: "/products",
        children:[
          {
            index:true,
            Component: ProductListPage,
          },
          {
            path: "/products/edit/:id",
            Component: ProductDetailPage,
          },
          {
            path: "/products/create",
            Component: ProductDetailPage,
          }
        ]
      },
      {
        path: "/categories",
        Component: UserListPage,
      },
      {
        path: "/media",
        Component: MediaPage,
      },
       {
        path: "/settings",
        children:[
          {
            index:true,
            Component: ProfilePage,
          },
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
