import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";

const MainLayout = () => {
  return (
    <main className="dark:bg-gray-700 overflow-hidden">
      <Navbar />
      <Outlet />
      <footer>Footer</footer>
    </main>
  );
};

export default MainLayout;
