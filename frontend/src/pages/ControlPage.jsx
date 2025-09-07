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

const controlPage = () => {
  const params = useParams();

  console.log(params.slug);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-screen flex">
        <Sidebar className="hidden lg:flex max-xl:w-[20vw] max-2xl:w-[18vw] border-r border-[#2a3a6f]" />
        <main className="flex-1 min-w-0 overflow-y-auto">
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
