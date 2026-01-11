// --- Libraries
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";

// --- Pages
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/product-details/ProductDetails";
import SpecialOffers from "../pages/home/special-offers/SpecialOffers";
import Cart from "../pages/cart/Cart";
import Error from "../pages/error/Error";
import Login from "../pages/auth/Login";

//--- Router
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {index: true, Component: Home},
      {path: "products", Component: Products},
      {path: "products/:id", Component: ProductDetails},
      {path: "special-offers/:id", Component: SpecialOffers},
      {path: "cart", Component: Cart},
      {path: "login", Component: Login},
      {path: "*", Component: Error},
    ],
  },
]);

// --- RootLayout (Main Component)
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
