import React, { useState } from "react";
import useAxiosFetch from "../../../hook/useAxiosFetch";

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch();
  const [classes, setClasses] = useState([""]);
  
  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center text-slate-400">
          Các khóa học <span className="text-secondary">phổ biển</span>{" "}
          <h1 className="ml-2 dark:text-white text-black">của chúng tôi</h1>
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
    </div>
  );
};

export default PopularClasses;
