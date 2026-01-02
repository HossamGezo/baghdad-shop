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
      <div className="custom-container">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
