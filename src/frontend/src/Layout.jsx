import React from "react";
import Navbar from "./components/section/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
