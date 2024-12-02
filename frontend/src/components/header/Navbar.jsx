import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";

const navLinks = [
  { name: "Trang chủ", route: "/" },
  { name: "Giảng viên", route: "/instructor" },
  { name: "Lớp học", route: "/classes" },
];
const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const Navbar = () => {
  const [navBg, setNavbg] = useState("bg-[#15151580]");
  const user = false;
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  //toggle menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement()
  }, []);

  return (
    <nav>
      <div className="lg:w-[95%] mx-auto sm:pl-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl inline-flex gap-4 items-center font-bold">
              Yoga - master{" "}
              <img src="./yoga-logo.png" alt="" className="w-8 h-8" />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px]">
              Quick Explore
            </p>
          </div>

          {/*Mobile*/}
          {/*Navigation links*/}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      className={({ isActive, isPending }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  {" "}
                  <NavLink
                    to={"/login"}
                    className={({ isActive, isPending }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <LightModeIcon /> / <DarkModeIcon />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
