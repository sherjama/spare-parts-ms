import { Pfp } from "../index.js";
import { MdDashboard } from "react-icons/md";
import { GiTempleGate } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { BsFillHouseGearFill } from "react-icons/bs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
      className={`h-full flex flex-col  text-white ${className} bg-black w-full `}
    >
      <div className="space-y-16 ">
        <div className="flex items-center justify-between mt-10 px-2 mb-3">
          <div className="flex justify-center items-end">
            <img
              src="../../../public/assets/Logo.png"
              alt="logo"
              className="size-10"
            />
            <h1 className="underline font-nexar2 tracking-widest">EXAR</h1>
          </div>
          <div>
            {" "}
            <Pfp className="size-10" />
          </div>
        </div>
        <span className="w-11/12 h-[5px] bg-gray-950  block m-auto"></span>
      </div>
      <nav className="mt-4 pl-3">
        <span className="font-nexar3 text-md  text-gray-300">Dashboard</span>
        <Collapsible className="bg-black pl-3 pt-3">
          <CollapsibleTrigger className="text-xl tracking-wide font-nexar1 flex items-center gap-2">
            <span>
              <BsFillHouseGearFill />
            </span>{" "}
            Inventory
          </CollapsibleTrigger>
          <CollapsibleContent></CollapsibleContent>
        </Collapsible>
      </nav>
    </aside>
  );
};

export default Sidebar;
