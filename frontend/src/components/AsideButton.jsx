import React from "react";
import { NavLink } from "react-router-dom";

const AsideButton = ({ text = "", toLink = "" }) => {
  return (
    <NavLink
      to={toLink}
      className={({ isActive }) =>
        `${
          isActive ? "bg-[#121212] " : ""
        } w-full px-4 py-3 text-white rounded-l-3xl no-underline font-nexar3`
      }
    >
      {text}
    </NavLink>
  );
};

export default AsideButton;
