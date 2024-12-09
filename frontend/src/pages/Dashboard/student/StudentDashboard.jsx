import React from "react";

import welcome from "../../../assets/dashboard/urban-welcome.svg";
import useUser from "../../../hook/useUser";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { currentUser } = useUser();
  return (
    <div className="w-full border min-h-screen flex items-center justify-center">
      <div>
        <div>
          <div className="flex items-center justify-center">
            <img
              src={welcome}
              alt=""
              className="w-[320px] h-[320px]"
              placeholder="blue"
            />
          </div>
          <h1 className="text-4xl text-center capitalize font-bold">
            Chào mừng{" "}
            <span className="text-secondary dark:text-red-500">
              {currentUser?.name}
            </span>{" "}
            đến với trang quản lý
          </h1>
          <p className="text-center text-base">
            <i>
              Đây là trang quản lý ban đầu, đội ngũ chúng tôi đang hoàn thiện nó
              !!
            </i>
          </p>
          <div className="flex items-center justify-center flex-col">
            <h2 className="font-bold">Truy cập nhanh</h2>
            <div className="flex items-center justify-center my-4 gap-3 flex-wrap">
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-2 py-1">
                <Link to={"/dashboard/my-errol"}>Khóa học đã tham gia</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-2 py-1">
                <Link to={"/dashboard/my-selected"}>Khóa học đã chọn</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-2 py-1">
                <Link to={"/dashboard/my-payment"}>Lịch sử thanh toán</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-2 py-1">
                <Link to={"/dashboard/apply-instructor"}>
                  Trở thành chuyên gia
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
