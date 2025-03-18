import React from "react";

const Button = ({
  className,
  children,
  text = "submit",
  bgColor = "bg-white",
  textColor = "text-slate-700",
  ...params
}) => {
  return (
    <div>
      <button
        className={`${className}  ${bgColor} ${textColor} font-nexar1 px-8 py-2 rounded-full  border-2 border-slate-200 text-md flex items-center justify-center`}
        {...params}
      >
        {text}
        {children}
      </button>
    </div>
  );
};

export default Button;
