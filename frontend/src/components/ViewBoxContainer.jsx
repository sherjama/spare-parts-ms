import React from "react";

const ViewBoxContainer = ({ className, data }) => {
  return (
    <div
      className={`${className} min-w-[200px] sm:min-w-[240px] md:min-w-[280px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-xl p-6 flex flex-col justify-between`}
    >
      <div className="flex justify-start items-start gap-3 drop-shadow-[0_0_10px_rgba(99,102,241,0.7)]">
        <span className="text-3xl">{data.icon}</span>

        <div className="flex flex-col gap-4 overflow-hidden">
          <h2 className="text-lg text-white font-nexar3">{data.title}</h2>

          <p className="text-4xl text-slate-300 font-nexar1 truncate text-ellipsis whitespace-nowrap">
            {data.data}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBoxContainer;
