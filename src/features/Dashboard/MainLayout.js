import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import DashboardMenu from "./DashboardMenu";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

const MainLayout = () => {
  const screenSize = useScreenSize();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 h-screen">
        <DashboardHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="pt-16 overflow-auto ">
          <DashboardMenu
            isOverlay={screenSize.width < 1024}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <Outlet />
        </div>
        <DashboardFooter />
      </div>
    </>
  );
};

export default MainLayout;
