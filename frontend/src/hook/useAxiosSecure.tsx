import { useContext, useEffect } from "react";
import { AuthContext } from "../ultities/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios, { InternalAxiosRequestConfig } from "axios";

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:4000",
  });

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers || {};

        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers["Content-Type"] = "application/json";
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;