import React from "react";
import img1 from "../../../assets/gallary/image1.png";
import img2 from "../../../assets/gallary/image2.png";
const Gallary = () => {
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white text-black">
          Bộ sưu tập
        </h1>
      </div>

      <div className="md:grid grid-cols-2 items-center justify-center gap-4 rounded-2xl">
        <div className="mb-4 md:mb-0">
          <img
            src={img1}
            alt=""
            className="md:h-[720px] w-full mx-auto rounded-2xl"
          />
        </div>
        <div className="gap-4 grid grid-cols-2 items-start">
          <div>
            <img
              src={img2}
              alt=""
              className="md:h-[350px] w-full mx-auto rounded-2xl"
            />
          </div>
          <div>
            <img
              src={img2}
              alt=""
              className="md:h-[350px] w-full mx-auto rounded-2xl"
            />
          </div>
          <div>
            <img
              src={img2}
              alt=""
              className="md:h-[350px] w-full mx-auto rounded-2xl"
            />
          </div>
          <div>
            <img
              src={img2}
              alt=""
              className="md:h-[350px] w-full mx-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
