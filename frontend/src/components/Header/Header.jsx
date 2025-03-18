import React from "react";
import { Button } from "../../index.js";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="main-container" className="w-[95%] h-16">
        <div className="w-full h-full flex items-center justify-between">
          <div id="left-nav" className="font-nexar3">
            LOGO
          </div>

          <nav className="h-full flex items-center ">
            <ul className="flex space-x-10 uppercase font-medium text-gray-700">
              <li>
                <NavLink className="Link_Animation font-nexar2">home</NavLink>
              </li>
              <li>
                <NavLink className="Link_Animation font-nexar2">
                  pricing
                </NavLink>
              </li>
              <li>
                <NavLink className="Link_Animation font-nexar2">about</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"} className="Link_Animation font-nexar2">
                  contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-2">
            <Button text="Login" onClick={() => navigate("/auth")} />
            <Button text="Signup" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
