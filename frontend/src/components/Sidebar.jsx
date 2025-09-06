import { NavLink } from "react-router-dom";
import { Pfp } from "../index.js";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import { IoSearch } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { RiHomeGearFill, RiUserSettingsFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

const Sidebar = ({ className }) => {
  const [toggle, setToggle] = useState(false);
  const userdata = useSelector((state) => state.userdata.userdata.user);
  const sidebarRef = useRef();
  const searchBarRef = useRef();

  const { contextSafe } = useGSAP({ scope: sidebarRef });

  const handleSidebar = contextSafe(() => {
    if (!toggle) {
      // sidebarClose();
      gsap.to(sidebarRef.current, {
        width: 80,
        duration: 0.3,
      });
      setToggle(true);
    } else {
      // sidebarOpen();

      gsap.to(sidebarRef.current, {
        width: "15vw",
        duration: 0.3,
      });
      setToggle(false);
    }
  });

  useEffect(() => {
    searchBarRef.current?.focus();
  }, [toggle]);

  return (
    <aside
      className={`${className} bg-black h-full flex flex-col w-[15vw] px-2`}
      ref={sidebarRef}
    >
      <header className="shrink-0 flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <img
            alt="Logo"
            className="w-5 h-5"
            src="/assets/Logo.png"
            width="20"
            height="20"
          />
          {!toggle && (
            <h1 className="text-white font-semibold text-lg select-none">
              NEXAR
            </h1>
          )}
        </div>
        <button
          onClick={handleSidebar}
          className="text-[#B3B3B3] hover:text-white focus:outline-none"
        >
          {toggle ? (
            <TbLayoutSidebarLeftExpandFilled size={23} />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled size={23} />
          )}
        </button>
      </header>

      <form className="shrink-0 mt-5">
        <div className="flex items-center justify-center rounded-md overflow-hidden">
          {toggle && (
            <button
              onClick={handleSidebar}
              className="right-2 bg-indigo-950 rounded-full p-1"
            >
              <IoSearch size={25} color="#fff" />
            </button>
          )}
          {!toggle && (
            <input
              ref={searchBarRef}
              className="w-full bg-[#1E1E1E] text-[#666666] placeholder-[#666666] py-1 pl-3 pr-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#060513]"
              placeholder="Search..."
              type="search"
            />
          )}
        </div>
      </form>

      <div className="flex-1 min-h-0 overflow-y-auto mt-5 space-y-8 border-t border-[#2A2A2A]">
        <nav className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#666666] tracking-wider select-none mt-3">
            Panels
          </h2>
          <NavLink
            to="/controls/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md font-nexar3 no-underline ${
                isActive ? "bg-indigo-950 text-white" : "hover:text-white"
              }`
            }
          >
            <RxDashboard size={toggle ? 25 : 20} />
            {!toggle && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/controls/inventory"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md font-nexar3 no-underline ${
                isActive ? "bg-indigo-950 text-white" : "hover:text-white"
              }`
            }
          >
            <RiHomeGearFill size={toggle ? 25 : 20} />
            {!toggle && <span>Inventory</span>}
          </NavLink>

          <NavLink
            to="/controls/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md font-nexar3 no-underline ${
                isActive ? "bg-indigo-950 text-white" : "hover:text-white"
              }`
            }
          >
            <TbReportSearch size={toggle ? 25 : 20} />
            {!toggle && <span>Reports</span>}
          </NavLink>

          <NavLink
            to="/controls/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md font-nexar3 no-underline ${
                isActive ? "bg-indigo-950 text-white" : "hover:text-white"
              }`
            }
          >
            <RiUserSettingsFill size={toggle ? 25 : 20} />
            {!toggle && <span>Settings</span>}
          </NavLink>
        </nav>

        <section className="flex flex-col gap-3 pt-4 border-t border-[#2A2A2A]">
          <h2 className="text-xs font-semibold text-[#666666] tracking-wider select-none">
            OTHER
          </h2>
          <NavLink
            to="/controls/support"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-md font-nexar3 no-underline ${
                isActive ? "bg-indigo-950 text-white" : "hover:text-white"
              }`
            }
          >
            <BiSupport size={toggle ? 25 : 20} />
            {!toggle && <span>Support</span>}
          </NavLink>
        </section>
      </div>

      <div
        className={`shrink-0 mb-4  ${
          toggle ? " flex items-center flex-col" : " "
        }`}
      >
        <NavLink to="/controls/profile" className="block">
          {!toggle ? (
            <button className="bg-[#1E1E1E] rounded-xl pl-2 pr-1 py-1 flex items-center justify-between text-gray-300 text-sm select-none w-full">
              <div className="flex items-center overflow-hidden w-full justify-around ">
                <span className="w-1/5">
                  <Pfp className="size-8" />
                </span>
                <div className="w-4/5 flex flex-col text-left overflow-hidden">
                  <span className="font-nexar3">{userdata.username}</span>
                  <span className="text-[9px] text-[#999999]">
                    {userdata.email}
                  </span>
                </div>
              </div>
            </button>
          ) : (
            <Pfp className="size-10" />
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
