import React from "react";

const ViewBoxContainer = ({ className, data }) => {
  return (
    <div
      className={`${className} w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-xl p-6 flex flex-col justify-between`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{data.icon}</span>

        <div className="flex flex-col gap-4 overflow-hidden">
          <h2 className="text-lg text-white font-nexar3">{data.title}</h2>

          <p className="text-4xl text-slate-300 font-nexar1 truncate whitespace-nowrap overflow-hidden">
            {data.data}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBoxContainer;
