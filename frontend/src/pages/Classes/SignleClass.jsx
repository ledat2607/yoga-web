import React, { useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import useUser from "../../hook/useUser";
import useAxiosFetch from "../../hook/useAxiosFetch";
import useAxiosSecure from "../../hook/useAxiosSecure";

import banner from "../../assets/home/banner-1.jpg"
import { FaLanguage, FaUser } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";

import { toast } from "react-toastify";

import correct from "../../assets/correct-mark.png";
import logo from "../../assets/logo.png";

const SignleClass = () => {
  const course = useLoaderData();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  console.log(currentUser);

  const role = currentUser?.role;
  const [erroledClasses, setErrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  if(!currentUser){
    navigate("/");
  }
  const handleSelect = (id) => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => setErrolledClasses(res.data))
      .catch((err) => {
        console.log(err);
      });

    if (!currentUser) {
      return toast.warning("Vui lòng đăng nhập !!");
    }

    axiosSecure
      .get(`/cart-item/${id}?email=${currentUser?.email}`)
      .then((res) => {
        if (res.data?.classId === id) {
          return toast.warning(`Đã đăng ký vào khóa học này !!!`);
        } else if (erroledClasses.find((item) => item.classes._id === id)) {
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
    <>
      <div
        data-new-gr-c-s-check-loade="14.1157.0"
        data-gr-ext-installed=""
        className="font-gilory font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
      >
        <div className="breadcrubms bg-primary dark:bg-gray-800 py-20 mt-28 section-padding bg-cover bg-no-repeat rounded-2xl">
          <div className="container text-center">
            <h2 className="font-bold text-2xl uppercase">Chi tiết khóa học</h2>
          </div>
        </div>

        <div className="nav-tab-wrapper tabs section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
              {/**left */}
              <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={course?.image}
                      alt=""
                      className="rounded-md object-fit w-full h-full block"
                    />
                  </div>
                  <h2 className="text-2xl mb-2">{course.name}</h2>
                  <div className="author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded">
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-secondary dark:text-white">
                          Huấn luyện viên
                          <a href="#" className="text-black dark:text-white">
                            : {course.instructorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-secondary dark:text-white">
                        Cập nhật lần cuối
                        <a href="#" className="text-black dark:text-white">
                          : {new Date(course.submitted).toLocaleDateString()}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="nav-tab-wrapper mt-12">
                    <ul className="course-tab mb-8" id="tabs-nav">
                      <li className="active">
                        <a href="#tab1">Khái quát</a>
                      </li>
                      <li className="active">
                        <a href="#tab2">Đánh giá</a>
                      </li>
                      <li className="active">
                        <a href="#tab3">Huấn luyện viên</a>
                      </li>{" "}
                    </ul>
                    <div className="tabs-content">
                      <div id="tab1" className="tab-content">
                        <div>
                          <h3 className="text-2xl mt-8">Mô tả khóa học</h3>
                          <p className="mt-4">{course.description}</p>
                          <div className="bg-white dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                            <h4 className="text-2xl">
                              Bạn sẽ học được gì từ khóa học ?
                            </h4>
                            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6 ">
                              <li className="flex space-x-3">
                                <div className="flex-none relative top-1">
                                  <img
                                    src={correct}
                                    alt=""
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="flex-1 ">
                                  Học được cách vận động hiệu quả
                                </div>
                              </li>
                              <li className="flex space-x-3">
                                <div className="flex-none relative top-1">
                                  <img
                                    src={correct}
                                    alt=""
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="flex-1">
                                  Biết chăm sóc bản thân dựa trên các lộ trình
                                  bài bản
                                </div>
                              </li>
                              <li className="flex space-x-3">
                                <div className="flex-none relative top-1">
                                  <img
                                    src={correct}
                                    alt=""
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="flex-1">
                                  Biết chăm sóc bản thân dựa trên các lộ trình
                                  bài bản
                                </div>
                              </li>
                              <li className="flex space-x-3">
                                <div className="flex-none relative top-1">
                                  <img
                                    src={correct}
                                    alt=""
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="flex-1">
                                  Biết chăm sóc bản thân dựa trên các lộ trình
                                  bài bản
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-2xl">
                              Phương tiện hỗ trợ học tập
                            </h4>
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-1">
                              <div className="bg-white dark:bg-slate-700 rounded-md px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src={logo} alt="" className="w-6 h-6" />
                                </span>
                                <span className="flex-1 text-black dark:text-white">
                                  Máy tính/Điện thoại
                                </span>
                              </div>
                              <div className="bg-white dark:bg-slate-700 rounded-md px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img
                                    src={logo}
                                    alt=""
                                    className="w-10 h-10"
                                  />
                                </span>
                                <span className="flex-1 text-black dark:text-white">
                                  Giấy và bút
                                </span>
                              </div>
                              <div className="bg-white dark:bg-slate-700 rounded-md px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src={logo} alt="" className="w-6 h-6" />
                                </span>
                                <span className="flex-1 text-black dark:text-white">
                                  Kết nối mạng
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="tab2" className="tab-content">
                          <div>
                            <h3>Kế hoạch tập luyện</h3>
                            <p className="mt-4">
                              Kế hoạch tập luyện dựa trên sự linh hoạt cũng như
                              yêu cầu của từng khóa học
                            </p>
                            <div className="bg-white dark:bg-indigo-500 space-y-6 p-8 rounded my-8">
                              <h4>Khóa học dành cho người mới bắt đầu</h4>
                            </div>
                            <div>
                              <h4 className="text-2xl">
                                {" "}
                                Bạn sẽ học những gì ?{" "}
                              </h4>
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Sit temporibus et beatae
                                soluta nemo incidunt cum expedita, obcaecati
                                facere consequatur impedit adipisci optio enim
                                fugiat officiis, tempora praesentium animi at.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**right */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                <div className="sidebarWrapper space-y-[30px]">
                  <div className="widget custom-text space-y-5">
                    <a href="#" className="h-[220px] rounded-md block">
                      <img
                        src={course.image}
                        alt=""
                        className="block w-full h-full object-cover rounded"
                      />
                    </a>
                    <h3>{course.price} $</h3>
                    <button
                      onClick={() => handleSelect(course._id)}
                      title={
                        role === "admin" || role === "instructor"
                          ? "Huấn luyện viên/Quản trị viên không có quyền truy cập"
                            ? course.availableSeats < 1
                            : "Không còn vị trí đăng ký"
                          : ""
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        course.availableSeats < 1
                      }
                      className={`btn btn-primary text-white w-full text-center bg-secondary py-2 px-6 disabled:cursor-not-allowed`}
                    >
                      Tham gia khóa học
                    </button>
                    <ul className="list">
                      <li className="flex space-x-3 border-b dark:border-white mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUser className="inline-flex" />
                          <div className="text-black dark:text-white font-semibold">
                            Huấn luyện viên
                          </div>
                        </div>
                        <div className="flex-none">{course.instructorName}</div>
                      </li>
                      <li className="flex space-x-3 border-b dark:border-white mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <MdBookOnline className="inline-flex" />
                          <div className="text-black dark:text-white font-semibold">
                            Lộ trình
                          </div>
                        </div>
                        <div className="flex-none">23</div>
                      </li>
                      <li className="flex space-x-3 border-b dark:border-white mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <MdBookOnline className="inline-flex" />
                          <div className="text-black dark:text-white font-semibold">
                            Thời gian học
                          </div>
                        </div>
                        <div className="flex-none">2 giờ 41 phút</div>
                      </li>
                      <li className="flex space-x-3 border-b dark:border-white mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUser className="inline-flex" />
                          <div className="text-black dark:text-white font-semibold">
                            Học viên đăng ký
                          </div>
                        </div>
                        <div className="flex-none">{course.totalEnrolled}</div>
                      </li>
                      <li className="flex space-x-3 border-b dark:border-white mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaLanguage className="inline-flex" />
                          <div className="text-black dark:text-white font-semibold">
                            Ngôn ngữ
                          </div>
                        </div>
                        <div className="flex-none">Tiếng Anh / Tiếng Việt</div>
                      </li>
                    </ul>
                    <div className="widget">
                      <div className="widget-title">Khóa học có liên quan</div>
                      <ul className="list">
                        <li className="flex space-x-4 border-white pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                          <div className="flex-none">
                            <div className="w-20 h-20 rounded">
                              <img
                                src={banner}
                                alt=""
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          </div>
                          <div className="mb-1 font-semibold text-black dark:text-white">
                            Tham gia ngay chỉ với
                          </div>
                          <span className="text-secondary dark:text-white">
                            $ 38.00
                          </span>
                        </li>
                        <li className="flex space-x-4 border-white pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                          <div className="flex-none">
                            <div className="w-20 h-20 rounded">
                              <img
                                src={banner}
                                alt=""
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          </div>
                          <div className="mb-1 font-semibold text-black dark:text-white">
                            Tham gia ngay chỉ với
                          </div>
                          <span className="text-secondary dark:text-white">
                            $ 38.00
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignleClass;
