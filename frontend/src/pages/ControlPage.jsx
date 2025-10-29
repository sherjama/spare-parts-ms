import { useSelector } from "react-redux";
import {
  Sidebar,
  Dashboard,
  Profile,
  Support,
  Inventory,
  Reports,
  Settings,
  BuyPartsPage,
  SellPartsPage,
  AddShelve,
} from "../index.js";
import { useParams } from "react-router-dom";

const controlPage = () => {
  const params = useParams();

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
          {params.slug === "purchase-parts" && (
            <BuyPartsPage className="w-full h-screen" />
          )}
          {params.slug === "sell-parts" && (
            <SellPartsPage className="w-full h-screen" />
          )}
          {params.slug === "add-shelve" && (
            <div className="w-full h-full flex items-center justify-center">
              <AddShelve className="bg-red-600" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default controlPage;
