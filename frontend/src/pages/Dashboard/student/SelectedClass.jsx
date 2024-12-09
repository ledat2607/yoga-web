import React, { useEffect, useState } from "react";
import useUser from "../../../hook/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";

import { HashLoader } from "react-spinners";
import moment from "moment";

import { MdDeleteSweep } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";

import Swal from "sweetalert2";

const SelectedClass = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [panigateData, setPanigateData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPage = 5;
  const totalPage = Math.ceil(classes.length / itemPage);
  const naviagte = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCartData = async () => {
      if (currentUser?.email) {
        try {
          const res = await axiosSecure.get(`/cart/${currentUser.email}`);
          setClasses(res.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching cart data:", err);
        }
      }
    };

    fetchCartData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-[100vw] min-h-screen">
        <HashLoader color="#ff1949" size={50} />
      </div>
    );
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa sản phẩm",
      text: "Bạn sẽ không thể hoàn tất nếu xác nhận !!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, hãy xóa nó",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure
          .delete(`/delete-cart-item/${id}`)
          .then((res) => {
            if (res.data.deleteCount > 0)
              Swal.fire({
                title: "Đã xóa",
                text: "Bạn đã xóa khóa học thành công",
                icon: "success",
              });
            const newClasses = classes.filter((item) => item._id !== id);
            setClasses(newClasses);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const totalPrice = classes.reduce(
    (acc, item) => acc + parseInt(item.price),
    0
  );
  const fax = totalPrice * 0.01;
  const price = totalPrice + fax;

  const handlePay = (id) => {
    const item = classes.find((item) => item._id === id);
    const priceItem = item.price;
    naviagte("/dashboard/user/payment", {
      state: { price: priceItem, itemId: id },
    });
  };

  
  return (
    <div>
      <div className="my-6 text-center">
        <h1 className="text-4xl text-center font-bold">Các khóa học đã chọn</h1>
      </div>
      <div className="h-screen py-6">
        <div className="container mx-auto px-4 ">
          <h2 className="text-2xl font-semibold mb-4">
            Các khóa học chờ thanh toán
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                  <table className="w-full ">
                    <thead>
                      <tr>
                        <th className="text-left text-lg font-semibold text-blue-500">
                          #
                        </th>
                        <th className="text-left text-lg font-semibold text-blue-500">
                          Tên khóa học
                        </th>
                        <th className="text-left text-lg font-semibold text-blue-500">
                          Giá
                        </th>
                        <th className="text-left text-lg font-semibold text-blue-500">
                          Ngày thêm
                        </th>
                        <th className="text-left text-lg font-semibold text-blue-500">
                          Chức năng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.length === 0 ? (
                        <tr className="text-lg mt-6">
                          <td className="text-center " colSpan={5}>
                            Không có khóa học nào chờ thanh toán
                          </td>
                        </tr>
                      ) : (
                        classes.map((item, index) => {
                          const letIdx = (page - 1) * itemPage + index + 1;
                          return (
                            <tr key={item._id}>
                              <td className="py-2">{letIdx}</td>
                              <td className="font-semibold text-lg">
                                <div className="rounded-2xl flex gap-3 items-center">
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="w-16 h-16 object-contain rounded-2xl"
                                  />
                                  {item.name}
                                </div>
                              </td>
                              <td className="font-semibold text-lg">
                                $ {item.price}
                              </td>
                              <td className="py-4">
                                <p className="text-green-400 text-sm">
                                  {moment(item.submitted).format(
                                    "MMMM Do YYYY"
                                  )}
                                </p>
                              </td>
                              <td className="flex gap-3">
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold hover:bg-rose-800"
                                >
                                  <MdDeleteSweep />
                                </button>
                                <button
                                  onClick={() => handlePay(item._id)}
                                  className="hover:bg-teal-800 flex items-center text-sm px-3 py-1 bg-green-500 rounded-2xl text-white"
                                >
                                  <FiDollarSign />
                                  Thanh toán
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-1/5 fixed right-3 shadow-md p-2">
                <div className="text-lg font-semibold mb-4">
                  Tổng tiền
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Tổng số tiền</span>
                    <span>$ {totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Phí phát sinh</span>
                    <span>$ {fax}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Tổng số tiền</span>
                    <span>$ {price}</span>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    disabled={price < 0}
                    onClick={() =>
                      naviagte("/dashboard/user/payment", {
                        state: { price: price, itemId: null },
                      })
                    }
                    className="text-white bg-secondary px-2 py-1 rounded-2xl"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SelectedClass;
