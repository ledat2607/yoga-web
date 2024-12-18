import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hook/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../../ultities/provider/AuthProvider";
import useUser from "../../hook/useUser";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { toast } from "react-toastify";

const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [erroledClass, setErroledClass] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleHover = (index) => {
    setHoveredCard(index);
  };
  const handleSelect = (id) => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => setErroledClass(res.data))
      .catch((err) => {
        console.log(err);
      });

    if (!currentUser) {
      return toast.warning("Vui lòng đăng nhập !!");
    }

    axiosSecure
      .get(`/cart-item/${id}?email=${currentUser.email}`)
      .then((res) => {
        if (res.data?.classId === id) {
          return toast.warning(`Đã đăng ký vào khóa học này !!!`);
        } else if (erroledClass.find((item) => item.classes._id === id)) {
          return toast.success(`Đã tham gia khóa học thành công`);
        } else {
          const data = {
            classId: id,
            userEmail: currentUser.email,
            date: new Date(),
          };
          toast
            .promise(axiosSecure.post("/add-to-cart", data), {
              pending: "Đang thêm khóa học vào giỏ hàng...",
              success: "Thêm khóa học thành công!",
              error: "Thêm khóa học thất bại!",
            })
            .then((res) => {
              console.log(res.data);
              navigate(`/class/${id}`);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mt-20 pt-3 mb-20">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Khóa học
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90%] mx-auto">
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`relative rounded-2xl hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${
              cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-600 shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="relative h-48">
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                  hoveredCard === index ? "opacity-60" : ""
                }`}
              />
              <img
                src={cls.image}
                alt=""
                className="object-cover w-full h-full overflow-hidden"
              />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    title={
                      cls.role === "admin" || cls.role === "instructor"
                        ? "Instructor/Admin can't able to select"
                        : cls.availableSeats < 1
                        ? "Không còn vị trí"
                        : ""
                    }
                    onClick={() => handleSelect(cls._id)}
                    className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary font-semibold duration-300 rounded-2xl hover:bg-rose-800 border-2 border-white"
                    disabled={
                      cls.role === "admin" ||
                      cls.role === "instructor" ||
                      cls.availableSeats < 1
                    }
                  >
                    Thêm khóa học
                  </button>
                </div>
              </Transition>
            </div>

            <div className="px-6 py-2 items-start">
              <h3 className="text-gray-700 dark:text-white font-bold hover:text-blue-500 hover:dark:text-red-500 truncate">
                {cls.name}
              </h3>

              <h3 className="text-[13px] font-bold tracking-tight flex items-center gap-3 dark:text-gray-300">
                Huấn luyện viên:{" "}
                <p className="text-secondary dark:text-white dark:underline">
                  {cls.instructorName}
                </p>
              </h3>
            </div>
            <div className="flex justify-between w-[80%] mx-auto items-center">
              <span className="flex items-center gap-1 text-[13px] dark:text-white">
                Vị trí trống:
                <p
                  className={`${
                    cls.availableSeats < 1 ? "text-red-500" : "dark:text-white"
                  }`}
                >
                  {cls.availableSeats}
                </p>
              </span>
              <p className="px-3 py-1 text-white rounded-2xl dark:bg-slate-900 bg-secondary">
                {cls.price}
              </p>
            </div>
            <Link to={`/class/${cls._id}`}>
              <button className="px-4 py-2 mt-2 w-[80%] mx-auto flex items-center justify-center text-white disabled:bg-red-300 bg-secondary rounded-2xl duration-300 hover:bg-rose-700">
                Xem chi tiết
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
