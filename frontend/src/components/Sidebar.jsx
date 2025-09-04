import { NavLink } from "react-router-dom";
import { Pfp } from "../index.js";
import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import { RiHomeGearFill, RiUserSettingsFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const Sidebar = ({ className }) => {
  const [toggle, setToggle] = useState(false);
  const userdata = useSelector((state) => state.userdata.userdata.user);
  const sidebarRef = useRef();

  const { contextSafe } = useGSAP({ scope: sidebarRef });

  const handleSidebar = contextSafe(() => {
    if (!toggle) {
      // sidebarClose();
      gsap.to(sidebarRef.current, {
        width: 80,
        duration: 0.3,
      });
      setToggle(true);
      setTextToggle(false);
    } else {
      // sidebarOpen();

      gsap.to(sidebarRef.current, {
        width: "15vw",
        duration: 0.3,
      });
      setToggle(false);
    }
  });

  return (
    <div
      ref={sidebarRef}
      className={`${className} bg-black h-screen flex flex-col px-2 w-[15vw]`}
    >
      <header className="flex items-center justify-between  pt-2">
        <div className="flex items-center gap-2">
          <img
            alt="Logo"
            className="w-5 h-5"
            height="20"
            src="../../../public/assets/Logo.png"
            width="20"
          />
          <h1 className="text-white font-semibold text-lg select-none">
            NEXAR
          </h1>
        </div>
        <button
          aria-label="Toggle sidebar"
          className="text-[#B3B3B3] hover:text-white focus:outline-none"
        >
          <i className="fas fa-columns fa-lg"></i>
        </button>
      </header>

      <form className="relative mt-5">
        <div className="bg-slate-900 rounded-md overflow-hidden">
          <input
            className="w-full bg-[#1E1E1E] text-[#666666] placeholder-[#666666] py-1 pl-3 pr-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#060513] active:bg-slate-500"
            placeholder="Search..."
            type="search"
          />
        </div>
      </form>

      <nav className="flex flex-col gap-4 mt-8">
        <NavLink
          to={"/controls/dashboard"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <RxDashboard size={toggle ? 25 : 20} />
          {!toggle && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to={"/controls/inventory"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <RiHomeGearFill size={toggle ? 25 : 20} />
          {!toggle && <span>Inventory</span>}
        </NavLink>
        <NavLink
          to={"/controls/reports"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <TbReportSearch size={toggle ? 25 : 20} />
          {!toggle && <span>Reports</span>}
        </NavLink>
        <NavLink
          to={"/controls/settings"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <RiUserSettingsFill size={toggle ? 25 : 20} />
          {!toggle && <span>Settings</span>}
        </NavLink>
      </nav>

      <section className="flex flex-col gap-3 pt-4 border-t border-[#2A2A2A] mt-8 ">
        <h2 className="text-xs font-semibold text-[#666666] tracking-wider select-none">
          OTHER
        </h2>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
          to={"/controls/support"}
        >
          <BiSupport size={toggle ? 25 : 20} />
          {!toggle && <span>Support</span>}
        </NavLink>
      </section>

      <NavLink to={"/controls/profile"} className="mt-auto mb-4">
        {!toggle && (
          <button className="bg-[#1E1E1E] rounded-xl pl-2 pr-1 py-1 flex items-center justify-between text-gray-300 text-sm select-none w-full">
            <div className="flex items-center justify-evenly overflow-hidden">
              <span className="w-1/5 ">
                <Pfp className="size-8" />
              </span>
              <div className="w-4/5 flex flex-col text-left overflow-hidden">
                <span className="font-nexar3 text-">{userdata.username}</span>
                <span className="text-[9px] text-[#999999] ">
                  {userdata.email}
                </span>
              </div>
            </div>
          </button>
        )}
        {toggle && (
          <span>
            <Pfp className="size-10" />
          </span>
        )}
      </NavLink>
      <button onClick={handleSidebar} className="bg-pink-300">
        dabao
      </button>
    </div>
  );
};

export default Sidebar;
