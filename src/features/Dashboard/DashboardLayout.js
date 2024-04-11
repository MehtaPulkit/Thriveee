import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import DashboardMenu from "./DashboardMenu";
import useScreenSize from "../../hooks/useScreenSize";

const DashboardLayout = () => {
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

export default DashboardLayout;
