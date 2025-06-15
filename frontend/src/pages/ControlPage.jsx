import { useEffect } from "react";
import { Sidebar } from "../index.js";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const params = useParams();

  console.log(params.slug);

  return (
    <div className="w-full h-screen  border border-[#2a3a6f] bg-[#121212] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
