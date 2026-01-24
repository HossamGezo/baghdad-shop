// --- Libraries
import {Outlet} from "react-router";

// --- Local Files
import ScrollToTop from "../utils/ScrollToTop";

// --- Components
import Header from "./header/Header";
import Footer from "./footer/Footer";

// --- RootLayout (Main Component)
const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <ScrollToTop />
      <Header />
      <main className="custom-container flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
