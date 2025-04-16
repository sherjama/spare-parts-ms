import React from "react";
import { Button } from "../../index.js";
import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <>
      <div id="main-container" className="w-[95%] h-16 bg-white fixed">
        <div className="w-full h-full flex items-center justify-between">
          <NavLink
            to={"/"}
            id="left-nav"
            className="font-nexar3 text-2xl no-underline border-b-2 border-red-500 rounded-lg p-[2px]"
          >
            NEXAR
          </NavLink>

          <nav
            className={`h-full flex items-center bg-black px-20 rounded-b-full ${
              path == "/auth/signup" || path == "/auth/login" ? "hidden" : ""
            }`}
          >
            <ul className="flex space-x-10 uppercase font-medium text-gray-200">
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

          <div className="flex space-x-2 ">
            <Button
              className={`p-2 ${
                path == "/auth/signup" || path == "/auth/login" ? "hidden" : ""
              }`}
              text="Get started"
              bgColor="bg-black"
              textColor="text-gray-200"
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
