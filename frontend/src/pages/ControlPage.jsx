import { useSelector } from "react-redux";
import { Sidebar, Dashboard, ProfilePage, StockPage } from "../index.js";
import { useParams } from "react-router-dom";

const controlPage = () => {
  const params = useParams();
  const userId = useSelector((state) => state.userdata.userdata?.user._id);

  console.log(params.slug);

  return (
    <div className="w-full h-screen  border border-[#2a3a6f]  bg-blue-700 flex items-center">
      <div className="flex">
        <div className="w-[15vw] h-screen">
          <Sidebar />
        </div>

        {params.slug == "dashboard" && <Dashboard className="w-[90vw]" />}

        {params.slug == `profile` && <ProfilePage className="w-[90vw]" />}
        {params.slug == `stock` && <StockPage className="w-[90vw]" />}
      </div>
    </div>
  );
};

export default controlPage;
