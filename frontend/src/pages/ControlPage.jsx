import { useSelector } from "react-redux";
import {
  Sidebar,
  Dashboard,
  Profile,
  Support,
  Inventory,
  Reports,
  Settings,
} from "../index.js";
import { useParams } from "react-router-dom";
import { useState } from "react";

const controlPage = () => {
  const params = useParams();
  const userId = useSelector((state) => state.userdata.userdata?.user._id);
  const [sidebarOpen, setSidebarOpen] = useState();

  console.log(params.slug);

  return (
    <div className="w-full h-screen  flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div>
          <Sidebar className="hidden lg:block max-xl:w-[20vw] max-2xl:w-[18vw] border-r border-[#2a3a6f]" />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {params.slug === "dashboard" && (
            <Dashboard className="w-full h-screen" />
          )}
          {params.slug === "inventory" && (
            <Inventory className="w-full h-screen" />
          )}
          {params.slug === "reports" && <Reports className="w-full h-screen" />}
          {params.slug === "settings" && (
            <Settings className="w-full h-screen" />
          )}
          {params.slug === "support" && <Support className="w-full h-screen" />}
          {params.slug === "profile" && <Profile className="w-full h-screen" />}
        </main>
      </div>
    </div>
  );
};

export default controlPage;
