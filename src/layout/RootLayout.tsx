// --- Libraries
import {Outlet} from "react-router";

// --- Components
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ScrollToTop from "../components/scroll-to-top/ScrollToTop";

// --- RootLayout (Main Component)
const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
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
