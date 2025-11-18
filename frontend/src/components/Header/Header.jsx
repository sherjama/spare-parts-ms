import { NavLink, useLocation } from "react-router-dom";

const Header = ({ className }) => {
  const { pathname } = useLocation();

  const hideNav = pathname === "/auth/signup" || pathname === "/auth/login";

  return (
    <header className="fixed top-0 left-0 w-full z-[200]">
      {/* FIXED LOGO */}
      <div className="absolute left-0 top-0 z-[300]">
        <NavLink
          to="/landing"
          className="p-5 ml-3 font-nexar3 text-3xl no-underline text-slate-200 block"
        >
          NEXAR
        </NavLink>
      </div>

      {/* NAV CONTAINER */}
      {!hideNav && (
        <div
          className={`${className} w-full h-16 flex items-center justify-center mt-2`}
        >
          <div className="min-w-min p-2 h-full flex items-center justify-center bg-black/75 backdrop-blur-sm rounded-full z-[250]">
            <div
              className={`flex items-center h-full ${
                pathname === "/landing" ? "w-min justify-center" : ""
              }`}
            >
              <nav className="h-full w-[40rem] flex items-center justify-center max-md:hidden">
                <ul className="flex space-x-16 uppercase font-medium text-gray-200">
                  <li>
                    <NavLink
                      to="/pricing"
                      className={({ isActive }) =>
                        `Link_Animation font-nexar3 ${
                          isActive ? "text-red-400" : ""
                        }`
                      }
                    >
                      pricing
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/aboutUs"
                      className={({ isActive }) =>
                        `Link_Animation font-nexar3 ${
                          isActive ? "text-red-400" : ""
                        }`
                      }
                    >
                      about Us
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/contactUs"
                      className={({ isActive }) =>
                        `Link_Animation font-nexar3 ${
                          isActive ? "text-red-400" : ""
                        }`
                      }
                    >
                      contact Us
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/feedback"
                      className={({ isActive }) =>
                        `Link_Animation font-nexar3 ${
                          isActive ? "text-red-400" : ""
                        }`
                      }
                    >
                      feedback
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
