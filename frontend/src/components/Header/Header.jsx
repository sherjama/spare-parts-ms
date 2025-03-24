import React from "react";
import { Button } from "../../index.js";
import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
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
                <NavLink className="Link_Animation font-nexar2 no-underline">
                  home
                </NavLink>
              </li>
              <li>
                <NavLink className="Link_Animation font-nexar2 no-underline">
                  pricing
                </NavLink>
              </li>
              <li>
                <NavLink className="Link_Animation font-nexar2 no-underline">
                  about
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className="Link_Animation font-nexar2 no-underline"
                >
                  contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-2">
            <Button
              text="Login"
              bgColor=" "
              textColor=" "
              isActive={location.pathname == "/auth/login" ? true : false}
              onClick={() => navigate("/auth/login")}
            />
            <Button
              text="Signup"
              bgColor=" "
              textColor=" "
              isActive={location.pathname == "/auth/signup" ? true : false}
              onClick={() => navigate("/auth/signup")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
