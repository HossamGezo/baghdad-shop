// --- Libraries
import { useState } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router";

// --- Components
import AdminHeader from "@pages/admin/AdminHeader";
import Sidebar from "@pages/admin/AdminSidebar";
import Spinner from "@components/spinner/Spinner";

// --- Utils
import { cn } from "@utils/cn";

// --- Main Component
const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  // --- Return JSX
  return (
    <div className="bg-primary h-dvh overflow-hidden flex flex-col">
      {/* --- Header --- */}
      <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* --- Dashboard ---- */}
      <div className={cn("h-[calc(100%-76px)] sm:h-[calc(100%-84px)] flex relative")}>
        {/* Side Bar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <main
          className={cn(
            "p-5 h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] overflow-auto custom-scrollbar bg-[#F7F7F7] flex-1",
          )}
        >
          <Suspense
            fallback={
              <div className="flex-1 h-full flex justify-center items-center">
                <Spinner />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
