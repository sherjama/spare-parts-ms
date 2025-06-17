import { useEffect } from "react";
import { Sidebar, Dashboard } from "../index.js";
import { useParams } from "react-router-dom";

const controlPage = () => {
  const params = useParams();

  console.log(params.slug);

  return (
    <div className="w-full h-screen  border border-[#2a3a6f]  bg-[#222222] p-6 md:p-8">
      <div className="flex">
        <Sidebar className="w-[10vw]" />
        {params.slug == "dashboard" && <Dashboard className="w-[90vw]" />}
      </div>
    </div>
  );
};

export default controlPage;
