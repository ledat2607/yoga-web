import React, { useState } from "react";

import useAuth from "../hook/useAuth";
import useUser from "../hook/useUser";

import { BiHomeAlt, BiLogOutCircle } from "react-icons/bi";
import { IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
import { TbBrandAppleArcade } from "react-icons/tb";
import { MdExplore, MdOfflineBolt, MdPendingActions } from "react-icons/md";
import { FaHome, FaUser } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import logo from "../assets/yoga-logo.png";
import Scroll from "../hook/useScroll";
import { HashLoader } from "react-spinners";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    title: "Quản lý chung",
  },
  {
    to: "/dashboard/manage-user",
    icon: <FaUser className="text-2xl" />,
    title: "Quản lý người dùng",
  },
  {
    to: "/dashboard/manage-class",
    icon: <BsFillPostcardFill className="text-2xl" />,
    title: "Quản lý khóa học",
  },
  {
    to: "/dashboard/manage-application",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    title: "Quản lý ứng dụng",
  },
];

const instructorNavlinks = [
  {
    to: "/dashboard/instructor-cp",
    icon: <FaHome className="text-2xl" />,
    title: "Trang chủ",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdExplore className="text-2xl" />,
    title: "Thêm mới khóa học",
  },
  {
    to: "/dashboard/my-classese",
    icon: <IoSchoolSharp className="text-2xl" />,
    title: "Khóa học của tôi",
  },
];

const student = [
  {
    to: "/dashboard/student-cp",
    icon: <FaHome className="text-2xl" />,
    title: "Trang chủ",
  },
  {
    to: "/dashboard/my-errol",
    icon: <MdExplore className="text-2xl" />,
    title: "Khóa học đã tham gia",
  },
  {
    to: "/dashboard/my-selected",
    icon: <IoSchoolSharp className="text-2xl" />,
    title: "Các khóa học đã chọn",
  },
  {
    to: "/dashboard/my-payment",
    icon: <MdPendingActions className="text-2xl" />,
    title: "Lịch sử thanh toán",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <IoMdDoneAll className="text-2xl" />,
    title: "Trở thành chuyên gia",
  },
];
const lastMenuItems = [
  {
    to: "/",
    icon: <BiHomeAlt className="text-2xl" />,
    title: "Trang chủ",
  },
  {
    to: "/",
    icon: <MdOfflineBolt className="text-2xl" />,
    title: "Trending",
  },
];
const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;
  if (loader) {
    return (
      <div className="flex items-center justify-center w-[100vw] min-h-screen">
        <HashLoader color="#ff1949" size={50} />
      </div>
    );
  }
  const handleLogout = () => {
    logout();
    Swal.fire({
      title: "Bạn có chắc chắn đăng xuất",
      text: "Bạn sẽ không thể hoàn tất nếu xác nhận !!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, tôi muốn đang xuất",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "Đã đăng xuất",
          text: "Bạn đã đăng xuất thành công, nếu muốn tiếp tục hãy đăng nhập lại",
          icon: "success",
        });
      }
    });
    navigate("/");
  };
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-80 overflow-hidden" : "w-[80px] overflow-auto "
        } bg-purple-200 min-h-screen p-5 md:block hidden pt-8 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center">
          <img
            onClick={() => setOpen(!open)}
            src={logo}
            alt=""
            className={`cursor-pointer h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            onClick={() => setOpen(!open)}
            className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Yoga Master
          </h1>
        </div>
        {/**navigation */}
        {(role === "admin" || role === "instructor" || role === "user") && (
          <ul className="pt-6">
            <p
              className={`ml-3 uppercase text-xl text-gray-800 ${
                !open && "hidden"
              }`}
            >
              Danh mục
            </p>
            {(role === "admin"
              ? adminNavItems
              : role === "instructor"
              ? instructorNavlinks
              : student
            ).map((item, index) => (
              <li key={index} className="pt-2">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-2 font-bold duration-300 cursor-pointer ${
                      isActive
                        ? "bg-red-500 text-white rounded-2xl" // Active state styles
                        : "text-gray-600 dark:text-black hover:text-blue-500" // Default state styles
                    }`
                  }
                >
                  {item.icon}
                  {open && <span>{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <ul className="pt-6">
          <p
            className={`ml-3 uppercase text-xl text-gray-800 ${
              !open && "hidden"
            }`}
          >
            Phát triển
          </p>
          {lastMenuItems.map((item, index) => (
            <li key={index} className="pt-2">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 font-bold duration-300 cursor-pointer ${
                    isActive
                      ? "bg-red-500 text-white rounded-2xl" // Active state styles
                      : "text-gray-600 dark:text-black hover:text-blue-500" // Default state styles
                  }`
                }
              >
                {item.icon}
                {open && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => handleLogout()}
          className={`flex w-full items-center gap-4 p-2 font-bold duration-300 cursor-pointer 
            `}
        >
          <BiLogOutCircle className="text-[25px]" />
          Đăng xuất
        </button>
      </div>
      <div className="w-full">
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
