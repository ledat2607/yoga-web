import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const useUser = () => {
  const { user } = useAuth();
  const axisoSecure = useAxiosSecure();
  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axisoSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email || !!localStorage.getItem("token"),
  });
  return { currentUser, isLoading, refetch };
};

export default useUser;
