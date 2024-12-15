import React, { useState } from "react";
import useAxiosFetch from "../../../hook/useAxiosFetch";
import { useEffect } from "react";
import Card from "./Card";

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch();
  const [classes, setClasses] = useState([""]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosFetch.get(`/classes`);
      setClasses(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="md:w-[90%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center text-slate-400">
          Các khóa học <span className="text-secondary">phổ biến</span>{" "}
          <p className="ml-2 dark:text-white text-black">của chúng tôi</p>
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500 dark:text-gray-100">
            Các khóa học phổ biến của chúng tôi <br />
            <i className="text-[12px] dark:text-white text-black">
              (Dựa trên lượt tham gia của các học viên)
            </i>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
