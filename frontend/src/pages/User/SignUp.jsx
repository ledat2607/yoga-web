import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiFillPhone,
  AiOutlinePicture,
  AiOutlineHeatMap,
} from "react-icons/ai";
import { MdKey, MdOutlineLocationOn, MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Social/GoogleLogin";
import { AuthContext } from "../../ultities/provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";



const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, updateProfile, setError } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signUp(data.email, data.password)
      .then((res) => {
        const user = res.user;
        if (user) {
          return updateProfile(data.name, profilePic).then((res) => {
            const userImp = {
              name: data.name,
              email: data.email,
              photoURL: profilePic,
              role: "user",
              gender: data.gender,
              phone: data.phone,
              address: data.address,
            };
            if (data.email && data.name) {
              return axios
                .post(`http://localhost:4000/new-user`, userImp)
                .then(() => {
                  setError("");
                  navigate("/");
                  return "Đăng ký thành công";
                })
                .catch((err) => {
                  throw new Error(err);
                });
            }
          });
        }
      })
      .catch((err) => {
        toast.error("Lỗi khi đăng ký");
        setError(err);
        throw new Error();
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center pt-40 bg-gray-100 min-h-screen dark:bg-gray-600">
      <div className="dark:bg-gray-500 shadow-lg h-full p-3 rounded-2xl bg-white shadow-blue-200 dark:shadow-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 uppercase dark:text-white">
          Đăng ký tài khoản
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block dark:text-white font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 mb-1 text-xl dark:text-white" />
                Họ và tên
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Nhập họ và tên bạn...."
                className="p-2 focus:outline-none rounded-xl flex items-center border-blue-400 border"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block dark:text-white font-bold mb-2"
              >
                <AiOutlineMail className="inline-block mr-2 mb-1 text-xl dark:text-white" />
                Địa chỉ email
              </label>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="Nhập địa chỉ email...."
                className="p-2 focus:outline-none rounded-xl flex items-center border-blue-400 border"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block dark:text-white font-bold mb-2"
              >
                <MdKey className="inline-block mr-2 mb-1 text-xl dark:text-white" />
                Mật khẩu
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Mật khẩu đăng nhập...."
                className="p-2 focus:outline-none rounded-xl flex items-center border-blue-400 border"
              />
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="confirmPassword"
                className="block dark:text-white font-bold mb-2"
              >
                <MdPassword className="inline-block mr-2 mb-1 text-xl dark:text-white" />
                Xác nhận mật khẩu
              </label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("password") || "Mật khẩu không khớp",
                })}
                type="password"
                placeholder="Nhập lại mật khẩu...."
                className="p-2 focus:outline-none rounded-xl flex items-center border-blue-400 border"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block dark:text-white font-bold mb-2"
              >
                <AiFillPhone className="inline-block mr-2 mb-1 text-xl dark:text-white" />
                Số điện thoại
              </label>
              <input
                {...register("phoneNumber", { required: true })}
                type="text"
                placeholder="Số điện thoại...."
                className="p-2 focus:outline-none rounded-xl flex items-center border-blue-400 border"
              />
            </div>
            <div className="mb-4 flex items-center justify-center w-full">
              <div>
                <label
                  htmlFor="photoUrl"
                  className="block dark:text-white font-bold mb-2"
                >
                  <AiOutlinePicture className="inline-block mr-2 mb-1 text-xl dark:text-white" />
                  Ảnh đại diện
                </label>
                <div
                  onClick={() => document.getElementById("photoInput").click()}
                  className="w-36 h-36 bg-gray-300 flex items-center justify-center rounded-full cursor-pointer border-2 border-dashed border-blue-400 overflow-hidden"
                >
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">A</span>
                  )}
                </div>
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block dark:text-white font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 mb-1 text-xl dark:text-white" />
                Giới tính
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full border border-blue-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Chọn giới tính</option>
                <option value="female">Nam</option>
                <option value="male">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold dark:text-white"
            >
              <MdOutlineLocationOn className="inline-block mr-2 mb-1 text-lg" />
              Địa chỉ
            </label>
            <textarea
              {...register("address", { required: true })}
              rows="3"
              placeholder="Địa chỉ liên hệ..."
              className="border rounded-2xl p-1 w-full mt-1 border-blue-400"
            ></textarea>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-rose-400 text-white px-2 py-1 rounded-2xl w-[70%] transition-all duration-300 font-bold hover:-translate-y-2"
            >
              Đăng ký
            </button>
            {errors.password && (
              <div className="text-red-500 text-sm w-full mt-1">
                <p>Mật khẩu không khớp !!</p>
              </div>
            )}
          </div>
        </form>
        <p className="mt-2 text-center">
          Đã có tài khoản?{" "}
          <Link to={"/login"} className="text-secondary">
            Đăng nhập
          </Link>
        </p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default SignUp;
