import React from "react";
import { Link } from "react-router-dom";
const Card = ({ index, item }) => {
  const { _id, name, image, availableSeats, price, totalEnrolled } = item;
  return (
    <div key={_id}>
      <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border hover:border-2 hover:shadow-xl hover:shadow-blue-400/30 transition-all duration-100 border-secondary dark:border-gray-200 overflow-hidden m-4">
        <img
          src={image}
          alt=""
          className="cursor-pointer hover:scale-105 duration-300 transition-all h-[200px]"
        />
        <div className="p-4">
          <h2
            className="text-xl font-semibold mb-2 dark:text-white text-secondary tracking-tight overflow-hidden whitespace-nowrap text-ellipsis"
            title={name} // Tooltip to show the full name on hover
          >
            {name}
          </h2>
          <p className="text-[14px] text-black dark:text-white">
            Lượt đăng ký còn lại:{availableSeats}
          </p>
          <p className="text-[14px] text-black dark:text-white">Giá: {price}</p>
          <p className="text-[14px] text-black dark:text-white">
            Học viên đã tham gia:{totalEnrolled}
          </p>
          <Link to={`/class/${_id}`} className="text-center mt-2">
            <button className="px-2 py-1 w-full hover:translate-x-1 hover:bg-gray-100 hover:border-2 hover:border-blue-500 transition-all duration-200 bg-secondary rounded-2xl text-white hover:text-blue-600 font-bold mt-2 ">
              Chọn
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
