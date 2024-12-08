import React, { useState } from "react";
import { MdAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Social/GoogleLogin";
import useAuth from "../../hook/useAuth";
import { toast } from "react-toastify";
const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const { login, error, setError, loader, setLoader } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    login(formData.email, formData.password)
      .then(() => {
        navigate("/");
        toast.success("Đăng nhập thành công");
      })
      .catch((err) => {
        setError(err.code);
        setLoader(false);
      });
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl flex justify-center gap-2 font-bold sm:text-3xl text-center dark:text-gray-300">
        Bắt đầu từ ngày{" "}
        <p className="text-secondary uppercase font-bold dark:text-blue-400">
          hôm nay
        </p>
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-gray-500 dark:text-gray-400">
        Khám phá tất cả các khóa học online của chúng tôi, thực hành theo từng
        mức độ phù hợp với bạn
      </p>
      <div className="mx-auto max-w-lg mb-0 mt-6 rounded-lg font-medium p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-600 backdrop-blur-lg dark:shadow-xl shadow-blue-400 dark:shadow-gray-100">
        <form onSubmit={handleSubmit} action="" className="space-y-4">
          <p className="text-center text-rose-500 dark:text-white text-xl uppercase font-bold">
            Đăng nhập tài khoản của bạn
          </p>
          {/*Email */}
          <div>
            <label htmlFor="email" className="dark:text-white">
              Địa chỉ email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 text-sm shadow-sm mt-1"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdAlternateEmail size={20} />
              </span>
            </div>
            {/*Password */}
          </div>
          <div>
            <div className="relative">
              <label htmlFor="password" className="dark:text-white">
                Mật khẩu
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu đăng nhập"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 mt-1 text-sm shadow-sm"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-0 bottom-5 flex items-center justify-center px-4 cursor-pointer"
              >
                <MdOutlineRemoveRedEye size={20} />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-secondary px-5 py-3 text-lg font-bold text-white"
          >
            Đăng nhập
          </button>
          <span className="flex gap-3 dark:text-gray-100">
            Chưa có tài khoản ?{" "}
            <Link to={"/sign-up"} className="text-secondary dark:text-gray-300">
              Đăng ký
            </Link>
          </span>
          <GoogleLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
