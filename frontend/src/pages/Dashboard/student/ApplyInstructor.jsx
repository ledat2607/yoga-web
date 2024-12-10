import React, { useEffect, useState } from "react";
import useUser from "../../../hook/useUser";
import useAxiosFetch from "../../../hook/useAxiosFetch";
import { toast } from "react-toastify";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
const ApplyInstructor = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [skill, setSkill] = useState("");
  useEffect(() => {
    axiosFetch
      .get(`/applied-instructors/${currentUser?.email}`)
      .then((res) => {
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email, skill);
    const data = { name, email, skill };
    axiosFetch
      .post("/as-instructor", data)
      .then((res) => {
        if (res) {
          toast.success("Đã gửi yêu cầu thành công !");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-[80vw] text-center">
      <h1 className="text-center font-bold text-2xl mb-8">
        Đăng ký để trở thành{" "}
        <span className="text-secondary">huấn luyện viên</span>
      </h1>
      <div className="flex items-center">
        {!submittedData?.name && (
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="flex w-full gap-4">
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
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="email" className="text-gray-700">
                    Email đăng ký
                  </label>
                  <div className="flex items-center mt-1">
                    <MdEmail className="text-gray-500" />
                    <input
                      className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                      type="text"
                      id="email"
                      defaultValue={currentUser?.email}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="skill" className="text-gray-700 items-start">
                  Mô tả kinh nghiệm
                </label>
                <div className="flex items-center mt-1">
                  <textarea
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    rows={5}
                    placeholder="Kinh nghiệm của bạn....."
                    className="w-full p-1 border border-blue-500 rounded-2xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-3 py-2 rounded-2xl bg-secondary text-white font-bold"
              >
                Gửi yêu cầu
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyInstructor;
