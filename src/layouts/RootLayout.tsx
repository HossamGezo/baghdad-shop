// --- Libraries
import { Suspense } from "react";
import { Outlet } from "react-router";

// --- Local Files
import ScrollToTop from "@components/scroll-to-top/ScrollToTop";

// --- Components
import Header from "@layouts/header/Header";
import Footer from "@layouts/footer/Footer";
import Spinner from "@components/spinner/Spinner";

// --- Main Component
const RootLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <ScrollToTop />
      <div className="min-h-screen flex-1 flex flex-col">
        <Header />
        <main className="custom-container flex-1 flex flex-col">
          <Suspense
            fallback={
              <div className="flex-1 flex justify-center items-center">
                <Spinner />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
