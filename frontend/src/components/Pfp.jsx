import { useSelector } from "react-redux";

const Pfp = ({ className = "", size = "90", cusstomDp = "", ...prop }) => {
  const userPfp = useSelector((state) => state.userdata.userdata.user.logo);

  return (
    <div
      className={`${className} size-${size} rounded-full  mr-2 bg-slate-900 flex items-center justify-center overflow-hidden`}
      {...prop}
    >
      <img className="object-cover w-full h-full " src={userPfp} alt="dp" />
    </div>
  );
};

export default Pfp;
