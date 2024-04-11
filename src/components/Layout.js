import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="mx-auto dark:bg-zinc-800/90 dark:text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
