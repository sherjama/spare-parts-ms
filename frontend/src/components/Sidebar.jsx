import { AsideButton } from "../index.js";
import { MdDashboard } from "react-icons/md";
import { GiTempleGate } from "react-icons/gi";
import { ImProfile } from "react-icons/im";

const Sidebar = ({ className }) => {
  const options = [
    {
      text: "Dashboard",
      toLink: "/controls/dashboard",
      icon: <MdDashboard size={23} />,
    },
    {
      text: "Stock",
      options: ["Add Stock", "List Stock"],
      toLink: "/controls/stock",
      icon: <GiTempleGate size={23} />,
    },
  ];

  return (
    <aside
      className={`flex flex-col justify-between text-white h-[95vh] ${className} `}
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
              icon={val.icon}
            />
          ))}
        </nav>
      </div>

      <div
        className="absolute  w-42 bottom-0 left-0
       text-gray-400 "
      >
        <div className="flex items-start space-x-2  rounded-l-3xl p-3 cursor-pointer h-16 ">
          <AsideButton
            text="Profile"
            toLink="/controls/profile"
            icon={<ImProfile size={23} />}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
