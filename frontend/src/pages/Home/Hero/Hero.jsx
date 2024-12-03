import React from "react";
import bgImg from "../../../assets/home/banner-1.jpg";

const Hero = () => {
  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="min-h-screen flex justify-start items-center pl-11 text-white bg-gray-800 bg-opacity-60">
        <div>
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl">Cung cấp</p>

            <h1 className="md:text-7xl text-4xl font-bold">
              Các lộ trình chất lượng
            </h1>
            <div className="md:w-1/2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
              ea ullam doloribus optio beatae pariatur alias voluptatibus magnam
              excepturi illo hic, nobis asperiores dolore delectus, porro neque
              aut, enim ab.
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-2xl hover:scale-105 hover:translate-x-2 duration-300 cursor-pointer bg-secondary font-bold uppercase">
                Tham gia ngay
              </button>
              <button className="px-7 py-3 rounded-2xl hover:scale-105 hover:translate-x-2 duration-300 cursor-pointer bg-transparent hover:bg-secondary border border-white  font-bold uppercase">
                Xem lớp học
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
