import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

const Button = ({
  isActive = false,
  className,
  children,
  text = "submit",
  bgColor = "bg-white",
  textColor = "text-slate-700",
  ...params
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <button
        className={`${
          isActive ? "bg-black text-white border-none" : null
        } ${className}  ${bgColor} ${textColor} font-nexar1 px-8 py-2 rounded-full  border-2 border-slate-200 text-md flex items-center justify-center`}
        {...params}
      >
        {text}
        {children}
        {toggle && (
          <ThreeCircles
            visible={true}
            height="30"
            width="30"
            color="#60A5FA"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </button>
    </div>
  );
};

export default Button;
