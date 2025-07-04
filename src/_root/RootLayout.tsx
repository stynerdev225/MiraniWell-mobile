import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex relative bg-dark-1">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full overflow-auto justify-center">
        <div className="w-full max-w-screen-xl px-4 md:px-8 py-4 md:py-8 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-primary-700/5 pointer-events-none"></div>
          <Outlet />
        </div>
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
