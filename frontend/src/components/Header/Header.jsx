import React from "react";
import { Button } from "../../index.js";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div id="main-container" className="w-[95%] h-16">
        <div className="w-full h-full flex items-center justify-between">
          <div id="left-nav">LOGO</div>

          <nav className="h-full flex items-center">
            <ul className="flex space-x-10 uppercase font-medium text-gray-700 ">
              <li>
                <NavLink className="Link_Animation">home</NavLink>
              </li>
              <li>
                <NavLink className="Link_Animation">pricing</NavLink>
              </li>
              <li>
                <NavLink className="Link_Animation">about</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"} className="Link_Animation">
                  contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-2">
            <Button text="Login" />
            <Button text="Signup" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
