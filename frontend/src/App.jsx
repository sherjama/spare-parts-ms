import LoadingBar from "react-top-loading-bar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, authservice } from "./index.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const App = () => {
  // states
  const [ifHeadNotVisible, setifHeadNotVisible] = useState();
  const [progress, setProgress] = useState(60);

  // from store
  const status = useSelector((state) => state.userdata?.status);
  const refreshToken = useSelector(
    (state) => state.userdata.userdata?.refreshToken
  );
  const isLoading = useSelector((state) => state.Loading.isLoading);
  // from router
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      const checkAuthSession = async () => {
        try {
          const session = await authservice.checkSession(refreshToken);

          if (session) {
            const tokenRefreshed = await authservice.RefreshToken(refreshToken);
            toast.info(error?.response?.data?.message || "Session Refreshed", {
              position: "top-center",
            });
          }
        } catch (error) {
          toast.info(error?.response?.data?.message || "Server Error", {
            position: "top-center",
          });
        }
      };
      checkAuthSession();
    }
  });

  useEffect(() => {
    if (path == "/dashboard" || path == "/session") {
      setifHeadNotVisible(true);
    } else {
      setifHeadNotVisible(false);
    }

    if (isLoading) {
      setProgress(100);
    }
  }, [isLoading, location]);

  return (
    <div
      id="container"
      className="w-full min-h-screen  flex justify-between flex-col bg-black bg-[url('../public/assets/Posters/HeroBg.jpeg')] bg-cover bg-center overflow-hidden"
    >
      <Header className={`${ifHeadNotVisible ? "hidden" : ""}`} />
      <LoadingBar
        color="#5693CF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <main className="w-[100vw] min-h-screen flex items-center justify-center ">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
