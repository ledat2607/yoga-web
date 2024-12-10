import React from "react";

import instructorImg from "../../../assets/dashboard/jaconda-14.png";

const InstructorHome = () => {
  return (
    <div>
      <div className="h-screen">
        <img src={instructorImg} alt="" className="w-fit h-full object-cover" />
      </div>
    </div>
  );
};

export default InstructorHome;
