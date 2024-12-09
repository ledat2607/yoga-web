import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hook/useAxiosFetch";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import useUser from "../../../../hook/useUser";

const PaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPanigatedPayments] = useState([]);

  const totalItem = payments.length;
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(totalItem / 5);
  let itemPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentItem = payments.slice(firstIndex, lastIndex);
    setPanigatedPayments(currentItem);
  }, [page, payments]);

  useEffect(() => {
    axiosFetch
      .get(`/payment-history/${currentUser?.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentUser?.email]);


  const totalPaidAmout = payments.reduce((acc, curr) => acc + curr.amount, 0);
  if(loading){
    return <div>Loading.....</div>;
  }
  return (
    <div className="w-[90%] mx-auto">
      <div className="text-center mt-6 mb-16">
        <p className="text-gray-400 text-2xl">
          Xin chào{" "}
          <span className="text-secondary font-bold">{currentUser?.name}</span>
        </p>
        <h1 className="text-4xl font-bold text-secondary">
          Lịch sử thanh toán của tôi
        </h1>
        <p className="text-sm text-grey-400">
          <i>Bạn có thể kiểm tra lịch sử thanh toán tại đây</i>
        </p>
      </div>
      <div>
        <div>
          <p className="font-bold">Tổng lượt thanh toán: {payments.length}</p>
          <p className="font-bold">Tổng chi tiêu: {totalPaidAmout} $</p>
        </div>
        <div>
          <div>
            {paginatedPayments.map((i, index) => (
              <tr>
                <td>{index + 1}</td>
                <td className="whitespace-normal px-6 py-4">{i.amount}</td>
                <td className="whitespace-normal px-6 py-4">{i.classesId}</td>
              </tr>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
