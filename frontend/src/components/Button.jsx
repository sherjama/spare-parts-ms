import React from "react";

const Button = ({
  className,
  children,
  text = "submit",
  bgColor = "bg-white",
  textColor = "text-slate-700",
}) => {
  return (
    <div>
      <button
        className={`${className}  ${bgColor} ${textColor} px-3 py-1 rounded-2xl border border-slate-700 text-md flex items-center justify-center`}
      >
        {text}
        {children}
      </button>
    </div>
  );
};

export default Button;
