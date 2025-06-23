import React from "react";

const Box = ({ Heading, Data, headingColor }) => {
  return (
    <div
      className="flex gap-1 flex-col bg-[#222222] rounded-md p-4 shadow-sm min-w-52"
      onClick={() => console.log("pura daba ahh")}
    >
      <h2 className={`flex gap-2 ${headingColor} font-nexar1  text-xl`}>
        <span>{Data.icon}</span>
        <h2>{Heading}</h2>
      </h2>
      <p className="text-gray-600 text-md font-nexar1 mb-1">
        Total : <span className="font-nexar1">{Data.totalShelves}</span>
      </p>
      <p className="text-gray-400 text-xs font-nexar2 text-right tracking-widest">
        details
      </p>
    </div>
  );
};

export default Box;
