// --- Libraries
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// --- Pages
import RootLayout from "@layouts/RootLayout";
import Home from "@pages/home/Home";
import NotFound from "@pages/error/NotFound";

// --- Lazy Loading Pages
// - Regular Pages
const Electronics = React.lazy(() => import("@pages/electronics/Electronics"));
const Men = React.lazy(() => import("@pages/men/Men"));
const Women = React.lazy(() => import("@pages/women/Women"));
const Kitchen = React.lazy(() => import("@pages/kitchen/Kitchen"));
const Supermarket = React.lazy(() => import("@pages/supermarket/Supermarket"));
const Automotive = React.lazy(() => import("@pages/automotive/Automotive"));
const ProductDetails = React.lazy(
  () => import("@pages/product-details/ProductDetails"),
);
const Cart = React.lazy(() => import("@pages/cart/Cart"));
// - Auth Pages
const Login = React.lazy(() => import("@pages/auth/Login"));
const Register = React.lazy(() => import("@pages/auth/Register"));
const ResetPassword = React.lazy(() => import("@pages/auth/ResetPassword"));
// - Profile Pages
const ProfileLayout = React.lazy(() => import("@pages/profile/ProfileLayout"));
const AccountOverview = React.lazy(
  () => import("@pages/profile/AccountOverview"),
);
const CustomerOrders = React.lazy(
  () => import("@pages/profile/CustomerOrders"),
);
const AddressBookEdit = React.lazy(
  () => import("@pages/profile/AddressBookEdit"),
);
const AccountDetailsEdit = React.lazy(
  () => import("@pages/profile/AccountDetailsEdit"),
);
const Checkout = React.lazy(() => import("@pages/checkout/Checkout"));
// - Admin Pages
const AdminLayout = React.lazy(() => import("@pages/admin/AdminLayout"));
const Dashboard = React.lazy(() => import("@pages/admin/Dashboard"));
const ProductsList = React.lazy(() => import("@/pages/admin/ProductsList"));
const Orders = React.lazy(() => import("@pages/admin/Orders"));
const Users = React.lazy(() => import("@pages/admin/Users"));
const UserEditPage = React.lazy(() => import("@pages/admin/UserEditPage"));
const AddProduct = React.lazy(() => import("@pages/admin/AddProduct"));

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
      { path: "supermarket", Component: Supermarket },
      { path: "automotive", Component: Automotive },
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
          { path: "orders", Component: CustomerOrders },
          { path: "address/edit", Component: AddressBookEdit },
          { path: "account/edit", Component: AccountDetailsEdit },
        ],
      },
      // - Checkout
      { path: "checkout", Component: Checkout },
      // --- NotFound Page
      { path: "*", Component: NotFound },
    ],
  },
  // - Admin
  {
    path: "admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "products", Component: ProductsList },
      { path: "add-product", Component: AddProduct },
      { path: "products/edit/:category/:id", Component: AddProduct },
      { path: "orders", Component: Orders },
      { path: "users", Component: Users },
      { path: "users/edit/:id", Component: UserEditPage },
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
