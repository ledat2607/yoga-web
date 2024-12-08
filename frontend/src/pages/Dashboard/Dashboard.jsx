import React from "react";
import useUser from "../../hook/useUser";
import { HashLoader } from "react-spinners";
import DashboardNavigate from "../../routes/DashboardNavigate";


const Dashboard = () => {
  const { currentUser, isLoading } = useUser();
  const role = currentUser?.role;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-[100vw] min-h-screen">
        <HashLoader color="#ff1949" size={50} />
      </div>
    );
  }
  return (
    <div>
      <DashboardNavigate />
    </div>
  );
};

export default Dashboard;
