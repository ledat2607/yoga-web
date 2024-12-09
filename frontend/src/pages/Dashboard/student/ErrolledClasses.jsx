import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useUser from "../../../hook/useUser";
import { Link } from "react-router-dom";

const ErrolledClasses = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {currentUser} = useUser()
  useEffect(() => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [])
  
  return (
    <div>
      <h1 className="text-2xl my-6 text-center uppercase font-bold">
        Các khóa học đã tham gia
      </h1>
      <div className="w-[90%] mx-auto mt-6 grid gap-3 md:grid-cols-2 grid-cols-1 lg:grid-cols-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md backdrop-blur-sm shadow-blue-500 h-96 mx-3 rounded-3xl flex justify-around items-center overflow-hidden sm:flex-grow sm:h-52 "
          >
            <img
              src={item.classes.image}
              alt=""
              className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
            />
            <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-full">
              <div>
                <h1 className="text-[18px]">{item.classes.name}</h1>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="px-2 py-2 text-sm bg-secondary text-white font-bold rounded-full">
                  {item.classes.price}
                </p>
                <Link to={`/class/${item.classes._id}`}>
                  <button className="px-2 py-2 font-bold bg-secondary text-[18px] text-white rounded-2xl">
                    Xem
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrolledClasses;
