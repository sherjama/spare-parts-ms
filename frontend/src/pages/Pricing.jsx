import React from "react";
import { NavLink } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Heading */}
      <h1 className="text-5xl font-nexar3 mb-8 tracking-wide opacity-90 animate-fadeIn">
        Demo Page – No Pricing Available
      </h1>

      {/* Stylish Button */}
      <NavLink
        to="/landing"
        className="px-10 py-4 text-xl font-nexar3 rounded-full 
        bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.6)]
        hover:bg-red-700 hover:shadow-[0_0_35px_rgba(255,0,0,0.9)]
        transition-all duration-300"
      >
        Go to Landing Page
      </NavLink>
    </div>
  );
};

export default Pricing;
