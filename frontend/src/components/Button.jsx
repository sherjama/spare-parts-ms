import React from "react";

const Button = ({
  className,
  children,
  text = "submit",
  bgColor = "",
  textColor = "",
}) => {
  return (
    <div>
      <button
        className={`${className}  ${bgColor} ${textColor} px-4 py-2 rounded-md border border-black bg-white text-black text-sm `}
      >
        {text}
        {children}
      </button>
    </div>
  );
};

export default Button;
