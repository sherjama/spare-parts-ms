import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsideButton, Pfp } from "../index.js";

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.userdata.userdata?.user);
  const options = [
    { text: "Dashboard", toLink: "/controls/dashboard" },
    { text: "Stock", toLink: "/controls/stock" },
  ];

  return (
    <aside
      className={`flex flex-col justify-between w-full md:w-56 text-white h-[95vh] ${className}`}
    >
      <div className="space-y-16">
        <h1 className="text-white text-xl font-nexar3 mb-1">NEXAR</h1>

        <nav className="space-y-3 flex flex-col">
          {options.map((val, idx) => (
            <AsideButton key={idx} text={val.text} toLink={val.toLink} />
          ))}
        </nav>
      </div>
      <div className="mt-10 space-y-3 text-[#7a7a7a] text-xs font-normal">
        <div
          onClick={() => navigate(`/profile/${userId}`)}
          className="flex items-center space-x-2 bg-[#121212] rounded-l-3xl px-3 py-1 cursor-pointer"
        >
          <Pfp className="size-8" />
          <div className="text-xs leading-tight max-w-24 overflow-hidden">
            <p className="font-nexar1">{userdata.username}</p>
            <p className="text-[#7a7a7a]">{userdata.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
