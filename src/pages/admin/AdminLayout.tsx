// --- Libraries
import { Outlet } from "react-router";

// --- React Icons
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

// --- Main Component
const AdminLayout = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <HiMiniBars3CenterLeft />
      </header>
      <div className="grid grid-cols-12">
        {/* Side Bar */}
        <aside className="col-span-2 border-2 border-red-500 h-screen">
          Side Bar
        </aside>

        {/* Main Content */}
        <main className="col-span-10 border-3 border-purple-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
