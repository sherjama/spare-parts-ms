import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AsideButton = ({ text = "", toLink = "", options = [], icon }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {};

  return (
    <NavLink
      to={toLink}
      className={({ isActive }) =>
        `${
          isActive ? "bg-[#121212] " : "bg-[#222222]"
        } w-full px-4 py-3 text-white rounded-r-3xl rounded-l-lg no-underline font-nexar3 flex gap-2`
      }
    >
      {/* <select value={selected} onChange={handleChange}></select> */}
      {icon}
      {text}
    </NavLink>
  );
};

export default AsideButton;
