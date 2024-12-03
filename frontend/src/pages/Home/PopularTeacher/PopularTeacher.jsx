import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hook/useAxiosFetch";

const PopularTeacher = () => {
  const axiosFetch = useAxiosFetch();
  const [instructor, setInstructor] = useState([""]);

  useEffect(() => {
    const fetchData = async () => {
      await axiosFetch
        .get(`/popular-instructors`)
        .then((data) => {
          setInstructor(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center text-slate-400">
          Các huấn luyện viên <span className="text-secondary">chất lượng</span>{" "}
          <p className="ml-2 dark:text-white text-black">của chúng tôi</p>
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500 dark:text-gray-100">
            Các huấn luyện viên chất lượng của chúng tôi <br />
            <i className="text-[12px] dark:text-white text-black">
              (Dựa trên lượt đánh giá của các học viên)
            </i>
          </p>
        </div>
      </div>
      <div className="grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto">
        {instructor?.map((instructor, i) => (
          <div
            key={i}
            className="flex border border-blue-500 dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md"
          >
            <div className="flex flex-col gap-6 md:gap-3 items-center">
              <img
                src={instructor?.instructor?.photoUrl}
                alt=""
                className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
              />
            </div>
            <div className="flex flex-col justify-center items-center pt-3">
              <p className="font-bold text-xl dark:text-white text-gray-800">
                {instructor?.instructor?.name}
              </p>
              <p className="text-gray-500 dark:text-gray-200 whitespace-nowrap">
                Huấn luyện viên
              </p>
              <p>Tổng học viên: {instructor?.totalEnrolled}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTeacher;
