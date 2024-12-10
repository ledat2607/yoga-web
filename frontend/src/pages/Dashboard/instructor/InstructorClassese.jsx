import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";

import moment from "moment";
import useUser from "../../../hook/useUser";

const InstructorClasses = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => {
        setClasses(res.data);
        setFilteredClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, [isLoading]);

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredClasses(classes);
    } else {
      setFilteredClasses(classes.filter((cls) => cls.status === filterStatus));
    }
  }, [filterStatus, classes]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          Quản lý các <span className="text-secondary">khóa học</span>
        </h1>
        <div>
          <p className="text-[12px] text-center">
            Bạn có thể xem được tất cả các khóa học của bạn tại đây
          </p>
        </div>
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          Tất cả
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("pending")}
        >
          Đang gửi yêu cầu
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === "checking"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("checking")}
        >
          Đang kiểm tra
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === "approved"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("approved")}
        >
          Đã duyệt
        </button>
      </div>

      {/* Danh sách khóa học */}
      <div>
        {filteredClasses.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            Không có khóa học nào.
          </div>
        ) : (
          <div>
            {filteredClasses.map((cls, index) => (
              <div key={index}>
                <div className="bg-white flex rounded-lg shadow p-4 gap-4 border-b-2 w-[90%] cursor-pointer hover:shadow-md hover:shadow-slate-600 hover:-translate-y-2 duration-300 hover:border-blue-500 mx-auto">
                  <div>
                    <img
                      src={cls.image}
                      alt=""
                      className="h-[200px] w-[300px] rounded-2xl object-cover"
                    />
                  </div>
                  <div className="w-full">
                    <h2 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2">
                      {cls.name}
                    </h2>
                    <div className="flex gap-4">
                      <div>
                        <h1 className="font-bold mb-3">Các thông tin khác:</h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">
                            Tổng số học viên đăng ký:{" "}
                          </span>
                          {cls.totalEnrolled ? cls.totalEnrolled : 0}{" "}
                        </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">
                            Tổng số chỗ còn trống:{" "}
                          </span>
                          {cls.availableSeats ? cls.availableSeats : 0}{" "}
                        </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">Trạng thái: </span>
                          <span
                            className={`font-bold ${
                              cls.status === "pending"
                                ? "text-orange-500"
                                : cls.status === "checking"
                                ? "text-yellow-500"
                                : cls.status === "approved"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {cls.status}
                          </span>
                        </h1>
                      </div>
                      <div>
                        <h1 className="font-bold mb-3">...</h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">Giá: {cls.price} $</span>
                        </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">Ngày đăng: </span>
                          <span className="">
                            {cls.submitted
                              ? moment(cls.submitted).format("MMMM Do YYYY")
                              : ""}
                          </span>
                        </h1>
                      </div>
                      <div className="w-1/3 flex flex-col gap-3">
                        <h1 className="font-bold mb-3">Chức năng</h1>
                        <button
                          className="px-3 bg-green-500 font-bold hover:translate-x-2 duration-300 py-1 text-white w-full rounded-lg"
                          onClick={() => handleFeedBack(cls._id)}
                        >
                          Xem các phản hổi
                        </button>
                        <button
                          className="px-3 bg-yellow-500 font-bold hover:translate-x-2 duration-300 py-1 text-white w-full rounded-lg"
                          onClick={() =>
                            navigate(`/dashboard/add-class`, {
                              state: { item: cls },
                            })
                          }
                        >
                          Cập nhật
                        </button>
                        <button
                          className="px-3 bg-red-500 bg-opacity-50 hover:opacity-100 hover:bg-red-500 hover:translate-x-2 duration-300 font-bold py-1 text-white w-full rounded-lg"
                          onClick={() => handleFeedBack(cls._id)}
                        >
                          Xóa khóa học
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorClasses;
