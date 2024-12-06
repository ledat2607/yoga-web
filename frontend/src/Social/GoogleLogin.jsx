import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hook/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    googleSignIn()
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: "user",
            gender: "Is not provider",
            address: "",
            phone: "",
          };
          if (user.email && user.displayName) {
            return axios
              .post("http://localhost:4000/new-user", userImp)
              .then(() => {
                navigate("/");
                return "Đăng ký thành công";
              })
              .catch((err) => {
                throw new Error(err);
              });
          }
        }
      })
      .catch((err) => {
        const errorCode = err.code;
        const errMessage = err.message;
        console.log(errMessage);
      });
  };
  return (
    <div className="flex items-center justify-center my-3">
      <div
        onClick={() => handleLogin()}
        className="flex items-center outline-none bg-white border border-gray-300 rounded-2xl shadow-lg
      px-6 py-4 text-sm font-bold text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:outline-none cursor-pointer"
      >
        <span className="flex gap-1 items-center">
          Đăng nhập bằng tài khoản Google <FcGoogle size={20} />
        </span>
      </div>
    </div>
  );
};

export default GoogleLogin;
