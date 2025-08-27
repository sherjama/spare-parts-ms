import { NavLink } from "react-router-dom";
import { Pfp } from "../index.js";
import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import { RiHomeGearFill, RiUserSettingsFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

const Sidebar = ({ classNameName }) => {
  const userdata = useSelector((state) => state.userdata.userdata.user);

  return (
    // <aside
    //   classNameName={`h-full flex flex-col  text-white ${classNameName} bg-black w-full `}
    // >
    //   <div classNameName="space-y-16 ">
    //     <div classNameName="flex items-center justify-between mt-10 px-2 mb-3">
    //       <div classNameName="flex justify-center items-end">
    //         <img
    //           src="../../../public/assets/Logo.png"
    //           alt="logo"
    //           classNameName="size-10"
    //         />
    //         <h1 classNameName="underline font-nexar2 tracking-widest">EXAR</h1>
    //       </div>
    //       <div>
    //         {" "}
    //         <Pfp classNameName="size-10" />
    //       </div>
    //     </div>
    //     <span classNameName="w-11/12 h-[5px] bg-gray-950  block m-auto"></span>
    //   </div>
    //   <nav classNameName="mt-4 pl-3">
    //     <span classNameName="font-nexar3 text-md  text-gray-300">Dashboard</span>
    //     <Collapsible classNameName="bg-black pl-3 pt-3">
    //       <CollapsibleTrigger classNameName="text-xl tracking-wide font-nexar1 flex items-center gap-2">
    //         <span>
    //           <BsFillHouseGearFill />
    //         </span>{" "}
    //         Inventory
    //       </CollapsibleTrigger>
    //       <CollapsibleContent></CollapsibleContent>
    //     </Collapsible>
    //   </nav>
    // </aside>
    <div className="bg-black h-screen flex flex-col px-2">
      <header className="flex items-center justify-between  pt-2">
        <div className="flex items-center gap-2">
          <img
            alt="Nexar logo icon, white circular arrows forming a loop"
            className="w-5 h-5"
            height="20"
            src="https://storage.googleapis.com/a1aa/image/67a1690a-99b8-4278-be55-885ada38399c.jpg"
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
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-sm no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <RxDashboard />
          Dashboard
        </NavLink>
        <NavLink
          to={"/controls/inventory"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-sm no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <RiHomeGearFill />
          Inventory
        </NavLink>
        <NavLink
          to={"/controls/reports"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-sm no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <TbReportSearch />
          Reports
        </NavLink>
        <NavLink
          to={"/controls/settings"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 text-sm no-underline font-nexar3 ${
              isActive ? "bg-indigo-950" : " "
            }`
          }
        >
          <RiUserSettingsFill />
          Settings
        </NavLink>
      </nav>
      <section className="flex flex-col gap-3 pt-4 border-t border-[#2A2A2A] mt-8 ">
        <h2 className="text-xs font-semibold text-[#666666] tracking-wider select-none">
          OTHER
        </h2>
        <NavLink
          className="flex items-center gap-3 rounded-md px-3 py-2 text-white text-sm no-underline"
          to={"/controls/support"}
        >
          <BiSupport />
          Support
        </NavLink>
      </section>
      <div className="mt-auto mb-4">
        <button className="bg-[#1E1E1E] rounded-xl px-2 py-1 flex items-center justify-between text-gray-300 text-sm select-none w-full">
          <div className="flex items-center ">
            <Pfp className="size-8" />
            <div className="flex flex-col text-left">
              <span className="font-nexar3 text-">{userdata.username}</span>
              <span className="text-[9px] text-[#999999]">
                {userdata.email}
              </span>
            </div>
          </div>
          {/* <i className="fas fa-chevron-down text-[#666666]"></i> */}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
