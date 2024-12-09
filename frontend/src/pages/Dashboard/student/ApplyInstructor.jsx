import React, { useEffect, useState } from "react";
import useUser from "../../../hook/useUser";
import useAxiosFetch from "../../../hook/useAxiosFetch";

import { FiUser } from "react-icons/fi";
import motion from "framer-motion";

const ApplyInstructor = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosFetch
      .get(`/applied-instructors/${currentUser?.email}`)
      .then((res) => {
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [])
  

const handleSubmit = ()=>{
}
  return (
    <div>
      <div>
        {!submittedData?.name && (
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="flex w-full">
                <div className="mb-4 w-full">
                  <label htmlFor="name" className="text-gray-700">
                    Họ và tên
                  </label>
                  <div className="flex items-center mt-1">
                    <FiUser className="text-gray-500" />
                    <input
                      className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                      type="text"
                      id="name"
                      defaultValue={currentUser?.name}
                      disabled
                      readOnly
                    />
                  </div>
                  <motion.div
                    vaiants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    tran
                  ></motion.div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyInstructor;
