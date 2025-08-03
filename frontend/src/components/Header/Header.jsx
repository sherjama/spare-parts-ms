import { Pfp, Button } from "../../index.js";
import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ className }) => {
  const userStatus = useSelector((state) => state.userdata.status);
  const userId = useSelector((state) => state.userdata.userdata?.user._id);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <>
      <div
        id="main-container"
        className={`${className} w-full m-2 h-16 fixed  flex items-center justify-center z-50`}
      >
        <div className="min-w-min p-2 h-full flex items-center justify-center bg-black/75 backdrop-blur-sm rounded-full ">
          <div
            className={`${path == "/landing" ? "w-min justify-center" : " "}
             ${
               path == "/auth/signup" || path == "/auth/login"
                 ? " w-full justify-end"
                 : ""
             } flex items-center h-full bg-slate-50]`}
          >
            <nav
              className={`h-full w-[40rem] flex items-center justify-center rounded-b-full  border-slate-200 max-md:hidden ${
                path == "/auth/signup" || path == "/auth/login" ? "hidden" : ""
              } `}
            >
              <ul className="flex space-x-16 uppercase font-medium text-gray-200 ">
                <li>
                  <NavLink
                    to="/pricing"
                    className="Link_Animation font-nexar3 no-underline"
                  >
                    pricing
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="Link_Animation font-nexar3 no-underline"
                  >
                    about Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="Link_Animation font-nexar3 no-underline"
                  >
                    contact Us
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/support"
                    className="Link_Animation font-nexar3 no-underline"
                  >
                    support
                  </NavLink>
                </li>*/}
                <li>
                  <NavLink
                    to="/feedback"
                    className="Link_Animation font-nexar3 no-underline"
                  >
                    feedback
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
