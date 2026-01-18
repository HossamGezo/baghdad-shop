// --- Libraries
import {Outlet} from "react-router";

// --- Components
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ScrollToTop from "../components/scroll-to-top/ScrollToTop";

// --- RootLayout (Main Component)
const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="custom-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
