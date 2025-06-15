import React from "react";
import { NavLink } from "react-router-dom";

const AsideButton = ({ text = "", toLink = "" }) => {
  return (
    <NavLink
      to={toLink}
      className={({ isActive }) =>
        `${
          isActive ? "bg-purple-950" : ""
        } w-full px-4 py-3 text-white rounded-md no-underline font-nexar3`
      }
    >
      {text}
    </NavLink>
  );
};

export default AsideButton;
