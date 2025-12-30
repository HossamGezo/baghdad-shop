// --- Libraries
import {Outlet} from "react-router";

// --- Components
import Header from "./header/Header";
import Footer from "./footer/Footer";

// --- RootLayout (Main Component)
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
