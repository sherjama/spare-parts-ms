import { Button, Pfp } from "../../index.js";
import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userStatus = useSelector((state) => state.userdata.status);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <>
      <div
        id="main-container"
        className="w-full m-2 h-16 fixed  flex items-center justify-center  z-50"
      >
        <div className="w-1/2 p-2 h-full flex items-center justify-between bg-black/75 backdrop-blur-sm rounded-full ">
          <NavLink
            to={"/"}
            id="left-nav"
            className="font-nexar3 text-2xl no-underline  p-[2px] text-slate-200"
          >
            {/* border-b-2 rounded-lg */}
            NEXAR
          </NavLink>

          <div className="flex items-center justify-center w-min h-full ]">
            {/* <div className="h-1 w-44 bg-slate-200 max-xl:hidden"></div> */}

            <nav
              className={`h-full flex items-center bg-gray-800 px-20  rounded-b-full  border-slate-200 max-md:hidden ${
                path == "/auth/signup" || path == "/auth/login" ? "hidden" : ""
              }`}
            >
              <ul className="flex space-x-10 uppercase font-medium text-gray-200 ">
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

            {/* <div className="h-1 w-44 bg-slate-200 max-xl:hidden"></div> */}
          </div>

          <div className="flex space-x-2 max-md:hidden">
            {!userStatus && (
              <Button
                className={`p-2 ${
                  path == "/auth/signup" || path == "/auth/login"
                    ? "hidden"
                    : ""
                } `}
                text="Get started"
                bgColor="bg-[#191919]"
                textColor="text-gray-200"
                isActive={location.pathname == "/auth/signup" ? true : false}
                onClick={() => navigate("/auth/signup")}
              />
            )}
            {userStatus && (
              <button
                className="bg-white w-min"
                onClick={(e) => console.log("chlaa")}
              >
                <Pfp className="size-12" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
