import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../hook/useAxiosFetch';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { toast } from 'react-toastify';

const MangeUser = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosFetch = useAxiosFetch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [])
  const handleDelete = (id)=>{
    axiosSecure
      .delete(`/delete-user/${id}`)
      .then((res) => {
        if (res.data) {
          toast.success("Đã xóa thành công");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="text-4xl text-center font-bold text-secondary my-10">
      Quản lý <span className="text-black">người dùng</span>
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
                        Tên người dùng
                      </th>
                      <th scope="col" className="px-4 py-6">
                        Email đăng ký
                      </th>
                      <th scope="col" className="px-4 py-6">
                        Phân quyền
                      </th>
                      <th scope="col" className="px-4 py-6">
                        Chi tiết
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-2xl font-bold"
                        >
                          Không tồn tại người dùng nào
                        </td>
                      </tr>
                    ) : (
                      users.map((cls, index) => (
                        <tr
                          key={index}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <img
                              src={cls.photoUrl}
                              alt=""
                              className="h-[35px] w-[35px] rounded-full object-cover "
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {cls.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {cls.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`font-bold px-3 py-1 text-white uppercase rounded-2xl ${
                                cls.role === "admin"
                                  ? "bg-orange-500"
                                  : cls.role === "user"
                                  ? "bg-yellow-500"
                                  : cls.role === "instructor"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {cls.role}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/dashboard/edit-user/${cls._id}`)
                                }
                                className="text-[12px] cursor-pointer font-bold hover:translate-x-1 duration-300 disabled:bg-green-700 bg-green-400 py-1 rounded-md px-2 text-white"
                              >
                                Cập nhật
                              </button>
                              <button
                                onClick={() => handleDelete(cls._id)}
                                className="text-[12px] cursor-pointer font-bold hover:translate-x-1 duration-300 disabled:bg-red-700 bg-red-400 py-1 rounded-md px-2 text-white"
                              >
                                Xóa
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
      </div>
    </div>
  );
};

export default MangeUser;