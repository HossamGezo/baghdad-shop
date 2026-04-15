// --- Libraries
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// --- Local Components
import ProtectedRoute from "@components/protected-route/ProtectedRoute";
import PublicRoute from "@components/public-route/PublicRoute";

// --- Pages
import RootLayout from "@layouts/RootLayout";
import Home from "@pages/home/Home";
import NotFound from "@pages/error/NotFound";

// --- Lazy Loading Pages

// - Public Pages
const Electronics = lazy(() => import("@pages/electronics/Electronics"));
const Men = lazy(() => import("@pages/men/Men"));
const Women = lazy(() => import("@pages/women/Women"));
const Kitchen = lazy(() => import("@pages/kitchen/Kitchen"));
const Supermarket = lazy(() => import("@pages/supermarket/Supermarket"));
const Automotive = lazy(() => import("@pages/automotive/Automotive"));
const ProductDetails = lazy(() => import("@pages/product-details/ProductDetails"));
const Cart = lazy(() => import("@pages/cart/Cart"));

// - Auth Pages
const Login = lazy(() => import("@pages/auth/Login"));
const Register = lazy(() => import("@pages/auth/Register"));
const ResetPassword = lazy(() => import("@pages/auth/ResetPassword"));

// - Profile Pages
const ProfileLayout = lazy(() => import("@pages/profile/ProfileLayout"));
const AccountOverview = lazy(() => import("@pages/profile/AccountOverview"));
const CustomerOrders = lazy(() => import("@pages/profile/CustomerOrders"));
const AddressBookEdit = lazy(() => import("@pages/profile/AddressBookEdit"));
const AccountDetailsEdit = lazy(() => import("@pages/profile/AccountDetailsEdit"));
const Checkout = lazy(() => import("@pages/checkout/Checkout"));

// - Admin Pages
const AdminLayout = lazy(() => import("@pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("@pages/admin/Dashboard"));
const ProductsList = lazy(() => import("@pages/admin/ProductsList"));
const Orders = lazy(() => import("@pages/admin/Orders"));
const Users = lazy(() => import("@pages/admin/Users"));
const UserEditPage = lazy(() => import("@pages/admin/UserEditPage"));
const AddProduct = lazy(() => import("@pages/admin/AddProduct"));

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
      {
        element: <PublicRoute />,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
          { path: "reset-password", Component: ResetPassword },
        ],
      },

      // - Profile
      {
        element: <ProtectedRoute />,
        children: [
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
        ],
      },
      // --- NotFound Page
      { path: "*", Component: NotFound },
    ],
  },

  // - Admin
  {
    element: <ProtectedRoute adminOnly={true} />,
    children: [
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
    ],
  },
]);

// --- Main Component
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
