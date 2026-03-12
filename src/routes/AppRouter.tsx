// --- Libraries
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// --- Pages
import RootLayout from "@layouts/RootLayout";
import Home from "@pages/home/Home";
import NotFound from "@pages/error/NotFound";

// --- Lazy Loading Pages
const Electronics = React.lazy(() => import("@pages/electronics/Electronics"));
const Men = React.lazy(() => import("@pages/men/Men"));
const Women = React.lazy(() => import("@pages/women/Women"));
const Kitchen = React.lazy(() => import("@pages/kitchen/Kitchen"));
const ProductDetails = React.lazy(
  () => import("@pages/product-details/ProductDetails"),
);
const Cart = React.lazy(() => import("@pages/cart/Cart"));
const Login = React.lazy(() => import("@pages/auth/Login"));
const Register = React.lazy(() => import("@pages/auth/Register"));
const ResetPassword = React.lazy(() => import("@pages/auth/ResetPassword"));
const ProfileLayout = React.lazy(() => import("@pages/profile/ProfileLayout"));
const AccountOverview = React.lazy(
  () => import("@pages/profile/AccountOverview"),
);
const Orders = React.lazy(() => import("@pages/profile/Orders"));
const AddressBookEdit = React.lazy(
  () => import("@pages/profile/AddressBookEdit"),
);
const AccountDetailsEdit = React.lazy(
  () => import("@pages/profile/AccountDetailsEdit"),
);

//--- Router
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // --- Public Pages
      { index: true, Component: Home },
      { path: "electronics", Component: Electronics },
      { path: "kitchen", Component: Kitchen },
      { path: "men", Component: Men },
      { path: "women", Component: Women },
      { path: "products/:category/:id", Component: ProductDetails },
      { path: "cart", Component: Cart },
      // --- Auth Pages
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "reset-password", Component: ResetPassword },
      // --- Protected Routes
      // - Profile
      {
        path: "profile",
        Component: ProfileLayout,
        children: [
          { index: true, Component: AccountOverview },
          { path: "orders", Component: Orders },
          { path: "address/edit", Component: AddressBookEdit },
          { path: "account/edit", Component: AccountDetailsEdit },
        ],
      },
      // --- NotFound Page
      { path: "*", Component: NotFound },
    ],
  },
]);

// --- Main Component
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
