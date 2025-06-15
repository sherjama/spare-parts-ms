import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AsideButton } from "../index.js";

const Sidebar = () => {
  const userdata = useSelector((state) => state.userdata.userdata?.user);
  const options = [
    { text: "Dashboard", toLink: "/controls/dashboard" },
    { text: "Stock", toLink: "/controls/Stock" },
  ];

  return (
    <aside className="flex flex-col justify-between w-full md:w-56 text-white h-[95vh]">
      <div>
        <h1 className="text-white text-xl font-nexar3 mb-1">NEXAR</h1>
        <p className="mt-6 text-white text-sm font-normal">
          Welcome,
          <span className="font-semibold"> {userdata.username}</span>
        </p>
        <p className="text-[#7a7a7a] text-xs mb-6">
          Here's your stock portfolio overview
        </p>
        <nav className="space-y-3 flex flex-col">
          {options.map((val, idx) => (
            <AsideButton key={idx} text={val.text} toLink={val.toLink} />
          ))}
        </nav>
      </div>
      <div className="mt-10 space-y-3 text-[#7a7a7a] text-xs font-normal">
        <button className="flex items-center space-x-2 w-full hover:text-white">
          <i className="fas fa-users text-[10px]"></i>
          <span>Community</span>
        </button>
        <button className="flex items-center space-x-2 w-full hover:text-white">
          <i className="fas fa-question-circle text-[10px]"></i>
          <span>Help &amp; Support</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
