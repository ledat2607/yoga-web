import React, { useEffect, useState } from "react";

import useAxiosSecure from "../../hook/useAxiosSecure";
import useAxiosFetch from "../../hook/useAxiosFetch";
import useUser from "../../hook/useUser";
import AdminStaft from "./AdminStaft";

const AdminHome = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-2xl text-center mt-6">
          Chào mừng bạn trở lại{" "}
          <span className="text-secondary font-bold">{currentUser?.name}</span>
        </h1>
        <AdminStaft />
      </div>
    </div>
  );
};

export default AdminHome;
