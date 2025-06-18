import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsideButton, Pfp } from "../index.js";

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.userdata.userdata?.user);
  const options = [
    { text: "Dashboard", toLink: "/controls/dashboard" },
    {
      text: "Stock",
      options: ["Add Stock", "List Stock"],
      toLink: "/controls/stock",
    },
  ];

  return (
    <aside
      className={`flex flex-col justify-between text-white h-[95vh] ${className}`}
    >
      <div className="space-y-16 ">
        <h1 className="text-white text-xl font-nexar3 mb-1">NEXAR</h1>

        <nav className="space-y-3 flex flex-col">
          {options.map((val, idx) => (
            <AsideButton
              key={idx}
              text={val.text}
              toLink={val.toLink}
              options={val.options}
            />
          ))}
        </nav>
      </div>

      <div className="w-full text-[#7a7a7a] text-xs bg-green-300">
        <div
          onClick={() => navigate(`/profile/${userdata._id}`)}
          className="flex items-start space-x-2 bg-[#121212] rounded-l-3xl p-3 cursor-pointer"
        >
          <div className="flex w-full">
            <Pfp className="size-8" />
            <div className="text-xs leading-tight w-min overflow-hidden ">
              <p className="font-nexar1">{userdata.username}</p>
              <p className="text-[#7a7a7a] font-nexar1">{userdata.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
