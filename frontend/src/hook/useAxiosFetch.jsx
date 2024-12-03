import React, { useEffect } from "react";
import axios from "axios";
const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseUrl: "http://localhost:4000/",
  });
  useEffect(() => {
    const requestIntercreptor = axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    const responseInterceptor = axios.interceptors.response.use(
      (respone) => {
        return respone;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercreptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
