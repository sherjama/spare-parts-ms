import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = ({ className }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className="p-5 ml-3 fixed bg-transparent left-0  z-10">
        <NavLink
          to={"/landing"}
          id="left-nav"
          className="font-nexar3 text-3xl no-underline text-slate-200"
        >
          NEXAR
        </NavLink>
      </div>
      <div
        id="main-container"
        className={`${className} w-full m-2 h-16 fixed  flex items-center justify-center z-50 ${
          path == "/auth/signup" || path == "/auth/login" ? " hidden" : " "
        }`}
      >
        <div className="min-w-min p-2 h-full flex items-center justify-center bg-black/75 backdrop-blur-sm rounded-full ">
          <div
            className={`${path == "/landing" ? "w-min justify-center" : " "}
             ${
               path == "/auth/signup" || path == "/auth/login"
                 ? " w-full justify-end"
                 : ""
             } flex items-center h-full bg-slate-50] `}
          >
            <nav className="h-full w-[40rem] flex items-center justify-center rounded-b-full  border-slate-200 max-md:hidden">
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
                    to="/aboutUs"
                    className="Link_Animation font-nexar3 no-underline"
                  >
                    about Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contactUs"
                    className="Link_Animation font-nexar3 no-underline"
                  >
                    contact Us
                  </NavLink>
                </li>
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
