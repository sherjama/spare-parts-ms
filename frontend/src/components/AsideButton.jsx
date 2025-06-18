import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AsideButton = ({ text = "", toLink = "", options = [] }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {};

  return (
    <NavLink
      to={toLink}
      className={({ isActive }) =>
        `${
          isActive ? "bg-[#121212] " : "bg-[#222222]"
        } w-full px-4 py-3 text-white rounded-r-3xl rounded-l-lg no-underline font-nexar3`
      }
    >
      {/* <select value={selected} onChange={handleChange}></select> */}
      {text}
    </NavLink>
  );
};

export default AsideButton;
