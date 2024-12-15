import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../hook/useAxiosFetch';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { toast } from "react-toastify";
const MangeClases = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const itemsPerPage = 5;

  // Calculate the total number of pages
  const totalPage = Math.ceil(classes.length / itemsPerPage);

  useEffect(() => {
    axiosFetch
      .get("/classes-manage")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    if (lastIndex > classes.length) {
      lastIndex = classes.length;
    }
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginationData(currentData);
  }, [page, classes]);

  const handleApproved = (id) => {
    axiosSecure
      .put(`/change-status/${id}`, { status: "approved", reason: "" })
      .then((res) => {
        const updatedClasses = classes.map((cls) =>
          cls._id === id ? { ...cls, status: "approved" } : cls
        );
        setClasses(updatedClasses);
        toast.success("Đã cập nhật thành công");
      })
      .catch();
  };

  const handleDeny = (id) => {
    axiosSecure
      .put(`/change-status/${id}`, { status: "reject", reason: "" })
      .then((res) => {
        const updatedClasses = classes.map((cls) =>
          cls._id === id ? { ...cls, status: "reject" } : cls
        );
        setClasses(updatedClasses);
        toast.success("Đã cập nhật thành công");
      })
      .catch();
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPage) return;
    setPage(newPage);
  };

  return (
    <div className="text-4xl text-center font-bold text-secondary my-10">
      Quản lý <span className="text-black">khóa học</span>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-700">
                    <tr>
                      <th scope="col" className="px-4 py-6">
                        Hình ảnh
                      </th>
                      <th scope="col" className="px-4 py-6">
                        Tên khóa học
                      </th>
                      <th scope="col" className="px-4 py-6">
                        Tên giảng viên
                      </th>
                      <th scope="col" className="px-4 py-6">
                        Trạng thái
                      </th>
                      <th scope="col" className="px-4 py-6">
                        Chi tiết
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-2xl font-bold"
                        >
                          Không tồn tại khóa học nào
                        </td>
                      </tr>
                    ) : (
                      paginationData.map((cls, index) => (
                        <tr
                          key={index}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <img
                              src={cls.image}
                              alt=""
                              className="h-[35px] w-[35px] "
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {cls.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {cls.instructorName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`font-bold px-3 py-1 text-white uppercase rounded-2xl ${
                                cls.status === "pending"
                                  ? "bg-orange-500"
                                  : cls.status === "checking"
                                  ? "bg-yellow-500"
                                  : cls.status === "approved"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {cls.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproved(cls._id)}
                                className="text-[12px] cursor-pointer font-bold hover:translate-x-1 duration-300 disabled:bg-green-700 bg-green-400 py-1 rounded-md px-2 text-white"
                              >
                                Xác nhận
                              </button>
                              <button
                                onClick={() => handleDeny(cls._id)}
                                className="text-[12px] cursor-pointer font-bold hover:translate-x-1 duration-300 disabled:bg-red-700 bg-red-400 py-1 rounded-md px-2 text-white"
                              >
                                Từ chối
                              </button>
                              <button className="text-[12px] cursor-pointer font-bold hover:translate-x-1 duration-300 disabled:bg-blue-700 bg-blue-400 py-1 rounded-md px-2 text-white">
                                Gửi phản hồi
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 text-sm bg-gray-400 text-white rounded-md mx-1"
            disabled={page === 1}
          >
            Previous
          </button>
          {[...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 text-sm py-2 rounded-md mx-1 ${
                page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 text-sm bg-gray-400 text-white rounded-md mx-1"
            disabled={page === totalPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MangeClases;
