import React, { useContext, useEffect } from "react";
import { AuthContext } from "../ultities/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const axisoSecure = axios.create({
    baseURL: "http://localhost:4000",
  });
  useEffect(() => {
    const requestIntercreptor = axisoSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    const responseInterceptor = axisoSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logout();
          navigate("/login");
          throw error;
        }
        throw error;
      }
    );
    return () => {
      axisoSecure.interceptors.request.eject(requestIntercreptor);
      axisoSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate, axisoSecure]);
  return axisoSecure;
};

export default useAxiosSecure;
