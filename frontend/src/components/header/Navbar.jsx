import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import imgUser from "../../assets/home/girl.jpg";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import useUser from "../../hook/useUser";

const navLinks = [
  { name: "Trang chủ", route: "/" },
  { name: "Giảng viên", route: "/instructor" },
  { name: "Lớp học", route: "/classes" },
];
const theme = createTheme({
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
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useUser();
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(true);

  //toggle menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  //dark mode
  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //scroll
  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavbg(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black"
        );
      } else {
        setNavbg("");
      }
    } else {
      setNavbg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        } dark:text-white text-black`
      );
    }
  }, [scrollPosition]);

  {
    /*logout */
  }
  const handleLogout = () => {};
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"
      } ${
        isFixed ? "static" : "fixed"
      } top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:pl-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 cursor-pointer pl-7 md:pl-0 fle items-center"
          >
            <h1 className="text-2xl inline-flex gap-4 items-center font-bold dark:text-white">
              Yoga - master{" "}
              <img src="./yoga-logo.png" alt="" className="w-8 h-8" />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px] dark:text-white">
              Quick Explore
            </p>
          </div>

          {/*Mobile*/}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <FaBars className="h-6 w-6 hover:text-primary" />
            </button>
          </div>
          {/*Navigation links*/}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      style={{ whiteSpace: "nowrap" }}
                      to={link.route}
                      className={({ isActive, isPending }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "dark:text-white text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {/*User */}
                {user ? null : isLogin ? (
                  <li>
                    {" "}
                    <NavLink
                      to={"/register"}
                      className={({ isActive, isPending }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "dark:text-white text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary`
                      }
                    >
                      Đăng ký
                    </NavLink>
                  </li>
                ) : (
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
                                  ? "dark:text-white text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary`
                      }
                    >
                      Đăng nhập
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive, isPending }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "dark:text-white text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary`
                      }
                    >
                      Quản lý
                    </NavLink>
                  </li>
                )}

                {/*Img user */}
                {user && (
                  <li>
                    <img
                      src={user.img || imgUser}
                      alt=""
                      className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-all duration-300"
                    />
                  </li>
                )}

                {/*Logout button */}
                {user && (
                  <li>
                    <NavLink
                      to={"/logout"}
                      onClick={handleLogout}
                      className={
                        "font-bold px-2 py-2 bg-secondary text-white rounded-2xl shadow-xl"
                      }
                    >
                      Logout
                    </NavLink>
                  </li>
                )}

                {/*Switch theme */}
                <li>
                  <ThemeProvider theme={theme}>
                    <div
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="cursor-pointer"
                    >
                      {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
